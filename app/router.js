const express = require("express");
const { categoryController} = require ("../app/controller/categoryController");
const { plannerController } = require ("../app/controller/plannerController");
const { taskController } = require("../app/controller/taskController");
const { userController } = require ("../app/controller/userController");


const router = express.Router();


/** ROUTES USER  */
router.get("/", userController.getUser ) // récupère le profil d'un user
router.post("/user/login", userController ) // router pour logguer un utilisateur
router.post("/", userController.addUser) // Ajoute un utilisateur en bdd
router.put("/:id", userController.updateUser) // modifier un utilisateur en bdd
router.delete("/:id", userController.deleteUser ) //supprime un utilisateur

/** ROUTES PLANNER */
router.get("/user/:id", plannerController.getUserPlanners) // récupère tous les tableaux d'un user
router.get ("/:id", plannerController.getPlanner) //récupère un tableau via son id avec ses données liées 
router.put("/:id", plannerController.updatePlanner) // modifie un tableau
router.post("/:id", plannerController.createPlanner) // ajoute un tableau
router.delete("/:id", plannerController.deletePlanner) // supprime un tableau

/** ROUTES TASK */
router.get("/planner/:id/user/:id", taskController.getUserTasks) // récupère les tâches d'un user dans un tableau
router.post("/planner/post", taskController.addTaskInPlanner) // ajoute un tâche dans un tableau
router.put("/:id/planner/:id", taskController.updateTask) // modifie une tâche dans un tableau
router.delete("/:id/planner/:id", taskController.deleteTask) // supprime une tâche dans un tableau

/** ROUTES CATEGORIES */
router.get("/", categoryController.getAllCategories) // récupère toutes les catégories
router.get("/:id/planner/:id/task/", categoryController.getCategoryTasks) //récupère les tâches d’une catégorie dans un planner
router.post("/", categoryController.createCategory) //créer une catégorie
router.delete("/:id", categoryController.deleteCategory) //supprimer une catégorie
router.put("/:id", categoryController.updateCategory) //modifier une catégorie


module.exports = router;
