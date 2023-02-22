const dataMapper = require('../datamapper')

const userController = {

    // récupère le profil d'un user
    async getUser(request, response) {

        let userId = request.params.id;
        let getUser = await dataMapper.getOneById("\"user\"", userId);
        return response.json(getUser);

    },
    // router pour logguer un utilisateur
    /* CODE */

    // Ajoute un utilisateur en bdd
    async addUser(request, response) {

        let bodyData = request.body;
        let addOneUser;

        addOneUser = await dataMapper.insertOne(bodyData, "\"user\"");
        response.json(addOneUser);
    },


    // modifier un utilisateur en bdd
    async updateUser() {

    },
    //supprime un utilisateur
    async deleteUser() {

    }

}

module.exports = userController;