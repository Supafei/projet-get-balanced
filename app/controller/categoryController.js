const dataMapper = require('../datamapper');

const categoryController = {
// récupère toutes les catégories
    async getAllCategories (_,response) {
        
         let getCategories = await dataMapper.getAll("category");
         console.log(getCategories);

        return response.json(getCategories);

    },
//récupère les tâches d’une catégorie dans un planner
    async getCategoryTasks () {

    },
//créer une catégorie
    async createCategory () {

    },
//supprimer une catégorie
    async deleteCategory () {

    },
//modifier une catégorie
    async updateCategory (){

    }
}

module.exports = categoryController;