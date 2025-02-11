import express from "express";
const router = express.Router();

let narudzbe = [];

router.post("/naruci", (req, res) => {
  let ukupna_cijena = 0;

  let obavezni_kljucevi = ["narudzba", "klijent"];
  if (!obavezni_kljucevi.every((k) => k in req.body)) {
    res.status(400).json({ message: "Nedostaju obavezna polja!" });
    return;
  }

  let { narudzba, klijent } = req.body;

  if (!Array.isArray(narudzba)) {
    res.status(400).json({ message: "Narudzba mora biti polje!" });
    return;
  }

  let obavezni_kljucevi_klijenta = ["prezime", "adresa", "broj_tel"];

  if (!obavezni_kljucevi_klijenta.every((k) => k in klijent)) {
    res.status(400).json({ message: "Nedostaju obavezni kljucevi!" });
    return;
  }

  let obavezni_kljucevi_stavke = ["naziv", "količina", "veličina"];

  for (let item of narudzba) {
    if (!obavezni_kljucevi_stavke.every((k) => k in item)) {
      res.status(400).json({ message: "Nedostaju obavezni kljucevi stavke!" });
      return;
    }

    let pizza = pizze.find((p) => p.naziv == item.naziv);

    if (!pizza) {
      res.status(404).json({
        message: "Narucili biste pizzu koja ne postoji u nasem jelovniku!",
      });
      return;
    }

    ukupna_cijena += pizza.cijena * item.količina;
  }

  let nova_narudzba = {
    id: narudzbe.length + 1,
    narudzba,
    klijent,
    ukupna_cijena,
  };
  narudzbe.push(nova_narudzba);

  res.status(200).json({
    message: `Vasa narudzba za ${narudzba
      .map((item) => `${item.naziv} sa količinom ${item.količina}`)
      .join(", ")} je uspjesno zaprimljena`,
    prezime: klijent.prezime,
    broj_telefona: klijent.broj_tel,
    ukupna_cijena,
  });
});

export default router;
