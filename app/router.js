const express = require("express");
const { categoryController} = require ("../app/controller/categoryController");
const { plannerController } = require ("../app/controller/plannerController");
const { taskController } = require("../app/controller/taskController");
const { userController } = require ("../app/controller/userController");


const router = express.Router();


/** ROUTES USER  */
router.get("/", userController ) // récupère le profil d'un user
router.post("/user/login", userController ) // router pour logguer un utilisateur
router.post("/", userController) // Ajoute un utilisateur en bdd
router.put("/:id", userController) // modifier un utilisateur en bdd
router.delete("/:id", userController ) //supprime un utilisateur

/** ROUTES PLANNER */
router.get("/user/:id", plannerController) // récupère tous les tableaux d'un user
router.get ("/:id", plannerController) //récupère un tableau via son id avec ses données liées 
router.put("/:id", plannerController) // modifie un tableau
router.post("/:id", plannerController) // ajoute un tableau
router.delete("/:id", plannerController) // supprime un tableau

/** ROUTES TASK */
router.get("/planner/:id/user/:id", taskController) // récupère les tâches d'un user dans un tableau
router.post("/planner/post", taskController) // ajoute un tâche dans un tableau
router.put("/:id/planner/:id", taskController) // modifie une tâche dans un tableau
router.delete("/:id/planner/:id", taskController) // supprime une tâche dans un tableau

/** ROUTES CATEGORIES */
router.get("/", categoryController) // récupère toutes les catégories
router.get("/:id/planner/:id/task/", categoryController) //récupère les tâches d’une catégorie dans un planner
router.post("/", categoryController) //créer une catégorie
router.delete("/:id", categoryController) //supprimer une catégorie
router.put("/:id", categoryController) //modifier une catégorie


module.exports = router;
