const dataMapper = require('../datamapper');
const emailValidator = require('email-validator'); // validation des email
const bcrypt = require('bcrypt'); // hash des mots de passe
const {
    response
} = require('express');

const userController = {

    // récupère le profil d'un user
    async getUser(request, response) {

        let userId = request.params.id;
        let getUser = await dataMapper.getOneById("\"user\"", userId);
        return response.json(getUser);

    },
    // route pour logguer un utilisateur
    async loginUser(request, response) {

        // ici on a accès aux informations rentrées par l'utilisateur dans le formulaire
        // console.log(request.body);

        // Récupérer les infos du form
        let {
            email,
            password,
        } = request.body;

        // On vérifie que cet utilisateur existe dans la db avec cet email 
        let userFound = await dataMapper.getByCondition("\"user\"", "email", email);
        // console.log("avant la condition userFound", userFound);



        if (!userFound) {
            let errorMessage = 'Aucun utilisateur-trice trouvé(e) avec cet email! ';
            return response.status("401").json({
                errorMessage
            });
        }

        console.log('utilisateur trouvé:', userFound);


        //on vérifie le password
        const validPassword = await bcrypt.compare(password, userFound.password);

        if (!validPassword) {
            return response.status("401").json({
                message: 'Incorrect password'
            });
        }

        // si l'email et le hash sont corrects, je connecte l'utilisateur
        // coté serveur, cette connexion se matérialise par la présence d'une propriété user
        // dans la session de ce client...
        request.session.user = userFound;
        // console.log(request.session.user);

        return response.json(userFound);
    },

    logOut(request, response) {

        if (request.session.user) {
            delete request.session.user;
        }
    },


    // Ajoute un utilisateur en bdd
    async addUser(request, response) {

        // on récupère les données du formulaire
        let {
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        } = request.body;

        console.log("body", firstname, lastname, email, password, confirmPassword);
        console.log(request.body);
        let addOneUser;


        // on vérifie que tous les champs obligatoires sont renseignés
        if (!email || !password || !confirmPassword || !firstname || !lastname) {
            let errorMessage = 'Veuillez remplir tous les champs requis.';
            return response.json({
                errorMessage
            });
        }
        // je vérifie qu'il ny' a pas déjà cet email en BDD
        let userWithSameEmail = await dataMapper.getByCondition("\"user\"", "email", email);
        console.log("sql request", userWithSameEmail);
        if (userWithSameEmail) {
            let errorMessage = 'Cet email est déjà utilisé.';
            return response.json({
                errorMessage
            });
        }
        // vérification que le password = la confirmation
        if (password !== confirmPassword) {
            let errorMessage = 'Le mot de passe et sa confirmation ne correspondent pas.';
            // on envoie un message d'erreur
            return response.json({
                errorMessage
            });
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

        console.log("addoneuser", addOneUser);
        response.json(addOneUser);
    },

    // modifier un utilisateur en bdd
    async updateUser(request, response) {
        // j'ai 3 paramètre a définir:
        // 1. Je veux identifier le nom de la colonne à modifier

        let updatedUserData = request.body;

        let clearPassword;
        if (request.body.password) {
            clearPassword = request.body.password;
        }

        const encryptedPassword = await bcrypt.hash(clearPassword, 10);

        request.body.password = encryptedPassword;

        // Je veux identifier l'id de l'user à mettre à jour
        let updateUserId = request.params.id;

        const bodyKeys = [];
        const bodyValues = [];

        let counter = 1;

        // pour chaque clé dans le body
        for (const key in updatedUserData) {
            bodyKeys.push(`${key}=$${counter}`);
            counter++;
            bodyValues.push(updatedUserData[key]);
        }

        console.log(bodyValues);

        let paramsQuery = bodyKeys.join(",");

        let updateUser = await dataMapper.updateById("\"user\"", paramsQuery, bodyValues, updateUserId);

        return response.json(updateUser);
    },

    
    //supprime un utilisateur
    async deleteUser(request, response) {
        let userId = request.params.id;
        let deleteUser = await dataMapper.deleteOne("\"user\"", userId);

        console.log(`nombre de ligne supprimée: ${deleteUser.rowCount}`);
        return response.json(deleteUser);
    }

}



module.exports = userController;