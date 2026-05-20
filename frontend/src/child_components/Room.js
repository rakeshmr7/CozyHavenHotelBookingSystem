import { Card } from "antd";

const { Meta } = Card;

const Room = ({ obj }) => (
  <Card
    hoverable
    style={{
      width: 280,
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      border: "none",
    }}
    cover={
      <img
        draggable={false}
        alt="room"
        src={obj.pic}
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />
    }
  >
    <h2 style={{ color: "#9c179e" }}>{obj.roomType}</h2>

    <p>
      <b>Room ID:</b> {obj.roomId}
    </p>

    <p>
      <b>Base Fare:</b> ₹{obj.baseFare}
    </p>

    <p>
      <b>Maximum Occupancy:</b> {obj.maxOccupy}
    </p>

    <p>
      <b>AC:</b> {obj.ac ? "Yes" : "No"}
    </p>

    <p>
      <b>Available:</b> {obj.available ? "Yes" : "No"}
    </p>
  </Card>
);

export default Room;
