import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Modal, Table, Button, Card, Spin } from "antd";
import styles from "../css/AdminDash.module.css";

const AdminDash = () => {

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [owners, setOwners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!storedUser) {
      message.error("Please Login");
      navigate("/signIn");
      return;
    }
    if (storedUser.user.role !== "ADMIN") {
      message.error("Access Denied");
      navigate("/");
      return;
    }
    setCurrentUser(storedUser);
    fetchBookings(storedUser.token);
    fetchOwners(storedUser.token);
    fetchCustomers(storedUser.token);
  }, []);

  const fetchBookings = (token) => {
    fetch("http://localhost:9090/booking/admin/showAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBookings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Unable to fetch bookings");
        setBookings([]);
        setLoading(false);
      });
  };

  const fetchOwners = (token) => {
    fetch("http://localhost:9090/user/admin/showAllOwners", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOwners(res.data || []);
      })
      .catch((err) => {
        console.log(err);
        setOwners([]);
      });
  };
  const fetchCustomers = (token) => {
    fetch("http://localhost:9090/user/admin/showAllCustomers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCustomers(res.data || []);
      })
      .catch((err) => {
        console.log(err);
        setCustomers([]);
      });
  };

  const deleteOwner = (id) => {
    Modal.confirm({
      title: "Delete Owner?",
      content: "This action cannot be undone",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        fetch(`http://localhost:9090/user/admin/deleteOwner/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
          .then((res) => res.json())
          .then(() => {
            message.success("Owner Deleted");
            fetchOwners(currentUser.token);
          })
          .catch(() => {
            message.error("Unable to delete owner");
          });
      },
    });
  };

  const deleteCustomer = (id) => {
    Modal.confirm({
      title: "Delete Customer?",
      content: "This action cannot be undone",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        fetch(`http://localhost:9090/user/admin/deleteCustomer/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
          .then((res) => res.json())
          .then(() => {
            message.success("Customer Deleted");
            fetchCustomers(currentUser.token);
          })
          .catch(() => {
            message.error("Unable to delete customer");
          });
      },
    });
  };

  const bookingColumns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
    },
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
    },
    {
      title: "Check In",
      dataIndex: "checkInDate",
    },
    {
      title: "Check Out",
      dataIndex: "checkOutDate",
    },
    {
      title: "Adults",
      dataIndex: "adultCount",
    },
    {
      title: "Children",
      dataIndex: "childCount",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const userColumns = [
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          {record.role === "OWNER" && (
            <Button danger onClick={() => deleteOwner(record.userId)}>
              Delete Owner
            </Button>
          )}

          {record.role === "CUSTOMER" && (
            <Button danger onClick={() => deleteCustomer(record.userId)}>
              Delete Customer
            </Button>
          )}
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles["admin-page"]}>

      <div className={styles.navbar}>
        <div className={styles.logo}>CozyHaven Admin</div>

        <div className={styles["nav-links"]}>
          <Link to="/">Home</Link>
          <Link to="/search">Hotels</Link>
          <Link to="/userProfile">Profile</Link>
          <button
            className={styles.logout}
            onClick={() => {
              sessionStorage.clear();
              navigate("/signIn");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.cards}>
          <Card className={styles.card}>
            <h2>Total Bookings</h2>
            <h1>{bookings.length}</h1>
          </Card>
          <Card className={styles.card}>
            <h2>Total Users</h2>

            <h1>{owners.length + customers.length}</h1>
          </Card>

          <Card className={styles.card}>
            <h2>Total Owners</h2>

            <h1>{owners.length}</h1>
          </Card>

          <Card className={styles.card}>
            <h2>Total Customers</h2>

            <h1>{customers.length}</h1>
          </Card>
        </div>

        <div className={styles.tableSection}>
          <h2>All Bookings</h2>

          <Table
            columns={bookingColumns}
            dataSource={bookings}
            rowKey="bookingId"
            pagination={{ pageSize: 5 }}
          />
        </div>

        <div className={styles.tableSection}>
          <h2>Manage Owners</h2>

          <Table
            columns={userColumns}
            dataSource={owners}
            rowKey="userId"
            pagination={{ pageSize: 5 }}
          />
        </div>


        <div className={styles.tableSection}>
          <h2>Manage Customers</h2>

          <Table
            columns={userColumns}
            dataSource={customers}
            rowKey="userId"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
