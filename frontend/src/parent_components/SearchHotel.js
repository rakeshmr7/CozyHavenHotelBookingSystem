import Hotel from "../child_components/Hotel";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../css/SearchHotel.module.css";
import { useNavigate } from "react-router-dom";

const SearchHotel = () => {
  let nav = useNavigate();
  let loc = useLocation();

  const [hotels, setHotels] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [guestOpen, setGuestOpen] = useState(false);
  const [location, setLocation] = useState(loc.state.location);
  const [checkInDate, setCheckInDate] = useState(loc.state.checkIn);
  const [checkOutDate, setCheckOutDate] = useState(loc.state.checkOut);
  const [availabilityData, setAvailabilityData] = useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:9090/hotel/all/showAll")
      .then((res) => res.json())
      .then((response) => {
        setHotels(response.data);
      })
      .catch((e) => {
        console.log("Error fetching hotels : ", e);
      });
  }, []);

  const fetchAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      return;
    }
    hotels.forEach((hotel) => {
      fetch(
        `http://localhost:9090/room/all/availability/${hotel.hotelId}?checkIn=${checkInDate}&checkOut=${checkOutDate}`,
      )
        .then((res) => res.json())
        .then((response) => {
          setAvailabilityData((prev) => ({
            ...prev,
            [hotel.hotelId]: response.data,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  useEffect(() => {
    if (hotels.length > 0 && checkInDate && checkOutDate) {
      fetchAvailability();
    }
  }, [hotels, checkInDate, checkOutDate]);

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const clearFilters = () => {
    setPriceRange(10000);
    setSelectedAmenities([]);
    setLocation("");
  };

  const filteredHotels = hotels?.filter((hotel) => {
    let matchesPrice = hotel.standard ? hotel.standard <= priceRange : true;

    let matchesAmenities =
      selectedAmenities?.length === 0 ||
      selectedAmenities.every((amenity) => hotel.amenities?.includes(amenity));

    let matchesLocation =
      location === "" ||
      hotel.location?.toLowerCase().includes(location.toLowerCase());

    return matchesPrice && matchesAmenities && matchesLocation;
  });

  const isHotelAvailable = (hotelId) => {
    const rooms = availabilityData[hotelId];
    if (!rooms) {
      return true;
    }
    return rooms.some((room) => room.availableRooms > 0);
  };

  return (
    <>

      <div className={styles.navbar}>
        <div className={styles.logo}>CozyHaven</div>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navItem}>
            Home
          </Link>

          <Link to="/search" className={styles.navItem}>
            Hotels
          </Link>

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
                nav("/");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className={styles.mainContainer}>
        {/* FILTER */}

        <div className={styles.filterBox}>
          <h2 className={styles.filterTitle}>Filters</h2>


          <div>
            <h3 className={styles.sectionTitle}>Price Range</h3>

            <p className={styles.priceText}>
              Standard Room Price: ₹1000 - ₹{priceRange}
            </p>

            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.amenitiesSection}>
            <h3 className={styles.sectionTitle}>Amenities</h3>

            {[
              "Free WiFi",
              "Swimming Pool",
              "Parking",
              "Restaurant",
              "Gym",
              "Spa",
              "Room Service",
            ].map((amenity) => (
              <div key={amenity} className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className={styles.checkbox}
                />

                <label className={styles.checkboxLabel}>{amenity}</label>
              </div>
            ))}
          </div>

          <button onClick={clearFilters} className={styles.clearBtn}>
            Clear Filters
          </button>
        </div>


        <div className={styles.hotelsSection}>
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
              </datalist>
            </div>

            <div className={styles["date-group"]}>
              <div className={styles["search-field"]}>
                <label>Check-In</label>

                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>

              <div className={styles["search-field"]}>
                <label>Check-Out</label>

                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
            </div>

            <div className={styles["guest-container"]}>
              <button
                className={styles["guest-btn"]}
                onClick={() => setGuestOpen(!guestOpen)}
              >
                Guests & Rooms
              </button>

              {guestOpen && (
                <div className={styles["guest-dropdown"]}>
                  <div className={styles.row}>
                    <label>Adults</label>

                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>

                  <div className={styles.row}>
                    <label>Children</label>
                    <select>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>

                  <div className={styles.row}>
                    <label>Rooms</label>
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <button className={styles["search-btn"]}>Search</button>
          </div>
          <h1 className={styles.hotelHeading}>All Hotels</h1>
          <p className={styles.hotelCount}>
            {filteredHotels?.length} properties found
          </p>
          {filteredHotels?.length > 0 ? (
            filteredHotels.map((hotel) => (
              <Hotel
                key={hotel.hotelId}
                hotel={hotel}
                availability={availabilityData[hotel.hotelId]}
                available={isHotelAvailable(hotel.hotelId)}
              />
            ))
          ) : (
            <div className={styles.noHotelsBox}>
              <h2 className={styles.noHotelsText}>No Hotels Found</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchHotel;
