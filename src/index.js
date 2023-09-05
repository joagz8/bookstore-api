import express from "express";
import booksRouter from "./routes/index.routes.js"
import authorsRouter from "./routes/authors.routes.js"
import pubishersRouter from "./routes/publishers.routes.js"
import salesRouter from "./routes/sales.routes.js"
import registers from "./routes/registers.routes.js"
import { PORT } from "./config.js";

const app = express()

app.use(express.json())
app.use(booksRouter)
app.use(authorsRouter)
app.use(pubishersRouter)
app.use(salesRouter)
app.use(registers)

app.listen(PORT)
console.log('Running on port 3000');

