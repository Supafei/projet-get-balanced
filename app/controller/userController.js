const dataMapper = require('../datamapper')

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

        // 1. récupérer les infos du form
        const email = request.body.email;
        const password = request.body.password;

        // 2. on vérifie que cet utilisateur existe dans la db avec cet email 
        const userFound = await dataMapper.getByCondition("\"user\"", email, "email")
        if (!userFound) {
            return response.text("Aucun utilisateur n'existe avec cet email.");
            // on "return", car on ne veut pas continuer l'execution du code
        }
        console.log(userFound);
        // si on arrive ici c'est que l'utilisateur exista dans la db (le return arrête l'execution du code)
        // 3. on vérifie aussi le password
        // const validPwd = await bcrypt.compare(password, userFound.password);
        // // validPwd est true si le password est validé, false sinon
        // if (!validPwd) {
        //     return response.render('login', {
        //         error: "Mot de passe invalide."
        //     });
        // }

        
    },


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