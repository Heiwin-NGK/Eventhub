function CapacityBar({ current, total }) {
  const percentage = total ? (current / total) * 100 : 0;

  let color = "#28a745";

  if (percentage >= 90) {
    color = "#dc3545";
  } else if (percentage >= 70) {
    color = "#fd7e14";
  }

  return (
    <div style={{ margin: "12px 0" }}>
      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#e9ecef",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: color,
            transition: "0.3s",
          }}
        />
      </div>

      <small>
        {current} / {total} Registered
      </small>
    </div>
  );
}

export default CapacityBar;