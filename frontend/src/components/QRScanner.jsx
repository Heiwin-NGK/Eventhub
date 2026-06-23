import { Scanner } from "@yudiel/react-qr-scanner";

function QRScanner({
  onScan,
  onError,
}) {
  return (
    <div className="card">
      <h2>QR Code Scanner</h2>

      <Scanner
        onScan={(result) => {
          if (result?.length > 0) {
            onScan(result[0].rawValue);
          }
        }}
        onError={onError}
        constraints={{
          facingMode: "environment",
        }}
        styles={{
          container: {
            width: "100%",
          },
        }}
      />

      <p
        style={{
          marginTop: "15px",
          color: "#666",
          textAlign: "center",
        }}
      >
        Point your camera at an EventHub QR code.
      </p>
    </div>
  );
}

export default QRScanner;