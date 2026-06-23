function QRCodeCard({ qrCode }) {
  return (
    <div className="card">
      <h3>QR Code</h3>

      <img
        src={qrCode}
        alt="Ticket QR"
        style={{
          width: "220px",
          display: "block",
          margin: "20px auto",
        }}
      />

      <p
        style={{
          textAlign: "center",
        }}
      >
        Scan this QR at the venue
      </p>
    </div>
  );
}

export default QRCodeCard;