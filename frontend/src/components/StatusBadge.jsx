function StatusBadge({ status }) {
  let color = "#6c757d";
  if (status === "Upcoming")
    color = "#28a745";
  else if (status === "Ongoing")
    color = "#fd7e14";
  else if (status === "Completed")
    color = "#6c757d";
  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "bold",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;