import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import routes from './routes';
import errorHandlerMidleWare from './midlewares/errorHandlerMidleware';
import corsMidleWare from './midlewares/corsMidleware';

const app = express();

app.use(express.json());
app.use(corsMidleWare);
app.use(routes);
app.use(errorHandlerMidleWare);

app.listen(process.env.PORT, () => console.log(`🔥 Server started at http://localhost:${process.env.PORT}`));
