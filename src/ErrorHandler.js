import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export function ErrorHandler({ error }) {
  const navigate = useNavigate();
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
      <Button
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        Go Back
      </Button>
    </div>
  );
}
