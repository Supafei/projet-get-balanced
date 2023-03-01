const express = require("express");
const categoryController = require ("../controller/categoryController");
const plannerController = require ("../controller/plannerController");
const taskController = require("../controller/taskController");
const userController = require ("../controller/userController");

// middlewares
const {isLogged, checkToken} = require("../middleware/middlewareLogin");



const router = express.Router();


/** ROUTES USER  */
router.get("/user/:id", isLogged, checkToken, userController.getUser); // récupère le profil d'un user
router.post("/user/login", userController.loginUser ); // router pour logguer un utilisateur
router.get("user/logout", isLogged, checkToken, userController.logOut); // route pour déconnecter l'utilisateur
router.post("/user", userController.addUser); // Ajoute un utilisateur en bdd
router.patch("/user/:id", isLogged, userController.updateUser); // modifier un utilisateur en bdd
router.delete("/user/:id", isLogged, userController.deleteUser ); //supprime un utilisateur


/** ROUTES PLANNER */
router.get("/planner/user/:id", isLogged, plannerController.getUserPlanners); // récupère tous les tableaux d'un user
router.get ("/planner/:id", /*isLogged,*/ plannerController.getPlanner) ;//récupère un tableau via son id avec ses données liées 
router.put("/planner/:id", isLogged, plannerController.updatePlanner); // modifie un tableau
router.post("/planner/user/:id", /*isLogged,*/ plannerController.createPlanner);// ajoute un tableau
router.delete("/planner/:id", isLogged, plannerController.deletePlanner); // supprime un tableau

/** ROUTES TASK */
router.get("/task/planner/:id", taskController.getPlannerTasks); // récupère les tâches d'un user dans un tableau
router.post("/task/planner/:id", taskController.addTaskInPlanner); // ajoute un tâche dans un tableau
router.put("/task/:idTask/planner/:idPlanner", taskController.updateTask); // modifie une tâche dans un tableau
router.delete("/task/:id", taskController.deleteTask); // supprime une tâche dans un tableau
router.get("/category/:id/planner/:id/task/", plannerController.getCategoryTasks); //récupère les tâches d’une catégorie dans un planner

/** ROUTES CATEGORIES */
router.get("/category/", categoryController.getAllCategories); // récupère toutes les catégories
// router.post("/category/", categoryController.createCategory); //créer une catégorie
// router.delete("/category/:id", categoryController.deleteCategory); //supprimer une catégorie
// router.put("/category/:id", categoryController.updateCategory); //modifier une catégorie

router.get("/", isLogged);


module.exports = router;
