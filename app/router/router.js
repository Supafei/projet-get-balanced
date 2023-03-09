const express = require("express");
const categoryController = require ("../controller/categoryController");
const inviteController = require("../controller/inviteController");
const plannerController = require ("../controller/plannerController");
const taskController = require("../controller/taskController");
const userController = require ("../controller/userController");

// middlewares
const { checkToken} = require("../middleware/middlewareLogin");



const router = express.Router();


/** ROUTES USER  */
router.get("/user/:id", checkToken, userController.getUser); // récupère le profil d'un user
router.post("/user/login", userController.loginUser ); // router pour logguer un utilisateur
router.post("/user", userController.addUser); // Ajoute un utilisateur en bdd
router.patch("/user/:id", checkToken, userController.updateUser); // modifier un utilisateur en bdd
router.delete("/user/:id", checkToken, userController.deleteUser); //supprime un utilisateur

/** ROUTES PLANNER */
router.get("/planner/user/:id", checkToken,plannerController.getUserPlanners); // récupère tous les tableaux d'un user
router.get ("/planner/:id", checkToken, plannerController.getPlanner) ;//récupère un tableau via son id avec ses données liées 
router.put("/planner/:id", checkToken, plannerController.updatePlanner); // modifie un tableau
router.post("/planner/user/:id", checkToken, plannerController.createPlanner);// ajoute un tableau
router.delete("/planner/:id", checkToken, plannerController.deletePlanner); // supprime un tableau

/** ROUTES TASK */
router.get("/task/planner/:id", checkToken, taskController.getPlannerTasks); // récupère les tâches d'un user dans un tableau
router.post("/task/planner/:id", checkToken, taskController.addTaskInPlanner); // ajoute un tâche dans un tableau
router.put("/task/:idTask", checkToken, taskController.updateTask); // modifie une tâche dans un tableau
router.delete("/task/:id", checkToken, taskController.deleteTask); // supprime une tâche dans un tableau
router.get("/category/:idCat/planner/:idPlan/task/", checkToken, plannerController.getCategoryTasks); //récupère les tâches d’une catégorie dans un planner

/** ROUTES CATEGORIES */
router.get("/category/", checkToken, categoryController.getAllCategories); // récupère toutes les catégories

router.get("/token", userController.tokenExpire) // vérifie la validité/expiration du token

router.get("/invite/:userId/planner/:plannerId", inviteController.sendInvite);

module.exports = router;
