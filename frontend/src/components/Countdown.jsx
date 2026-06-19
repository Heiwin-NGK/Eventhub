function Countdown({ startDate, endDate }) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    const diff = Math.ceil(
      (start - now) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) {
      return <p>⏳ Starts Today</p>;
    }

    if (diff === 1) {
      return <p>⏳ Starts Tomorrow</p>;
    }

    return <p>⏳ Starts in {diff} days</p>;
  }

  if (now >= start && now <= end) {
    return <p>🟢 Event is Ongoing</p>;
  }

  return <p>✔ Event Completed</p>;
}

export default Countdown;