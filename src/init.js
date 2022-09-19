import 'dotenv/config';
import app from './server';

const PORT = 8000; //임시
// const PORT = process.env.PORT;

const handleListening = () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);