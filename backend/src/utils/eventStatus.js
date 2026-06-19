
function getEventStatus(event) {
  if (event.status === "Cancelled") {
    return "Cancelled";
  }

  if (event.status === "Draft") {
    return "Draft";
  }

  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  if (now < start) {
    return "Upcoming";
  }

  if (now >= start && now <= end) {
    return "Ongoing";
  }

  return "Completed";
}

module.exports = getEventStatus;