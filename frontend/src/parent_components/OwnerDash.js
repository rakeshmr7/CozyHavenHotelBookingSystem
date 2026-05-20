// OwnerDash.jsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/OwnerDash.module.css";

const OwnerDash = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    sessionStorage.getItem("currentUser"),
  );

  const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:9090/hotel/owner/searchByOwnerId/${storedUser.user.userId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHotelList(data.data || []);
      })
      .catch((e) => console.log(e));
  }, []);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles["ownerdash-container"]}>
      <div className={styles["owner-navbar"]}>
        <div className={styles["owner-logo"]}>
          CozyHaven
        </div>
        <div className={styles["owner-nav-links"]}>
          <Link to="/">Home</Link>
          <Link to="/">Hotels</Link>
          <button
            className={styles["add-hotel-btn"]}
            onClick={() => navigate("/addHotel")}
          >
            AddHotel
          </button>
          <button
            className={styles["logout-btn"]}
            onClick={logout}
          >
            SignOut
          </button>
        </div>
      </div>

      <div className={styles["owner-content"]}>
        <div className={styles["owner-heading"]}>
          <h1>My Hotels</h1>

          <p>
            Manage and edit your listed properties
          </p>
        </div>

        <div className={styles["hotel-grid"]}>
          {hotelList.map((hotel) => (
            <div
              key={hotel.hotelId}
              className={styles["hotel-card"]}
            >
              <img
                src={hotel.imageUrl}
                alt={hotel.hotelName}
                className={styles["hotel-image"]}
              />

              <div className={styles["hotel-details"]}>
                <h2>{hotel.hotelName}</h2>

                <p
                  className={
                    styles["hotel-location"]
                  }
                >
                  📍 {hotel.location}
                </p>

                <p
                  className={
                    styles["hotel-description"]
                  }
                >
                  {hotel.description}
                </p>


                <div
                  className={
                    styles["price-section"]
                  }
                >
                  <div>
                    <span>Standard</span>

                    <h3>
                      ₹ {hotel.standard}
                    </h3>
                  </div>

                  <div>
                    <span>Deluxe</span>

                    <h3>
                      ₹ {hotel.deluxe}
                    </h3>
                  </div>

                  <div>
                    <span>Suite</span>

                    <h3>
                      ₹ {hotel.suite}
                    </h3>
                  </div>
                </div>

                <div
                  className={
                    styles["hotel-buttons"]
                  }
                >
                  <button
                    className={
                      styles["edit-btn"]
                    }
                    onClick={() =>
                      navigate(
                        `/editProperty/${hotel.hotelId}`,
                      )
                    }
                  >
                    Edit Property
                  </button>

                  <button
                    className={
                      styles["view-btn"]
                    }
                    onClick={()=>navigate(`/viewBookings/${hotel.hotelId}`)}
                  >
                    View Bookings
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


        {hotelList.length === 0 && (
          <div
            className={styles["empty-state"]}
          >
            <h2>No Hotels Added Yet</h2>

            <p>
              Start by adding your first hotel
            </p>

            <button
              onClick={() =>
                navigate("/addHotel")
              }
            >
              Add Hotel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDash;