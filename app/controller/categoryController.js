const dataMapper = require('../datamapper');

const categoryController = {
// récupère toutes les catégories
    async getAllCategories (request,response) {
        
        let getCategories = await dataMapper.getAll("category");
        console.log(getCategories);

        return response.json(getCategories);

    },
//récupère les tâches d’une catégorie dans un planner
   

/** Méthodes dans une prochaine version */
// //créer une catégorie
//     async createCategory () {
//         let newCategory
//     },
// //supprimer une catégorie
//     async deleteCategory () {

//     },
// //modifier une catégorie
//     async updateCategory (){

//     }
}

module.exports = categoryController;