import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import PrintableTicket from "./PrintableTicket";
import "../styles/ticketPreviewModal.css";

function TicketPreviewModal({
  ticket,
  open,
  onClose,
}) {
  const printableRef = useRef(null);

  const [fullscreen, setFullscreen] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open || !ticket) {
    return null;
  }

  const downloadPNG = async () => {
    if (!printableRef.current) {
      return;
    }

    const canvas = await html2canvas(
      printableRef.current,
      {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      }
    );

    const link =
      document.createElement("a");

    link.download =
      `${ticket.ticketId}.png`;

    link.href =
      canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <div className="ticket-modal-overlay">

      <div
        className={
          fullscreen
            ? "ticket-modal fullscreen"
            : "ticket-modal"
        }
      >

        {/* Header */}

        <div className="ticket-modal-header">

          <h2>
            Ticket Preview
          </h2>

          <div className="ticket-modal-actions">

            <button
              onClick={downloadPNG}
            >
              ⬇ Download PNG
            </button>

            <button
              onClick={() =>
                setFullscreen(
                  !fullscreen
                )
              }
            >
              {fullscreen
                ? "🗗 Exit Fullscreen"
                : "⛶ Fullscreen"}
            </button>

            <button
              onClick={onClose}
            >
              ✕ Close
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="ticket-modal-body">

          <div ref={printableRef}>

            <PrintableTicket
              ticket={ticket}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default TicketPreviewModal;