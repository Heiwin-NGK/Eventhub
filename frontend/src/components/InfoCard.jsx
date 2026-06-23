function InfoCard({ title, color, children }) {
  return (
    <div className="info-card">

      <div
        className="info-card-header"
        style={{
          color,
          borderBottom: `2px solid ${color}20`,
        }}
      >
        {title}
      </div>

      <div className="info-card-body">
        {children}
      </div>

    </div>
  );
}

export default InfoCard;