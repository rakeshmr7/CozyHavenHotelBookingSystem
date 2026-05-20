import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddHotel = () => {

  const navigate = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };
  const addHotel = async (e) => {
    e.preventDefault();
    try {
      const hotelPayload = {
        hotelName: hotelData.hotelName,
        description: hotelData.description,
        location: hotelData.location,
        contact: hotelData.contact,
        imageUrl: hotelData.imageUrl,
        amenities: hotelData.amenities.split(",").map((a) => a.trim()),
        ownerId: storedUser.user.userId,
        ratings: 0.0,
        standard: Number(hotelData.standardFare || 0),
        deluxe: Number(hotelData.deluxeFare || 0),
        suite: Number(hotelData.suiteFare || 0),
      };
      const hotelResponse = await fetch(
        "http://localhost:9090/hotel/owner/addHotel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
          body: JSON.stringify(hotelPayload),
        },
      );
      const hotelResult = await hotelResponse.json();
      console.log("HOTEL RESPONSE", hotelResult);
      console.log("DATA", hotelResult.data);
      if (!hotelResponse.ok) {
        alert("Failed To Add Hotel");
        return;
      }
      const createdHotel = hotelResult.data;
      const hotelId = createdHotel.hotelId;
      if (hotelData.standardRooms > 0) {
        await fetch("http://localhost:9090/room/owner/addRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
          body: JSON.stringify({
            roomType: "STANDARD",
            maxOccupy: 2,
            baseFare: Number(hotelData.standardFare),
            ac: true,
            totalAvailable: Number(hotelData.standardRooms),
            totalRooms: Number(hotelData.standardRooms),
            hotelId: hotelId,
          }),
        });
      }
      if (hotelData.deluxeRooms > 0) {
        await fetch("http://localhost:9090/room/owner/addRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
          body: JSON.stringify({
            roomType: "DELUXE",
            maxOccupy: 3,
            baseFare: Number(hotelData.deluxeFare),
            ac: true,
            totalAvailable: Number(hotelData.deluxeRooms),
            totalRooms: Number(hotelData.deluxeRooms),
            hotelId: hotelId,
          }),
        });
      }
      if (hotelData.suiteRooms > 0) {
        await fetch("http://localhost:9090/room/owner/addRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
          body: JSON.stringify({
            roomType: "SUITE",
            maxOccupy: 5,
            baseFare: Number(hotelData.suiteFare),
            ac: true,
            totalAvailable: Number(hotelData.suiteRooms),
            totalRooms: Number(hotelData.suiteRooms),
            hotelId: hotelId,
          }),
        });
      }
      alert("Hotel Added Successfully");
      setHotelData({
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
    } catch (e) {
      console.log(e);
      alert("Failed To Add Hotel");
    }
  };
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
        <button
          onClick={() => navigate("/ownerdash")}
          style={{
            marginBottom: "20px",
            border: "none",
            background: "transparent",
            color: "#7e006e",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← Back
        </button>
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "28px",
            color: "#1f2937",
          }}
        >
          Add New Hotel
        </h1>

        <form onSubmit={addHotel}>
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
              placeholder="Hotel Name"
              value={hotelData.hotelName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={hotelData.location}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={hotelData.contact}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Hotel Image URL"
              value={hotelData.imageUrl}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Hotel Description"
              value={hotelData.description}
              onChange={handleChange}
              style={{
                gridColumn: "1/3",
                height: "100px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
              }}
            />

            <input
              type="text"
              name="amenities"
              placeholder="wifi,pool,gym,parking"
              value={hotelData.amenities}
              onChange={handleChange}
              style={{
                gridColumn: "1/3",
              }}
            />
          </div>

          <h2
            style={{
              marginTop: "35px",
              marginBottom: "20px",
              color: "#374151",
            }}
          >
            Room Details
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
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
              <h3
                style={{
                  marginBottom: "15px",
                }}
              >
                Standard Room
              </h3>

              <input
                type="number"
                name="standardRooms"
                placeholder="Number Of Rooms"
                value={hotelData.standardRooms}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "12px",
                }}
              />

              <input
                type="number"
                name="standardFare"
                placeholder="Fare Per Night"
                value={hotelData.standardFare}
                onChange={handleChange}
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
              <h3
                style={{
                  marginBottom: "15px",
                }}
              >
                Deluxe Room
              </h3>

              <input
                type="number"
                name="deluxeRooms"
                placeholder="Number Of Rooms"
                value={hotelData.deluxeRooms}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "12px",
                }}
              />

              <input
                type="number"
                name="deluxeFare"
                placeholder="Fare Per Night"
                value={hotelData.deluxeFare}
                onChange={handleChange}
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
              <h3
                style={{
                  marginBottom: "15px",
                }}
              >
                Suite Room
              </h3>

              <input
                type="number"
                name="suiteRooms"
                placeholder="Number Of Rooms"
                value={hotelData.suiteRooms}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginBottom: "12px",
                }}
              />

              <input
                type="number"
                name="suiteFare"
                placeholder="Fare Per Night"
                value={hotelData.suiteFare}
                onChange={handleChange}
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
              background: "#a000a0",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
