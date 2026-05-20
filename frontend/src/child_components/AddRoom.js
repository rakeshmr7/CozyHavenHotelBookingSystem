import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Upload,
  Divider,
  Typography,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import Room from "./Room";

const { Title } = Typography;

const AddRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roomId, setRoomId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [maxOccupy, setMaxOccupy] = useState("");
  const [baseFare, setBaseFare] = useState("");
  const [ac, setAc] = useState(false);
  const [available, setAvailable] = useState(true);
  const [hotelId, setHotelId] = useState("");
  const [pic, setPic] = useState("");

  const [rooms, setRooms] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const obj = {
      roomId,
      roomType,
      maxOccupy,
      baseFare,
      ac,
      available,
      hotelId,
      pic: URL.createObjectURL(pic),
    };

    setRooms([...rooms, obj]);

    setIsModalOpen(false);

    setRoomId("");
    setRoomType("");
    setMaxOccupy("");
    setBaseFare("");
    setAc(false);
    setAvailable(true);
    setHotelId("");
    setPic("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{
          background: "#9c179e",
          border: "none",
          height: "45px",
          borderRadius: "10px",
          fontWeight: "600",
          padding: "0 25px",
        }}
      >
        Add Rooms
      </Button>

      <Modal
        title={
          <Title level={3} style={{ margin: 0, color: "#9c179e" }}>
            Room Details
          </Title>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Room"
        width={850}
        okButtonProps={{
          style: {
            background: "#9c179e",
            border: "none",
            borderRadius: "8px",
          },
        }}
        cancelButtonProps={{
          style: {
            borderRadius: "8px",
          },
        }}
      >
        <Divider orientation="left">Room Information</Divider>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <InputNumber
              placeholder="Enter Room ID"
              style={{
                width: "100%",
                height: "45px",
              }}
              value={roomId}
              onChange={(value) => setRoomId(value)}
            />
          </Col>

          <Col span={12}>
            <Input
              placeholder="Enter Room Type"
              style={{
                height: "45px",
                borderRadius: "8px",
              }}
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
          </Col>

          <Col span={12}>
            <InputNumber
              placeholder="Maximum Occupancy"
              style={{
                width: "100%",
                height: "45px",
              }}
              value={maxOccupy}
              onChange={(value) => setMaxOccupy(value)}
            />
          </Col>

          <Col span={12}>
            <InputNumber
              placeholder="Enter Base Fare"
              style={{
                width: "100%",
                height: "45px",
              }}
              value={baseFare}
              onChange={(value) => setBaseFare(value)}
            />
          </Col>

          <Col span={12}>
            <InputNumber
              placeholder="Enter Hotel ID"
              style={{
                width: "100%",
                height: "45px",
              }}
              value={hotelId}
              onChange={(value) => setHotelId(value)}
            />
          </Col>

          <Col
            span={12}
            style={{ display: "flex", alignItems: "center", gap: "30px" }}
          >
            <Checkbox checked={ac} onChange={(e) => setAc(e.target.checked)}>
              AC Available
            </Checkbox>

            <Checkbox
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            >
              Available
            </Checkbox>
          </Col>
        </Row>

        <Divider orientation="left" style={{ marginTop: "30px" }}>
          Room Image
        </Divider>

        <Upload
          beforeUpload={() => false}
          showUploadList={false}
          onChange={(e) => setPic(e.file.originFileObj)}
        >
          <Button
            icon={<UploadOutlined />}
            style={{
              height: "42px",
              borderRadius: "8px",
            }}
          >
            Upload Room Image
          </Button>
        </Upload>

        <br />
        <br />

        {pic && (
          <img
            src={URL.createObjectURL(pic)}
            alt="preview"
            style={{
              width: "220px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "3px solid #f0d4f2",
            }}
          />
        )}
      </Modal>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#9c179e" }}>Room List</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {rooms.map((obj, index) => (
          <Room key={index} obj={obj} />
        ))}
      </div>
    </div>
  );
};

export default AddRoom;
