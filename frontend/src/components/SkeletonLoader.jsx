import "../styles/SkeletonLoader.css";

function SkeletonLoader({ count = 3 }) {
  return (
    <div className="skeleton-container">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;