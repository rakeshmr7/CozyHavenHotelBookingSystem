import {
  ArrowRightOutlined,
  BankOutlined,
  CreditCardOutlined,
  DownOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../css/Payment.module.css";

const Payment = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [user, setUser] = useState({});
  const [selectedPayment, setSelectedPayment] = useState("");

  let nav = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (storedUser) {
      setUser({
        ...storedUser.user,
        token: storedUser.token,
      });
    }

    fetch(`http://localhost:9090/booking/all/searchById/${bookingId}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setBooking(response.data);
        fetch(
          `http://localhost:9090/hotel/all/searchById/${response.data.hotelId}`,
        )
          .then((res) => {
            // console.log(res);
            return res.json();
          })
          .then((hotelRes) => {
            console.log(hotelRes.data);
            setHotel(hotelRes.data);
            setLoading(false);
          })
          .catch(() => {
            message.error("Unable to fetch hotel details");
            setLoading(false);
          });
      })
      .catch(() => {
        message.error("Unable to fetch booking details");
        setLoading(false);
      });
  }, [bookingId]);

  if (loading || !booking || !hotel) {
    return (
      <div className={styles["loading-container"]}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  const handleUPIPayment = () => {
    console.log(user, user.token);
    fetch("http://localhost:9090/payment/customer/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        amount: booking.totalAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const order = JSON.parse(data.data);
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: order.amount,
          currency: order.currency,
          name: hotel.hotelName,
          description: "Hotel Booking Payment",
          order_id: order.id,
          handler: (res) => {
            const paymentData = {
              amount: booking.totalAmount,
              paymentMethod: selectedPayment,
              transactionId: res.razorpay_payment_id,
              paymentStatus: "SUCCESS",
              refundAmount: 0,
              refundStatus: "NOT_REQUESTED",
              bookingId: booking.bookingId,
            };

            fetch("http://localhost:9090/payment/customer/makePayment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(paymentData),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "201 CREATED") {
                  fetch(
                    `http://localhost:9090/booking/all/updateBookingStatus/${bookingId}/CONFIRMED`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                      },
                    },
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.status === "200 OK") {
                        message.success("Payment Successful");
                        nav("/userProfile");
                      }
                    });
                }
              })
              .catch((e) => {
                console.log(e);
                message.error("Payment Save Failed");
              });
          },

          prefill: {
            name: user.firstName,
            email: user.email,
            contact: user.contact,
          },
          theme: {
            color: "#9C0A8F",
          },
          method: {
            upi: selectedPayment === "UPI",
            card: selectedPayment === "CARD",
            netbanking: selectedPayment === "NET_BANKING",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      })
      .catch((e) => {
        console.log(e);
        message.error("Unable to initiate payment");
      });
  };

  return (
    <div className={styles["payment-page"]}>
      <div className={styles["navbar"]}>
        <div className={styles["logo"]}>CozyHaven</div>

        <div className={styles["nav-links"]}>
          <Link to="/">Home</Link>

          <Link to="/searchHotel">Hotels</Link>

          <Link to={-1}>← Back</Link>

          <Link to="/login" className={styles["signin"]}>
            Sign out
          </Link>
        </div>
      </div>

      <div className={styles["container"]}>
        <div className={styles["left"]}>
          <Card className={styles["card"]}>
            <div className={styles["hotel"]}>
              <img src={hotel.imageUrl} alt="hotel" />

              <div>
                <h2>{hotel.hotelName}</h2>

                <div className={styles["sub"]}>{hotel.location}</div>

                <div className={styles["sub"]}>
                  CheckIn: {booking.checkInDate} | CheckOut:{" "}
                  {booking.checkOutDate}
                </div>

                <div className={styles["sub"]}>{booking.roomType}</div>

                <div className={styles["sub"]}>
                  {booking.adultCount} Adults, {booking.childCount} Children
                </div>

                <div className={styles["sub"]}>
                  {user.email} | {user.contact}
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles["card"]}>
            <h2 className={styles["payment-title"]}>Payment Options</h2>

            <div
              className={`${styles["option"]} ${
                selectedPayment === "UPI" ? styles["active-option"] : ""
              }`}
              onClick={() => {
                selectedPayment === "UPI"
                  ? setSelectedPayment("")
                  : setSelectedPayment("UPI");
              }}
            >
              <div className={styles["option-left"]}>
                <WalletOutlined className={styles["payment-icon"]} />

                <div>
                  <div className={styles["option-title"]}>UPI Options</div>

                  <div className={styles["option-sub"]}>
                    Pay directly from Bank
                  </div>
                </div>
              </div>

              {selectedPayment === "UPI" ? (
                <DownOutlined className={styles["arrow"]} />
              ) : (
                <ArrowRightOutlined className={styles["arrow"]} />
              )}
            </div>

            {selectedPayment === "UPI" && (
              <div className={styles["payment-form"]}>
                <label>Enter UPI ID</label>

                <input type="text" placeholder="example@upi" />
              </div>
            )}

            <div
              className={`${styles["option"]} ${
                selectedPayment === "CARD" ? styles["active-option"] : ""
              }`}
              onClick={() => {
                selectedPayment === "CARD"
                  ? setSelectedPayment("")
                  : setSelectedPayment("CARD");
              }}
            >
              <div className={styles["option-left"]}>
                <CreditCardOutlined className={styles["payment-icon"]} />

                <div>
                  <div className={styles["option-title"]}>
                    Credit / Debit Card
                  </div>

                  <div className={styles["option-sub"]}>
                    Visa, MasterCard, Rupay
                  </div>
                </div>
              </div>

              {selectedPayment === "CARD" ? (
                <DownOutlined className={styles["arrow"]} />
              ) : (
                <ArrowRightOutlined className={styles["arrow"]} />
              )}
            </div>

            {selectedPayment === "CARD" && (
              <div className={styles["payment-form"]}>
                <label>Card Number</label>

                <input type="text" placeholder="XXXX XXXX XXXX XXXX" />

                <label>Card Holder Name</label>

                <input type="text" placeholder="Enter Name" />

                <div className={styles["card-row"]}>
                  <div>
                    <label>Expiry</label>

                    <input type="text" placeholder="MM/YY" />
                  </div>

                  <div>
                    <label>CVV</label>

                    <input type="password" placeholder="***" />
                  </div>
                </div>
              </div>
            )}

            <div
              className={`${styles["option"]} ${
                selectedPayment === "NET_BANKING" ? styles["active-option"] : ""
              }`}
              onClick={() => {
                selectedPayment === "NET_BANKING"
                  ? setSelectedPayment("")
                  : setSelectedPayment("NET_BANKING");
              }}
            >
              <div className={styles["option-left"]}>
                <BankOutlined className={styles["payment-icon"]} />

                <div>
                  <div className={styles["option-title"]}>Net Banking</div>

                  <div className={styles["option-sub"]}>
                    40+ Banks Available
                  </div>
                </div>
              </div>

              {selectedPayment === "NET_BANKING" ? (
                <DownOutlined className={styles["arrow"]} />
              ) : (
                <ArrowRightOutlined className={styles["arrow"]} />
              )}
            </div>

            {selectedPayment === "NET_BANKING" && (
              <div className={styles["payment-form"]}>
                <label>Select Bank</label>

                <select>
                  <option>Select Bank</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>AXIS</option>
                </select>
              </div>
            )}
          </Card>
        </div>

        <div className={styles["right"]}>
          <Card className={styles["card"]}>
            <h2 className={styles["total-title"]}>
              Total Due
              <span>₹ {booking.totalAmount}</span>
            </h2>

            <Divider />

            <div className={styles["price-row"]}>
              <span>Base Price</span>

              <span>₹ {booking.totalAmount}</span>
            </div>

            <div className={styles["price-row"]}>
              <span>Discount</span>

              <span className={styles["discount"]}>- ₹ {booking.discount}</span>
            </div>

            <div className={styles["price-row"]}>
              <span>Taxes & Fees</span>

              <span>₹ {booking.tax}</span>
            </div>

            <Divider />

            <Button
              type="primary"
              size="large"
              className={styles["pay-btn"]}
              block
              disabled={!selectedPayment}
              onClick={handleUPIPayment}
            >
              Pay ₹ {booking.totalAmount}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
