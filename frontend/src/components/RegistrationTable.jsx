import RegistrationRow from "./RegistrationRow";

function RegistrationTable({
  registrations,
  onCheckIn,
  onRemove,
}) {
  return (
    <table>

<thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Ticket</th>
    <th>Registered On</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>

      <tbody>

        {registrations.map((registration) => (
          <RegistrationRow
            key={registration._id}
            registration={registration}
            onCheckIn={onCheckIn}
            onRemove={onRemove}
          />
        ))}

      </tbody>

    </table>
  );
}

export default RegistrationTable;
