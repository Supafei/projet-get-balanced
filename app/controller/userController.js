const dataMapper = require('../datamapper');
const emailValidator = require('email-validator'); // validation des email
const bcrypt = require('bcrypt'); // hash des mots de passe

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

        // on récupère les données du formulaire
        let {
            firstname,
            lastname,
            email,
            password,
            confirmation
        } = request.body;

        let addOneUser;


        // on vérifie que tous les champs obligatoires sont renseignés
        if (!email || !password || !confirmation || !firstname || !lastname) {
            let errorMessage = 'Veuillez remplir tous les champs requis.';
            return response.text(errorMessage);
        }
        // je vérifie qu'il ny' a pas déjà cet email en BDD
        let userWithSameEmail = await dataMapper.getByCondition("\"user\"", )
        if (userWithSameEmail) {
            let errorMessage = 'Cet email est déjà utilisé.';
            return response.text(errorMessage);
        }
        // vérification que le password = la confirmation
        if (password !== confirmation) {
            let errorMessage = 'Le mot de passe et sa confirmation ne correspondent pas.';
            // on envoie un message d'erreur
            return response.text(errorMessage);
        }

        // génération du hash du mot de passe
        const encryptedPassword = await bcrypt.hash(password, 10);

        // on créé l'user en BDD
        addOneUser = await dataMapper.insertOne({
            firstname,
            lastname,
            email,
            password: encryptedPassword
        }, "\"user\"");
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