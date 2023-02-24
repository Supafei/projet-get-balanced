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
    // route pour logguer un utilisateur
    async loginUser(request, response) {

        // ici on a accès aux informations rentrées par l'utilisateur dans le formulaire
        console.log(request.body);

        // Récupérer les infos du form
        let {
            email,
            password,
        } = request.body;

        // On vérifie que cet utilisateur existe dans la db avec cet email 
        let userFound = await dataMapper.getByCondition("\"user\"", "email", email);
        console.log("avant la condition userFound", userFound);



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
        console.log(request.session.user);

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
    async updateUser() {
        // j'ai 3 paramètre a définir:
        // 1. Je veux identifier le nom de la colonne à modifier
        let updatedDataUser = request.body;

        // je récupère les clés et les valeurs séparément
        let valuesBody = Object.values(updatedDataUser);
        let keysBody = Object.keys(updatedDataUser);

        // Je veux identifier l'id de l'user à mettre à jour
        let UpdateUserId = request.params.id;


        let columnsTable = [];
        let valuesTable = [];
        let count = 1;

        for (let value of valuesBody) {
            valuesTable.push(value);
            count ++;
        }

        for (let key of keysBody) {
            columnsTable.push(key);
        }


        let values = valuesTable.join();
        let columns = columnsTable.join();

        let updateUser = await dataMapper.updateById("\"user\"", columns, values, UpdateUserId);

    },
    //supprime un utilisateur
    async deleteUser(id) {

    }

}

module.exports = userController;