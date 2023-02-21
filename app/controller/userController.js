const dataMapper = require('../datamapper')

const userController = {

    // récupère le profil d'un user
    async getUser (request, response) {

        let userId = request.params.id;
        let getUser = await dataMapper.getOneById("user", userId);
        response.json(getUser);

    },
    // router pour logguer un utilisateur
    /* CODE */

    // Ajoute un utilisateur en bdd
    async addUser () {

    },
    // modifier un utilisateur en bdd
    async updateUser () {

    },
    //supprime un utilisateur
    async deleteUser () {

    }

}

module.exports = userController; 