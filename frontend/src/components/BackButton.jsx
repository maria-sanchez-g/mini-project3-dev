import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        padding: "8px 12px",
        fontSize: "16px",
        borderRadius: "6px",
        background: "#ccc",
        border: "1px solid #999",
        cursor: "pointer",
        marginBottom: "20px"
      }}
    >
      ← Back
    </button>
  );
}
