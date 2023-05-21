const morgan = require("morgan")
const cors = require('cors')
const routes = require("./routes")
const path = require('path');
import express, { Response } from 'express';
const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))
app.use(morgan("dev"))

app.use(express.json({ limit: '200mb' }));

app.use("/api", routes)

app.use((err, _, res: Response, __) => {
  console.error(err.stack)
  res.status(500).send("Server error")
})

const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
  app.get('*', (req, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`* Server listening on Port: ${PORT}... *`))

module.exports = app