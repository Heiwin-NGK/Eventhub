import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="card">
        <h1>EventHub Dashboard</h1>
      </div>

      <div className="card">
        <p>Welcome to EventHub</p>
      </div>

      <div className="card">
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
      </div>
    </>
  );
}

export default Dashboard;