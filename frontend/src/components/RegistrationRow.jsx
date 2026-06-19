import RegistrationStatusBadge from "./RegistrationStatusBadge";
import { formatDate } from "../utils/dateFormatter";
import { confirmAction } from "../utils/confirmHandler";

function RegistrationRow({
  registration,
  onCheckIn,
  onRemove,
}) {

  const handleCheckIn = () => {
    if (
      !confirmAction(
        "Mark attendee as checked in?"
      )
    ) {
      return;
    }

    onCheckIn(registration._id);
  };

  const handleRemove = () => {
    if (
      !confirmAction(
        "Remove this attendee?"
      )
    ) {
      return;
    }

    onRemove(registration._id);
  };

  return (
    <tr>

      <td>
        {registration.userId?.name}
      </td>

      <td>
        {registration.userId?.email}
      </td>

      <td>
        {registration.ticket?.ticketId || "-"}
      </td>

      <td>
        {formatDate(registration.createdAt)}
      </td>

      <td>
        <RegistrationStatusBadge
          status={registration.status}
        />
      </td>

      <td>

        {registration.status === "checked_in" ? (

          <button disabled>
            ✓ Checked In
          </button>

        ) : (

          <button type="button" onClick={handleCheckIn}>
            Check In
          </button>

        )}

        {" "}

        <button type="button" onClick={handleRemove}>
          Remove
        </button>

      </td>

    </tr>
  );
}

export default RegistrationRow;