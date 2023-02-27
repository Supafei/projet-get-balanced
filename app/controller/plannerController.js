const dataMapper = require('../datamapper');

const plannerController = {
    // récupère tous les tableaux d'un user
    async getUserPlanners(_, response) {

        let getAllPlanners = await dataMapper.getAll("planner");
        console.log(getAllPlanners);

        return response.json(getAllPlanners);
    },
    //récupère un tableau via son id avec ses données liées 
    async getPlanner(request, response) {

        let plannerId = request.params.id;
        let getPlanner = await dataMapper.getOneById("planner", plannerId);
        return response.json(getPlanner);

    },
    // modifie un tableau
    async updatePlanner(request, response) {

    },
    // ajoute un tableau
    async createPlanner() {

    },
    // supprime un tableau
    async deletePlanner() {

        let plannerId = request.params.id;
        let deletePlanner = await dataMapper.deleteOne("planner", plannerId);

        console.log(`nombre de ligne supprimée: ${deletePlanner.rowCount}`);
        return response.json(deletePlanner);

    },
    async getCategoryTasks() {

    }

}

module.exports = plannerController;