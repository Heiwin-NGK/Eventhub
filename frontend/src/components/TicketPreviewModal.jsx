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

const printTicket = () => {
  const printContents = printableRef.current.innerHTML;

  const printWindow = window.open("", "", "width=1200,height=900");

  printWindow.document.write(`
    <html>
      <head>
        <title>${ticket.ticketId}</title>

        <style>
          body{
            margin:20px;
            background:#f5f5f5;
            display:flex;
            justify-content:center;
          }

          img{
            max-width:100%;
          }
        </style>

      </head>

      <body>

        ${printContents}

      </body>

    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
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
  onClick={printTicket}
>
  🖨 Print
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