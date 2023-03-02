const dataMapper = require('../datamapper');


/**
 * Représente les méthodes pour gérer les tâches 
 * @param {*} request
 * @param {*} response
 * 
 */


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
         let plannerData = request.body; 
          // Je veux identifier l'id du planner à mettre à jour
        let plannerId = request.params.id;

        const bodyKeys = [];
        const bodyValues = [];

        let counter = 1;

        // pour chaque clé (de chaque paire clé-valeur) dans le body
        for (const key in plannerData) {
            // je mets "column = $1" dans un tableau 
            bodyKeys.push(`${key}=$${counter}`);
            counter++;
            // je mets les valeurs qui iront dans "values" dans un tableau
            bodyValues.push(plannerData[key]);
        }

        console.log(bodyValues);

        // je fais une string à partir de mon tableau
        let paramsQuery = bodyKeys.join(",");

        // j'envoie mes arguments à ma fonction
        let updatePlanner = await dataMapper.updateById("planner", paramsQuery, bodyValues, plannerId);

        return response.json(updatePlanner);
    },
    // ajoute un tableau
    async createPlanner(request, response) {
    // Je veux récupérer les données du formulaire
        let { 
            name,
            description      
        } = request.body
    console.log("formulaire de création d'un planner: ", name, description);
    let addPlanner; 
    // on vérifie que le champ name est renseigné 
    if(!name) {
        let errorMessage = "Veuillez renseigner un nom pour votre planning";
        return response.json({
            errorMessage
        });
    }

    addPlanner = await dataMapper.insertOne({
        name,
        description
    }, "planner");

    console.log(addPlanner);
    // je veux incrémenter la table user_has_planner
    let userId = request.params.id;
    let variableCommeJeveux = await dataMapper.insertOne({
        user_id: userId,
        planner_id: addPlanner.id
    },"user_has_planner" );
    
    console.log(variableCommeJeveux);
    response.json(addPlanner);

   

    },
    // supprime un tableau
    async deletePlanner(_, response) {

        let plannerId = request.params.id;
        let deletePlanner = await dataMapper.deleteOne("planner", plannerId);

        console.log(`nombre de ligne supprimée: ${deletePlanner.rowCount}`);
        return response.json(deletePlanner);
    },
    // récupère les tâches d’une catégorie d'un planner
    async getCategoryTasks(request, response) {
     let categoryId = request.params.idCat;
     let plannerId = request.params.idPlan;

     let conditionCategory = `category_id = $1`
     let conditionPlanner = `planner_id = $2`
     let values = [categoryId, plannerId]

     let getTaskByCatOnPlanner = await dataMapper.getBy2Conditions("task", conditionCategory, conditionPlanner, values );

     return response.json(getTaskByCatOnPlanner);

    }

}

module.exports = plannerController;