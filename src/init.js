import "dotenv/config";
import app from "./server";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};

app.listen(8000, handleListening);
