import { useEffect, useState } from "react";

export function SuccessAlert({ successMessage, onClose }) {
    const [visible, setVisible] = useState(!!successMessage);

    useEffect(() => {
        if (successMessage) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    if (!visible || !successMessage) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "16px",
                right: "16px",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    position: "fixed",
                    top: "70px",
                    right: "16px",
                    zIndex: 9999,
                    backgroundColor: "#22C55E", // verde
                    color: "white",
                    padding: "8px 24px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                {successMessage}
            </div>
        </div>
    );
}