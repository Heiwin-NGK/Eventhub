function RegistrationStatusBadge({ status }) {

  let color = "#6c757d";
  let text = status;

  switch (status) {

    case "registered":
      color = "#28a745";
      text = "Registered";
      break;

    case "checked_in":
      color = "#0d6efd";
      text = "Checked In";
      break;

    case "cancelled":
      color = "#dc3545";
      text = "Cancelled";
      break;

    default:
      break;
  }

  return (
    <span
      style={{
        background: color,
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {text}
    </span>
  );
}

export default RegistrationStatusBadge;