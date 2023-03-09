const { insertOne } = require('../datamapper');
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
        let emailToInvite = request.body.email;
        let userHostId = request.params.userId;
        let plannerId = request.params.plannerId;

        let getUserData = await dataMapper.getOneById("\"user\"", "id", userHostId);

        let findGuest = await dataMapper.getByCondition("\"user\"", "email", emailToInvite);

        let getPlanner = await dataMapper.getOneById("planner", "id", plannerId);

        let emailContent;

        // si l'utilisateur existe en bdd
        if (findGuest) {

            emailContent = `${getUserData.firstname} ${getUserData.lastname} vous a invité à rejoindre le planning ${getPlanner.name}`

        }

        emailContent = `${getUserData.firstname} ${getUserData.lastname} vous a invité à rejoindre le planning ${getPlanner.name} sur l'application Get Balanced. Pour vous inscrire, cliquez sur ce lien`;

        let giveAuthorization = await dataMapper.insertOne({user_id: userHostId, planner_id : plannerId},"user_has_planner");

        let sendInvite = await emailInvite.sendMail(emailToInvite, getUserData.firstname, getUserData.lastname, plannerId, emailContent);

        return response.json(sendInvite);
    }

}

module.exports = inviteController;