function StatsCard({
  title,
  value,
}) {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
      }}
    >
      <h4>{title}</h4>

      <h2
        style={{
          marginTop: "10px",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;