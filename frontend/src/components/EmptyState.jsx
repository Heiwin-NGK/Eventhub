function EmptyState({
  title,
  message,
  icon = "📭",
}) {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        padding: "50px",
      }}
    >
      <div
        style={{
          fontSize: "60px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>
      <h2>{title}</h2>
      {message && (
        <p
          style={{
            color: "#666",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default EmptyState;