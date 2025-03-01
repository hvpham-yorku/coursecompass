import cors from 'cors';
import express from 'express';
import records from './routes/record.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/",records);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})