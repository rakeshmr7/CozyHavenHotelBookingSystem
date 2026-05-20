import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProperty = () => {

  const { hotelId } = useParams();
  const nav = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(true);
  const [roomIds, setRoomIds] = useState({
    standardId: null,
    deluxeId: null,
    suiteId: null,
  });
  const [hotelData, setHotelData] = useState({
    hotelName: "",
    description: "",
    location: "",
    contact: "",
    imageUrl: "",
    amenities: "",
    standardRooms: "",
    standardFare: "",
    deluxeRooms: "",
    deluxeFare: "",
    suiteRooms: "",
    suiteFare: "",
  });

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  const fetchHotelDetails = async () => {
    try {
      const hotelResponse = await fetch(
        `http://localhost:9090/hotel/all/searchById/${hotelId}`,
      );
      const hotelResult = await hotelResponse.json();
      console.log(hotelResult);
      const hotel = hotelResult.data;
      const roomResponse = await fetch(
        `http://localhost:9090/room/all/getRooms/${hotelId}`,
      );
      const roomResult = await roomResponse.json();
      console.log(roomResult);
      const rooms = roomResult.data;

      let standardRoom = null;
      let deluxeRoom = null;
      let suiteRoom = null;

      rooms.forEach((room) => {
        if (room.roomType === "STANDARD") {
          standardRoom = room;
        }

        if (room.roomType === "DELUXE") {
          deluxeRoom = room;
        }

        if (room.roomType === "SUITE") {
          suiteRoom = room;
        }
      });

      setRoomIds({
        standardId: standardRoom?.roomId,
        deluxeId: deluxeRoom?.roomId,
        suiteId: suiteRoom?.roomId,
      });

      setHotelData({
        hotelName: hotel.hotelName || "",
        description: hotel.description || "",
        location: hotel.location || "",
        contact: hotel.contact || "",
        imageUrl: hotel.imageUrl || "",
        amenities: hotel.amenities ? hotel.amenities.join(",") : "",
        standardRooms: standardRoom?.totalRooms || "",
        standardFare: standardRoom?.baseFare || "",
        deluxeRooms: deluxeRoom?.totalRooms || "",
        deluxeFare: deluxeRoom?.baseFare || "",
        suiteRooms: suiteRoom?.totalRooms || "",
        suiteFare: suiteRoom?.baseFare || "",
      });

      setLoading(false);
    } catch (e) {
      console.log(e);
      alert("Failed To Fetch Property");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };


  const updateProperty = async (e) => {
    e.preventDefault();

    try {

      const hotelPayload = {
        hotelId: Number(hotelId),
        hotelName: hotelData.hotelName,
        description: hotelData.description,
        location: hotelData.location,
        contact: hotelData.contact,
        imageUrl: hotelData.imageUrl,
        amenities: hotelData.amenities.split(",").map((a) => a.trim()),
        ownerId: storedUser.user.userId,
        ratings: 0.0,
        standard: Number(hotelData.standardFare),
        deluxe: Number(hotelData.deluxeFare),
        suite: Number(hotelData.suiteFare),
      };

      const hotelResponse = await fetch(
        `http://localhost:9090/hotel/owner/updateById/${hotelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
          body: JSON.stringify(hotelPayload),
        },
      );

      if (!hotelResponse.ok) {
        alert("Failed To Update Hotel");
        return;
      }

      if (roomIds.standardId) {
        await fetch(
          `http://localhost:9090/room/owner/updateRoomById/${roomIds.standardId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedUser.token}`,
            },
            body: JSON.stringify({
              roomId: roomIds.standardId,
              roomType: "STANDARD",
              maxOccupy: 2,
              baseFare: Number(hotelData.standardFare),
              ac: true,
              totalAvailable: Number(hotelData.standardRooms),
              totalRooms: Number(hotelData.standardRooms),
              hotelId: Number(hotelId),
            }),
          },
        );
      }


      if (roomIds.deluxeId) {
        await fetch(
          `http://localhost:9090/room/owner/updateRoomById/${roomIds.deluxeId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedUser.token}`,
            },
            body: JSON.stringify({
              roomId: roomIds.deluxeId,
              roomType: "DELUXE",
              maxOccupy: 3,
              baseFare: Number(hotelData.deluxeFare),
              ac: true,
              totalAvailable: Number(hotelData.deluxeRooms),
              totalRooms: Number(hotelData.deluxeRooms),
              hotelId: Number(hotelId),
            }),
          },
        );
      }

      if (roomIds.suiteId) {
        await fetch(
          `http://localhost:9090/room/owner/updateRoomById/${roomIds.suiteId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedUser.token}`,
            },
            body: JSON.stringify({
              roomId: roomIds.suiteId,
              roomType: "SUITE",
              maxOccupy: 5,
              baseFare: Number(hotelData.suiteFare),
              ac: true,
              totalAvailable: Number(hotelData.suiteRooms),
              totalRooms: Number(hotelData.suiteRooms),
              hotelId: Number(hotelId),
            }),
          },
        );
      }

      alert("Property Updated Successfully");
      nav("/ownerdash");
    } catch (e) {
      console.log(e);
      alert("Failed To Update Property");
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f5f2",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "white",
          padding: "35px",
          borderRadius: "22px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "28px",
            color: "#1f2937",
          }}
        >
          Edit Property
        </h1>

        <form onSubmit={updateProperty}>
          {/* HOTEL DETAILS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <input
              type="text"
              name="hotelName"
              value={hotelData.hotelName}
              onChange={handleChange}
              placeholder="Hotel Name"
              required
            />

            <input
              type="text"
              name="location"
              value={hotelData.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />

            <input
              type="text"
              name="contact"
              value={hotelData.contact}
              onChange={handleChange}
              placeholder="Contact"
              required
            />

            <input
              type="text"
              name="imageUrl"
              value={hotelData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              required
            />

            <textarea
              name="description"
              value={hotelData.description}
              onChange={handleChange}
              placeholder="Description"
              style={{
                gridColumn: "1/3",
                height: "100px",
                padding: "12px",
                borderRadius: "10px",
              }}
            />

            <input
              type="text"
              name="amenities"
              value={hotelData.amenities}
              onChange={handleChange}
              placeholder="wifi,pool,gym"
              style={{
                gridColumn: "1/3",
              }}
            />
          </div>

          <h2
            style={{
              marginTop: "35px",
              marginBottom: "20px",
            }}
          >
            Room Details
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
            }}
          >

            <div
              style={{
                background: "#f9fafb",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h3>Standard Room</h3>

              <input
                type="number"
                name="standardRooms"
                value={hotelData.standardRooms}
                onChange={handleChange}
                placeholder="Total Rooms"
                style={{
                  width: "100%",
                  marginBottom: "12px",
                }}
              />

              <input
                type="number"
                name="standardFare"
                value={hotelData.standardFare}
                onChange={handleChange}
                placeholder="Fare"
                style={{
                  width: "100%",
                }}
              />
            </div>


            <div
              style={{
                background: "#f9fafb",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h3>Deluxe Room</h3>

              <input
                type="number"
                name="deluxeRooms"
                value={hotelData.deluxeRooms}
                onChange={handleChange}
                placeholder="Total Rooms"
                style={{
                  width: "100%",
                  marginBottom: "12px",
                }}
              />

              <input
                type="number"
                name="deluxeFare"
                value={hotelData.deluxeFare}
                onChange={handleChange}
                placeholder="Fare"
                style={{
                  width: "100%",
                }}
              />
            </div>


            <div
              style={{
                background: "#f9fafb",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h3>Suite Room</h3>

              <input
                type="number"
                name="suiteRooms"
                value={hotelData.suiteRooms}
                onChange={handleChange}
                placeholder="Total Rooms"
                style={{
                  width: "100%",
                  marginBottom: "12px",
                }}
              />

              <input
                type="number"
                name="suiteFare"
                value={hotelData.suiteFare}
                onChange={handleChange}
                placeholder="Fare"
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "35px",
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "#7E006E",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
