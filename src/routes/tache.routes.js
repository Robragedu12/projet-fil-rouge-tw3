import { Router } from "express";
import { authentifier } from "../middlewares/auth.js";

const router = Router();
const taches = [
  { id: "tache1", faite: "true" },
  { id: "tache2", faite: "false" }
];

router.get("/",authentifier, (req, res) => {
    const page = req.query.page ?? "1";
    const limit = req.query.limit ?? "20";
    const pageValue = typeof page === "string" && page.trim() === "" ? "1" : page;
    const limitValue = typeof limit === "string" && limit.trim() === "" ? "20" : limit;
    
    const pageNumber = Number(pageValue);
    const limitNumber = Number(limitValue);

    if (!Number.isSafeInteger(pageNumber) || !Number.isSafeInteger(limitNumber)) {
        return res.status(400).json({
            error: "Les paramètres page et limit doivent être des entiers positifs."
        });
    }

    const start = (pageNumber - 1) * limitNumber;
    const result = taches.slice(start, start + limitNumber);
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