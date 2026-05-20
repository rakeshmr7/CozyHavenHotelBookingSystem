import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Home.module.css";

const Home = () => {
  let navigate = useNavigate();

  const [guestOpen, setGuestOpen] = useState(false);

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    navigate("/search", {
      state: {
        location,
        checkIn,
        checkOut,
        adults,
        children,
        rooms,
      },
    });
  };

  const offers = [
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      title: "25% OFF",
      subtitle: "Early Bird Special",
    },
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      title: "15% OFF",
      subtitle: "Weekend Getaway",
    },
    {
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      title: "FREE",
      subtitle: "Breakfast Included",
    },
    {
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      title: "30% OFF",
      subtitle: "Luxury Room Deal",
    },
    {
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
      title: "20% OFF",
      subtitle: "Family Package",
    },
  ];

  const destinations = [
    {
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      name: "Chennai",
    },
    {
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      name: "Delhi",
    },
    {
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      name: "Kolkata",
    },
    {
      image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
      name: "Goa",
    },
    {
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      name: "Mumbai",
    },
  ];

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.logo}>CozyHaven</div>

        <div className={styles["nav-links"]}>
          <a href="/">Home</a>

          <a href="/search">Hotels</a>

          {!sessionStorage.getItem("currentUser") ? (
            <>
              <Link to="/signIn" className={styles.signin}>
                Sign In
              </Link>
            </>
          ) : (
            <button
              className={styles.signin}
              onClick={() => {
                sessionStorage.removeItem("currentUser");
                sessionStorage.removeItem("token");
                navigate("/signIn");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className={styles.hero}>
        <h1>Find your perfect stay anywhere</h1>

        <p>Discover amazing hotels at the best prices</p>

        <div className={styles["search-box"]}>
          <div className={styles["search-field"]}>
            <label>Location</label>

            <input
              type="text"
              placeholder="Where are you going?"
              list="cities"
              className={styles["city-input"]}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <datalist id="cities">
              <option value="Chennai" />
              <option value="Delhi" />
              <option value="Kolkata" />
              <option value="Mumbai" />
              <option value="Goa" />
            </datalist>
          </div>

          <div className={styles["date-group"]}>
            <div className={styles["search-field"]}>
              <label>Check-In</label>

              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            <div className={styles["search-field"]}>
              <label>Check-Out</label>

              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className={styles["guest-container"]}>
            <button
              className={styles["guest-btn"]}
              onClick={() => setGuestOpen(!guestOpen)}
            >
              {adults} Adults • {children} Children • {rooms} Rooms
            </button>

            {guestOpen && (
              <div className={styles["guest-dropdown"]}>
                <div className={styles.row}>
                  <label>Adults</label>

                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>

                <div className={styles.row}>
                  <label>Children</label>

                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>

                <div className={styles.row}>
                  <label>Rooms</label>

                  <select
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button className={styles["search-btn"]} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Special Offers</h2>

        <div className={styles.cards}>
          {offers.map((offer, index) => (
            <div className={styles.card} key={index}>
              <img
                src={`${offer.image}?auto=format&fit=crop&w=800&q=80`}
                alt=""
              />

              <div className={styles["card-text"]}>
                {offer.title}
                <br />
                {offer.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Popular Destinations</h2>

        <div className={styles.cards}>
          {destinations.map((place, index) => (
            <div className={styles.card} key={index}>
              <img
                src={`${place.image}?auto=format&fit=crop&w=800&q=80`}
                alt=""
              />

              <div className={styles["card-text"]}>{place.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
