import { colors } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";

export function ErrorAlert({ errorMessage, onClose }) {
    const [visible, setVisible] = useState(!!errorMessage);

    useEffect(() => {
        if (errorMessage) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    if (!visible || !errorMessage) return null;

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
                backgroundColor: "#EF4444",
                color: "white",
                padding: "8px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }}
        >{errorMessage}</div>
      </div>
  );
}
