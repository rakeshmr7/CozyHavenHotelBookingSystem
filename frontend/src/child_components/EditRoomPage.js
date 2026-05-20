import { Button, Card, Checkbox, Col, Input, InputNumber, Row } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//method pass
const EditRoomPage = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [room, setRoom] = useState(state);

  const handleUpdate = () => {
    console.log(room);

    navigate("/ownerdash");
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f6f3f7",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          borderRadius: "25px",
          border: "none",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#9c179e", marginBottom: "30px" }}> Edit Room </h1>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <InputNumber
              value={room.roomId}
              style={{
                width: "100%",
                height: "45px",
              }}
              onChange={(value) =>
                setRoom({
                  ...room,
                  roomId: value,
                })
              }
            />
          </Col>

          <Col span={12}>
            <Input
              value={room.roomType}
              style={{
                height: "45px",
              }}
              onChange={(e) =>
                setRoom({
                  ...room,
                  roomType: e.target.value,
                })
              }
            />
          </Col>

          <Col span={12}>
            <InputNumber
              value={room.maxOccupy}
              style={{
                width: "100%",
                height: "45px",
              }}
              onChange={(value) => setRoom({ ...room, maxOccupy: value })}
            />
          </Col>

          <Col span={12}>
            <InputNumber
              value={room.baseFare}
              style={{
                width: "100%",
                height: "45px",
              }}
              onChange={(value) =>
                setRoom({
                  ...room,
                  baseFare: value,
                })
              }
            />
          </Col>

          <Col span={12}>
            <InputNumber
              value={room.hotelId}
              style={{
                width: "100%",
                height: "45px",
              }}
              onChange={(value) =>
                setRoom({
                  ...room,
                  hotelId: value,
                })
              }
            />
          </Col>

          <Col
            span={12}
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={room.ac}
              onChange={(e) =>
                setRoom({
                  ...room,
                  ac: e.target.checked,
                })
              }
            >
              AC
            </Checkbox>

            <Checkbox
              checked={room.available}
              onChange={(e) =>
                setRoom({
                  ...room,
                  available: e.target.checked,
                })
              }
            >
              Available
            </Checkbox>
          </Col>
        </Row>

        <img
          src={room.imageUrl}
          alt="room"
          style={{
            width: "350px",
            height: "220px",
            objectFit: "cover",
            borderRadius: "18px",
            marginTop: "35px",
          }}
        />

        <div
          style={{
            marginTop: "35px",
          }}
        >
          <Button
            type="primary"
            style={{
              background: "#9c179e",
              border: "none",
              height: "45px",
              padding: "0 35px",
              borderRadius: "10px",
            }}
            onClick={handleUpdate}
          >
            Update Room
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditRoomPage;
