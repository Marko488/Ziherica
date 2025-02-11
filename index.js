import express from "express";
import narudzbeRouter from "./routes/narudzbe.js";
import pizzeRouter from "./routes/pizze.js";
const app = express();
app.use(express.json());
const PORT = 3000;
app.use("/narudzbe", narudzbeRouter);
app.use("/pizze", pizzeRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Posluzitelj nije pokrenut!");
  } else {
    console.log("Posluzitelj uspjesno pokrenut!");
  }
});
