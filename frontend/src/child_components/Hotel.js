import { Link } from "react-router-dom";

import styles from "../css/Hotel.module.css";

const Hotel = ({ hotel, availability, available }) => {
  return (
    <div
      className={
        available
          ? styles.hotelCard
          : `${styles.hotelCard}
          ${styles["unavailable-hotel"]}`
      }
    >
      <img
        src={hotel.imageUrl}
        alt={hotel.hotelName}
        className={styles["hotel-image"]}
      />

      <div className={styles["hotel-content"]}>
        <div className={styles["hotel-top"]}>
          <div>
            <h1>{hotel.hotelName}</h1>

            <p>{hotel.location}</p>
          </div>

          <h3 className={styles.rating}>{hotel.ratings}</h3>
        </div>

        <div
          className={
            available
              ? styles["available-badge"]
              : styles["not-available-badge"]
          }
        >
          {available ? "Available" : "Not Available"}
        </div>

        <div className={styles.amenities}>
          {hotel.amenities?.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>

        <div>
          <p className={styles["starting-text"]}>Starting From</p>

          <h2 className={styles["price"]}>
            ₹{hotel.standard}
            <span>/night</span>
          </h2>
        </div>

        {availability?.length > 0 && (
          <div className={styles["availability-box"]}>
            {availability.map((room, index) => (
              <div key={index} className={styles["room-availability-row"]}>
                <span>{room.roomType}</span>

                <span>
                  {room.availableRooms > 0
                    ? `${room.availableRooms} rooms left`
                    : "Not Available"}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className={styles["hotel-bottom"]}>
          <Link to={`/viewHotel/${hotel.hotelId}`}>
            <button disabled={!available}>
              {available ? "View Details" : "Unavailable"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
