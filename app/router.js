const express = require("express");

const router = express.Router();


/** ROUTES USER  */
router.get("/",  ) // récupère le profil d'un user
router.post("/user/login", ) // router pour logguer un utilisateur
router.post("/",) // Ajoute un utilisateur en bdd
router.put("/:id",) // modifier un utilisateur en bdd
router.delete("/:id",  ) //supprime un utilisateur

/** ROUTES PLANNER */
router.get("/user/:id") // récupère tous les tableaux d'un user
router.get ("/:id") //récupère un tableau via son id avec ses données liées 
router.put("/:id") // modifie un tableau
router.post("/:id") // ajoute un tableau
router.delete("/:id") // supprime un tableau

/** ROUTES TASK */
router.get("/planner/:id/user/:id") // récupère les tâches d'un user dans un tableau
router.post("/planner/post") // ajoute un tâche dans un tableau
router.put("/:id/planner/:id") // modifie une tâche dans un tableau
router.delete("/:id/planner/:id") // supprime une tâche dans un tableau


/** ROUTES CATEGORIES */
router.get("/") // récupère toutes les catégories
router.get("/:id/planner/:id/task/") //récupère les tâches d’une catégorie dans un planner
router.post("/") //créer une catégorie
router.delete("/:id") //supprimer une catégorie
router.put("/:id") //modifier une catégorie


module.exports = router;
