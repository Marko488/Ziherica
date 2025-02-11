import express from "express";
const router = express.Router();

const pizze = [
  { id: 1, naziv: "Margherita", cijena: 6.5 },
  { id: 2, naziv: "Capricciosa", cijena: 8.0 },
  { id: 3, naziv: "Quattro formaggi", cijena: 10.0 },
  { id: 4, naziv: "Šunka sir", cijena: 7.0 },
  { id: 5, naziv: "Vegetariana", cijena: 9.0 },
];

router.get("/:id", (req, res) => {
  const id_pizza = req.params.id;

  if (isNaN(id_pizza)) {
    res.status(400).json({ message: "POslali ste id koji nije broj! " });
    return;
  }

  let pizza = pizze.find((p) => p.id == id_pizza);
  if (pizza) {
    res.status(200).json(pizza);
  } else {
    res.status(404).json({ message: "Ne postoji!" });
  }
});

router.get("/", (req, res) => {
  res.status(200).json(pizze);
});

router.post("/", (req, res) => {
  let pizza = req.body;
  let nova_pizza = {
    id: pizze.length + 1,
    naziv: pizza.naziv,
  };

  pizze.push(nova_pizza);
});

router.put("/:id", (req, res) => {
  let nova_pizza = req.body;
  let id_param = req.params.id;
  nova_pizza.id = id_param;

  let index = pizze.findIndex((p) => p.id == id_param);
  if (index != -1) {
    pizze[index] = nova_pizza;
    res.status(200).json({ nova_pizza: pizze[index], sve_pizze: pizze });
  } else {
    res
      .status(404)
      .json({ message: "Zelite azurirat pizzu koja ne postoji sa tim ID_EM!" });
  }
});

router.patch("/:id", (req, res) => {
  let id_param = req.params.id;
  let nova_pizza = req.body;

  let index = pizze.findIndex((p) => p.id == id_param);
  if (index != -1) {
    pizze[index] = { ...pizze[index], ...nova_pizza };
    res.status(200).json(pizze[index]);
  } else {
    res
      .status(404)
      .json({ message: "Zelite azurirat pizzu koja ne postoji sa tim ID_EM!" });
  }
});

router.delete("/:id", (req, res) => {
  let id_pizza = req.params.id;
  let index = pizze.findIndex((p) => p.id == id_pizza);

  if (index != -1) {
    pizze.splice(index, 1);
    res.status(200).json(pizze);
  } else {
    res.status(404).json({ message: "Zelite obrisat nesto sto ne postoji!" });
  }
});

export default router;
