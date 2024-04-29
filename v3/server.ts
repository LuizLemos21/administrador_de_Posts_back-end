import express from 'express';
import router from './routes';

const morgan = require('morgan');


const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());  // This will enable CORS for all routes and origins

app.use(express.json());
app.use(morgan('dev'));
app.use(router);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
