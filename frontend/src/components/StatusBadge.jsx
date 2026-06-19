function StatusBadge({ status }) {
  let color = "#6c757d";

  switch (status) {
    case "Draft":
      color = "#6c757d";
      break;

    case "Upcoming":
      color = "#28a745";
      break;

    case "Ongoing":
      color = "#fd7e14";
      break;

    case "Completed":
      color = "#343a40";
      break;

    case "Cancelled":
      color = "#dc3545";
      break;

    case "Full":
      color = "#dc3545";
      break;

    default:
      color = "#6c757d";
  }

  return (
    <span
      style={{
        background: color,
        color: "#fff",
        padding: "5px 12px",
        borderRadius: "20px",
        fontWeight: "bold",
        fontSize: "13px",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;