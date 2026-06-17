import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <h1>EventHub Dashboard</h1>

      <p>Welcome to EventHub</p>

      <p>
        Use the menu above to access:
      </p>

      <ul>
        <li>Events</li>
        <li>Tickets</li>
        <li>Notifications</li>
        <li>Analytics</li>
        <li>Reports</li>
      </ul>
    </>
  );
}

export default Dashboard;