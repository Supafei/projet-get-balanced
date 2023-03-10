const {
    insertOne
} = require('../datamapper');
const dataMapper = require('../datamapper');
const emailInvite = require('../service/emailInvite');

/**
 * Represente les méthodes pour récupérer toutes les catégories
 * @param {*} request
 * @param {*} response
 * 
 */

const inviteController = {

    async sendInvite(request, response) {

        console.log(request.body);

        let emailToInvite = request.body.email;
        console.log("email à inviter", emailToInvite);
        let userHostId = request.params.userId;
        console.log("user Id de l'inviteur", userHostId);
        let plannerId = request.params.plannerId;

        // Je récupère les infos de l'utilisateur qui envoie l'invitation
        let getUserData = await dataMapper.getOneById("\"user\"", "id", userHostId);

        // je vérifie si la personne invitée a un compte
        let findGuest = await dataMapper.getOneByCondition("\"user\"", "email", emailToInvite);


        // je récupère les infos du planner
        let getPlanner = await dataMapper.getOneById("planner", "id", plannerId);


        let emailContent;

        console.log(findGuest);
        // si l'utilisateur existe en bdd
        if (findGuest) {


            //j'ajoute l'authorisation dans la table user_has_planner
            let giveAuthorization = await dataMapper.insertOne({
                user_id: findGuest.id,
                planner_id: plannerId
            }, "user_has_planner");

            emailContent = `${getUserData.firstname} ${getUserData.lastname} vous a invité à rejoindre le planning ${getPlanner.name}`


            // si l'utilisateur n'existe pas
        } else if (!findGuest){
            // j'enregistre l'authorisation dans la table invite (pour plus tard quand l'utilisateur sera inscrit)
            let giveAuthorization = await dataMapper.insertOne({
                user_email: emailToInvite,
                planner_id: plannerId
            }, "invite");

            emailContent = `${getUserData.firstname} ${getUserData.lastname} vous a invité à rejoindre le planning ${getPlanner.name} sur l'application Get Balanced. Pour vous inscrire, cliquez sur ce lien`;
        }


        let sendInvite = await emailInvite.sendMail(emailToInvite, getUserData.firstname, getUserData.lastname, plannerId, emailContent);

        return response.json(sendInvite);
    }

}

module.exports = inviteController;