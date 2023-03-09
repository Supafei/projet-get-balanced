const dataMapper = require('../datamapper');

/**
 * Représente les méthodes pour gérer les tâches 
 * @param {*} request
 * @param {*} response
 * 
 */


const taskController = {
    // récupère les tâches d'un planner
    async getPlannerTasks(request, response) {
        // on récupère l'id du planner
        let plannerId = request.params.id;

        console.log("PLANNER ID dans get planner tasks",plannerId);

        let tasksInPlanner = await dataMapper.getOneById("task", "planner_id", plannerId);

        return response.json(tasksInPlanner);

    },
    // ajoute un tâche dans un tableau
    async addTaskInPlanner(request, response) {

        // on récupère l'id du planner
        let plannerId = request.params.id;

        // on récupère le corps du formulaire
        let newTask = request.body;
        console.log("newtask", newTask);


        let addTaskInPlanner = await dataMapper.insertOne(
            {
                name: newTask.name,
                description: newTask.description,
                date: newTask.date,
                done: newTask.done,
                border_color: newTask.border_color,
                planner_id: plannerId,
                category_id: newTask.category_id,
                user_id: newTask.user_id
            }, "task");

        console.log('méthode du controlleur:', addTaskInPlanner);

        return response.json(addTaskInPlanner);

    },
    // modifie une tâche dans un tableau
    async updateTask(request, response) {

        let taskData = request.body;
        console.log("Ici est le TaskData", taskData);

        // Je veux identifier l'id de l'user à mettre à jour
        let taskId = request.params.idTask;
        console.log("Ici est le TaskId", taskId);

        const bodyKeys = [];
        const bodyValues = [];

        let counter = 1;

        // pour chaque clé (de chaque paire clé-valeur) dans le body
        for (const key in taskData) {
            // je mets "column = $1" dans un tableau 
            bodyKeys.push(`${key}=$${counter}`);
            counter++;
            // je mets les valeurs qui iront dans "values" dans un tableau
            bodyValues.push(taskData[key]);
        }

        console.log(bodyValues);

        // je fais une string à partir de mon tableau
        let paramsQuery = bodyKeys.join(",");

        // j'envoie mes arguments à ma fonction
        let updateTask = await dataMapper.updateById("task", paramsQuery, bodyValues, taskId);

        return response.json(updateTask);
    },
    // supprime une tâche dans un tableau
    async deleteTask(request, response) {
        let taskId = request.params.id;
        let deleteTask = await dataMapper.deleteOne("task", taskId);

        console.log(`nombre de ligne supprimée: ${deleteTask.rowCount}`);
        console.log(`la tâche d'id ${taskId} a été supprimée`)
        return response.json(deleteTask);
    }
}

module.exports = taskController;