import { Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/ViewHotel.module.css";

const UserProfile = () => {
  const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
  });

  const nav = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cancelReason, setCancelReason] = useState("");

  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser.user);

      fetch(
        `http://localhost:9090/booking/customer/searchUserBookings/${storedUser.user.userId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
        },
      )
        .then((res) => res.json())

        .then((data) => {
          console.log(data);

          setBookings(data.data || []);
        })

        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const updateProfile = () => {
    fetch(`http://localhost:9090/user/customer/updateCustomer/${user.userId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.token}`,
      },

      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Profile Updated Successfully");
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...storedUser,
            user: data.data,
          }),
        );
        setUser(data.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Update Failed");
      });
  };

  const cancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const confirmCancelBooking = () => {
    if (!cancelReason.trim()) {
      message.error("Cancellation reason is required");
      return;
    }

    fetch(
      `http://localhost:9090/booking/customer/cancelBooking/${selectedBookingId}/${encodeURIComponent(cancelReason)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Modal.success({
          title: "Cancellation Success",
          content: "Amount will be refunded within 7 business days",
          okText: "OK",
          okButtonProps: {
            style: {
              backgroundColor: "#9C0A8F",
              borderColor: "#9C0A8F",
            },
          },
        });
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.bookingId === selectedBookingId
              ? {
                  ...booking,
                  status: "CANCELLED",
                  refundStatus: "REFUND_REQUESTED",
                  cancellationReason: cancelReason,
                }
              : booking,
          ),
        );
        setIsModalOpen(false);
        setCancelReason("");
        setSelectedBookingId(null);
      })

      .catch((e) => {
        console.log(e);
        message.error("Cancellation Failed");
      });
  };

  const cancelProcess = (bookingId) => {
    Modal.confirm({
      title: "Cancel Booking Process",
      content: "Are you sure you want to cancel this pending booking process?",
      okText: "Yes, Cancel",
      cancelText: "No",
      okButtonProps: {
        danger: true,
        className: styles["modal-ok-btn"],
      },
      cancelButtonProps: {
        className: styles["modal-cancel-btn"],
      },
      onOk() {
        fetch(
          `http://localhost:9090/booking/customer/deletePendingBooking/${bookingId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedUser.token}`,
            },
          },
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.status === "410 GONE") {
              message.success("Booking Process Cancelled Successfully!!");
              setBookings((prevBookings) =>
                prevBookings.filter(
                  (booking) => booking.bookingId !== bookingId,
                ),
              );
            } else {
              console.log(res.data);
            }
          })
          .catch((e) => {
            console.log(e);
            message.error("Cancellation Failed");
          });
      },
    });
  };

  return (
    <div className={styles["hotel-page"]}>
      <div className={styles["navbar"]}>
        <h2 className={styles["logo"]}>CozyHaven</h2>
        <div className={styles["nav-links"]}>
          <Link to="/">Home</Link>
          <Link to="/search">Hotels</Link>
        </div>
      </div>
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "40px",
        }}
      >

        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            padding: "30px",
            borderRadius: "22px",
            marginBottom: "35px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
            }}
          >
            User Profile
          </h1>

          <div className={styles["profile-input-grid"]}>
            <div className={styles["input-group"]}>
              <label className={styles["input-label"]}>First Name</label>

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
                className={styles["profile-input"]}
              />
            </div>

            <div className={styles["input-group"]}>
              <label className={styles["input-label"]}>Last Name</label>

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
                className={styles["profile-input"]}
              />
            </div>

            <div className={styles["input-group"]}>
              <label className={styles["input-label"]}>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                className={styles["profile-input"]}
              />
            </div>

            <div className={styles["input-group"]}>
              <label className={styles["input-label"]}>Contact Number</label>

              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={user.contact}
                onChange={handleChange}
                className={styles["profile-input"]}
              />
            </div>

            <div
              className={`${styles["input-group"]} ${styles["address-field"]}`}
            >
              <label className={styles["input-label"]}>Address</label>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={user.address}
                onChange={handleChange}
                className={styles["profile-input"]}
              />
            </div>
          </div>

          <button
            onClick={updateProfile}
            className={styles["book-btn"]}
            style={{
              marginTop: "25px",
              width: "220px",
            }}
          >
            Update Profile
          </button>
        </div>

        <div>
          <h1
            style={{
              marginBottom: "18px",
              fontSize: "20px",
              fontWeight: "700",
              color: "#9635a4",
            }}
          >
            My Bookings
          </h1>

          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.bookingId}
                style={{
                  background: "white",
                  padding: "22px",
                  borderRadius: "18px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  maxWidth: "950px",
                }}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    color: "#1f2937",
                  }}
                >
                  {booking.hotelName}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <strong>Room Type:</strong> {booking.roomType}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <strong>Adults:</strong> {booking.adultCount}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <strong>Check In:</strong> {booking.checkInDate}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <strong>Children:</strong> {booking.childCount}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <strong>Check Out:</strong> {booking.checkOutDate}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <strong>Total:</strong> ₹ {booking.totalAmount}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        margin: 0,
                      }}
                    >
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          booking.status === "CANCELLED"
                            ? styles["cancelled-status"]
                            : booking.status === "PENDING"
                              ? styles["pending-status"]
                              : styles["confirmed-status"]
                        }
                      >
                        {booking.status}
                      </span>
                    </p>

                    {booking.refundStatus && (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          margin: 0,
                        }}
                      >
                        <strong>Refund Status:</strong>{" "}
                        <span
                          className={
                            booking.refundStatus === "REFUNDED"
                              ? styles["refunded-status"]
                              : styles["refund-requested-status"]
                          }
                        >
                          {booking.refundStatus}
                        </span>
                      </p>
                    )}
                  </div>

                  {booking.status === "PENDING" ? (
                    <div className={styles["pending-btn-group"]}>
                      <button
                        onClick={() => cancelProcess(booking.bookingId)}
                        className={styles["cancel-process-btn"]}
                      >
                        Cancel Process
                      </button>

                      <button
                        onClick={() => nav(`/payment/${booking.bookingId}`)}
                        className={styles["continue-booking-btn"]}
                      >
                        Continue Booking
                      </button>
                    </div>
                  ) : booking.status === "CONFIRMED" ? (
                    <button
                      onClick={() => cancelBooking(booking.bookingId)}
                      className={styles["cancel-booking-btn"]}
                    >
                      Cancel Booking
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "15px",
              }}
            >
              <h2>No Bookings Found</h2>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Cancel Booking"
        open={isModalOpen}
        onOk={confirmCancelBooking}
        onCancel={() => {
          setIsModalOpen(false);

          setCancelReason("");
        }}
        okText="Cancel Booking"
        okButtonProps={{
          danger: true,
          className: styles["modal-ok-btn"],
        }}
        cancelButtonProps={{
          className: styles["modal-cancel-btn"],
        }}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter cancellation reason"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default UserProfile;
