require('dotenv').config()
import helmet from "helmet";
import express from "express";
import { routes } from "./router";
import morgan from "morgan";

const cors = require('cors')
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(morgan("tiny"));
app.use(routes);

app.listen(process.env.PORT || 8080, () => console.log(`Server is run ${process.env.PORT || 8080}`));

export default app 