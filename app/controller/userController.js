const dataMapper = require('../datamapper');
const emailValidator = require('email-validator'); // validation des email
const bcrypt = require('bcrypt'); // hash des mots de passe
const jwt = require("jsonwebtoken");
const {
    response
} = require('express');

/**
 * Représente les méthodes pour les routes User
 * @param {*} request
 * @param {*} response
 * 
 */

const userController = {

    // récupère le profil d'un user
    async getUser(request, response) {

        let userId = request.params.id;
        let getUser = await dataMapper.getOneById("\"user\"", "id", userId);
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

        console.log("password du body", password);

        // On vérifie que cet utilisateur existe dans la db avec cet email 
        let user = await dataMapper.getOneByCondition("\"user\"", "email", email);


        // console.log("user.password", user.password);

        // Si on ne trouve pas l'user, on renvoie une erreur
        if (!user) {
            let errorMessage = 'Aucun utilisateur-trice trouvé(e) avec cet email! ';
            return response.status(401).json({
                errorMessage
            });
        }

        console.log('utilisateur trouvé:', user);


        //on vérifie le password
        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword);
        if (!validPassword) {
            return response.status("401").json({
                message: 'Incorrect password'
            });
        }


        // on appelle la méthode qui va vérifier les infos en BDD et rempli les informations de notre user
        // la méthode renvoie true ou false suivant si les informations username/password sont correctes
        let token;
        if (user) {


            // Génération du token
            token = jwt.sign({
                email: user.email
            }, process.env.SECRET_SESSION, {
                expiresIn: 172800
            });

            console.log("TOKEN : ", token);

        }

        // // On crée le refresh token et on le stocke en BDD 
        // const refreshToken = crypto.randomBytes(128).toString('base64');


        // // Mettre le token dans la table user




        // let insertToken = await dataMapper.updateById("\"user\"", "token = $1", refreshToken, user.id);

        // response.json(insertToken);

        // await RefreshToken.create({
        //     userId: user.id,
        //     token: refreshToken,
        //     expiresAt: Date.now() + config.refreshToken.expiresIn
        // });


        // j'omet le password
        // user = ({
        //     id,
        //     firstname,
        //     lastname,
        //     email,
        //     birthdate,
        //     avatar,
        //     color
        // }) => ({
        //     id,
        //     firstname,
        //     lastname,
        //     email,
        //     birthdate,
        //     avatar,
        //     color
        // });

        // console.log(user);
        return response.json({
            user,
            token
        });
    },

    // logOut(request, response) {

    //     if (request.session.user) {
    //         delete
    //             delete request.session.user;
    //     }
    // },
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
        let user;


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
        if (userWithSameEmail[0]) {
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
        user = await dataMapper.insertOne({
            firstname,
            lastname,
            email,
            password: encryptedPassword
        }, "\"user\"");


        let token = jwt.sign({
            email: email,
        }, process.env.SECRET_SESSION, {
            expiresIn: 172800
        });

        console.log("TOKEN : ", token);

        response.json({
            user,
            token
        });

    },
    // modifier un utilisateur en bdd
    async updateUser(request, response) {
        // j'ai 3 paramètre a définir:
        // 1. Je veux identifier le nom de la colonne à modifier

        let updatedUserData = request.body;

        let clearPassword;
        if (request.body.password) {
            clearPassword = request.body.password;


            const encryptedPassword = await bcrypt.hash(clearPassword, 10);

            request.body.password = encryptedPassword;
        }
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

        let user = await dataMapper.updateById("\"user\"", paramsQuery, bodyValues, updateUserId);

        return response.json({
            user
        });
    },
    //supprime un utilisateur
    async deleteUser(request, response) {
        let userId = request.params.id;
        let deleteUser = await dataMapper.deleteOne("\"user\"", userId);

        console.log(`L'utilisateur ${deleteUser.firstname} ${deleteUser.lastname} a été supprimé`);
        return response.json(deleteUser);
    },



    async tokenExpire(request, response) {

        try {
            const token = request.headers.authorization.split(" ")[1];

            // on décode le token 
            const verifyToken = jwt.verify(token, process.env.SECRET_SESSION);
            let user = await dataMapper.getByCondition("\"user\"", "email", verifyToken.email);

            return response.json({
                success: "Token valide",
                user
            });

        } catch (error) {
            console.log("message d'erreur de tokenExpire:", error.message);
            response.status(401).json({
                error: "token expiré"
            });
        }

    }
}

module.exports = userController;