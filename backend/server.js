import cors from 'cors';
import express from 'express';
import courses from './routes/courses.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/courses",courses);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})