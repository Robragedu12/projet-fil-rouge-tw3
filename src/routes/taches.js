import { Router } from "express";
import { authentifier } from "../middlewares/auth.js";

const router = Router();
const taches = [
  { id: "tache1", faite: "true" },
  { id: "tache2", faite: "false" }
];

router.get("/",authentifier, (req, res) => {
    const { faite } = req.query;

    if (faite === undefined) {
        console.log(req.query);
        return res.json(taches);
    }

    const result = taches.filter((t) => String(t.faite) == faite);
    res.json(result);
});

router.get("/:id",authentifier, (req, res) => {
    const tache = taches.find((t) => t.id === req.params.id);
    if (!tache) {
        return res.status(404).json({ error: "Tâche introuvable" });
    }
    res.json(tache);
});

router.post("/", authentifier, (req, res) => {
  const nouvelleTache = req.body;
  taches.push(nouvelleTache);
  res.status(201).json(nouvelleTache);
});

router.patch("/:id", authentifier, (req, res) => {
  const index = taches.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    const err = new Error("tache introuvable");
    err.statusCode = 404;
    return next(err)
  }

  taches[index] = { ...taches[index], ...req.body };
  res.json(taches[index]);
});

router.delete("/:id",authentifier, (req, res) => {
  const index = taches.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    const err = new Error("tache introuvable");
    err.statusCode = 404;
    return next(err)
  }

  const [supprimee] = taches.splice(index, 1);
  res.json({ message: "Tâche supprimée", tache: supprimee });
});

export default router;