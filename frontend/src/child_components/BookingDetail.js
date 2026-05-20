const BookingDetail = ({ booking }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        marginBottom: "25px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          color: "#a000a0",
          marginBottom: "15px",
        }}
      >
        {booking.hotelName}
      </h2>

      <p>
        <strong>Booking Id :</strong> {booking.bookingId}
      </p>

      <p>
        <strong>Room Type :</strong> {booking.roomType}
      </p>

      <p>
        <strong>Check In :</strong> {booking.checkInDate}
      </p>
f
      <p>
        <strong>Check Out :</strong> {booking.checkOutDate}
      </p>

      <p>
        <strong>Adults :</strong> {booking.adultCount}
      </p>

      <p>
        <strong>Children :</strong> {booking.childCount}
      </p>

      <p>
        <strong>Total Amount :</strong> ₹{booking.totalAmount}
      </p>

      <p>
        <strong>Status :</strong> {booking.status}
      </p>

      <p>
        <strong>Room Id :</strong> {booking.roomId}
      </p>

      {booking.cancellationReason && (
        <p>
          <strong>Cancellation Reason :</strong> {booking.cancellationReason}
        </p>
      )}
    </div>
  );
};

export default BookingDetail;
