// EditRoom.jsx

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const EditRoom = ({ room, deleteRoom }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        border: "none",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      }}
      cover={
        <img
          src={room.imageUrl}
          alt="room"
          style={{
            height: "240px",
            objectFit: "cover",
          }}
        />
      }
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        {room.roomType}
      </h1>

      <p
        style={{
          fontSize: "18px",
          marginBottom: "18px",
        }}
      >
        {room.location} • ₹{room.baseFare}/night
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{
            background: "#9c179e",
            border: "none",
            height: "42px",
            borderRadius: "10px",
            flex: 1,
          }}
          onClick={() => navigate(`/editroom/${room.roomId}`, { state: room })}
        >
          {" "}
          Edit{" "}
        </Button>

        <Button
          danger
          icon={<DeleteOutlined />}
          style={{
            height: "42px",
            borderRadius: "10px",
            flex: 1,
          }}
          onClick={() => deleteRoom(room.roomId)}
        >
          {" "}
          Delete{" "}
        </Button>
      </div>
    </Card>
  );
};

export default EditRoom;
