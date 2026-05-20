import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, DatePicker, Tabs, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/ViewHotel.module.css";

const ViewHotel = () => {
  const { hotelId } = useParams();

  const nav = useNavigate();

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const [hotel, setHotel] = useState(null);

  const [selectedRoomType, setSelectedRoomType] = useState("");

  const [roomsBooked, setRoomsBooked] = useState(1);
  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [adults, setAdults] = useState(0);

  const [children, setChildren] = useState(0);

  const [reviews, setReviews] = useState([]);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9090/hotel/all/searchById/${hotelId}`)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);

        setHotel(response.data);
      })

      .catch((e) => {
        console.log(e);
      });

    fetch(`http://localhost:9090/review/all/searchByHotelId/${hotelId}`)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);

        setReviews(response.data);
      })

      .catch((e) => {
        console.log(e);

        setReviews([]);
      });

    fetch(`http://localhost:9090/room/all/getRooms/${hotelId}`)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);

        setRooms(response.data);
      })

      .catch((e) => {
        console.log(e);
      });
  }, [hotelId]);

  const calculateBaseAmount = () => {
    if (!selectedRoomType) {
      return 0;
    }

    let roomPrice = 0;

    if (selectedRoomType === "STANDARD") {
      roomPrice = hotel.standard;
    } else if (selectedRoomType === "DELUXE") {
      roomPrice = hotel.deluxe;
    } else if (selectedRoomType === "SUITE") {
      roomPrice = hotel.suite;
    }

    return roomPrice * roomsBooked;
  };

  const selectedRoom = rooms.find((room) => {
    console.log(room.roomType);

    return room.roomType.includes(selectedRoomType);
  });

  const createBooking = () => {
    if (!checkIn) {
      message.error("Please select CheckIn");
      return;
    }

    if (!checkOut) {
      message.error("Please select CheckOut");
      return;
    }

    if (!selectedRoomType) {
      message.error("Please select Room");
      return;
    }

    const bookingData = {
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      roomType: selectedRoomType,
      roomsBooked: roomsBooked,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      childCount: children,
      adultCount: adults,
      totalAmount: calculateBaseAmount(),
      roomId: selectedRoom?.roomId,
      userId: currentUser.user?.userId,
      cancellationReason: "",
    };

    console.log(bookingData);

    fetch("http://localhost:9090/booking/customer/addBooking", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "202 ACCEPTED")
          nav(`/payment/${res.data.bookingId}`);
        else if (res.status === "404 NOT_FOUND")
          message.error("Select less rooms!!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!hotel) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles["hotel-page"]}>
      <div className={styles["navbar"]}>
        <h2 className={styles["logo"]}>CozyHaven</h2>
        <div className={styles["nav-links"]}>
          <a href="/">Home</a>
          <a href="/search">Hotels</a>
          <button
            className={styles["signin-btn"]}
            onClick={() => nav("/userProfile")}
          >
            Profile
          </button>
        </div>
      </div>

      <div className={styles["container"]}>
        <div className={styles["hotel-header"]}>
          <div>
            <h1>{hotel.hotelName}</h1>

            <p>📍 {hotel.location}</p>

            <p>Luxury Stay Experience</p>
          </div>

          <div className={styles["rating"]}>{hotel.ratings}</div>
        </div>

        <div className={styles["gallery-section"]}>
          <div className={styles["main-image"]}>
            <img src={hotel.imageUrl} alt={hotel.hotelName} />

            {calculateBaseAmount() > 0 && (
              <div className={styles["amount-card"]}>
                <p>Base Amount</p>

                <h2>₹ {calculateBaseAmount()}</h2>

                <span>Excluding taxes & additional charges</span>
              </div>
            )}
          </div>

          <Card className={styles["booking-card"]}>
            <h2>Starting at ₹ {hotel.standard} / night</h2>

            <p>Excludes taxes and fees</p>

            <br />

            <p>Check-in</p>

            <DatePicker
              className={styles["date-picker"]}
              onChange={(date, dateString) => setCheckIn(dateString)}
            />

            <p>Check-out</p>

            <DatePicker
              className={styles["date-picker"]}
              onChange={(date, dateString) => setCheckOut(dateString)}
            />

            <div className={styles["date-picker"]}>
              <div className={styles["label-row"]}>
                <p>Adults</p>

                <Tooltip title="Adult age above 14">
                  <InfoCircleOutlined className={styles["info-icon"]} />
                </Tooltip>
              </div>

              <input
                type="number"
                placeholder="Enter Adults"
                onChange={(e) => setAdults(parseInt(e.target.value))}
              />
            </div>

            <div className={styles["date-picker"]}>
              <div className={styles["label-row"]}>
                <p>Children</p>

                <Tooltip title="Children age below 14">
                  <InfoCircleOutlined className={styles["info-icon"]} />
                </Tooltip>
              </div>

              <input
                type="number"
                placeholder="Enter Children"
                onChange={(e) => setChildren(parseInt(e.target.value))}
              />
            </div>

            <div className={styles["single-room-card"]}>
              <div className={styles["room-select-group"]}>
                <p>Select Room Type</p>

                <select
                  className={styles["room-select"]}
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                >
                  <option value="">Select</option>

                  <option value="STANDARD">Standard ₹{hotel.standard}/N</option>

                  <option value="DELUXE">Deluxe ₹{hotel.deluxe}/N</option>

                  <option value="SUITE">Suite ₹{hotel.suite}/N</option>
                </select>
              </div>

              <div className={styles["room-select-group"]}>
                <p>Number of Rooms</p>

                <select
                  className={styles["room-select"]}
                  value={roomsBooked}
                  onChange={(e) => setRoomsBooked(parseInt(e.target.value))}
                >
                  <option value={1}>1 Room</option>

                  <option value={2}>2 Rooms</option>

                  <option value={3}>3 Rooms</option>

                  <option value={4}>4 Rooms</option>
                </select>
              </div>
            </div>

            <button className={styles["book-btn"]} onClick={createBooking}>
              Book Now
            </button>
          </Card>
        </div>

        <div className={styles["about-section"]}>
          <h2>About this property</h2>

          <p>{hotel.description}</p>
        </div>

        <Tabs
          defaultActiveKey="1"
          className={styles["hotel-tabs"]}
          items={[
            {
              key: "1",
              label: "Amenities",
              children: (
                <ul>
                  {hotel.amenities?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ),
            },

            {
              key: "2",
              label: "Location",
              children: <p>{hotel.location}</p>,
            },

            {
              key: "3",
              label: "Contact",
              children: <p>📞 {hotel.contact}</p>,
            },
            {
              key: "4",
              label: "Reviews",
              children: (
                <>
                  {reviews?.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className={styles["review-card"]}>
                        <h4>Customer {review.customerId}</h4>
                        <p>{review.comment}</p>
                        <span>⭐ {review.rating}</span>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ViewHotel;
