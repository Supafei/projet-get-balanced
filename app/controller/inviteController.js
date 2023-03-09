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
        let userGuestId = request.params.userId;
        let plannerId = request.params.plannerId;

        let getUserData = await dataMapper.getOneById("\"user\"", "id", userGuestId);

        let sendInvite = await emailInvite.sendMail(emailToInvite, getUserData.firstname, getUserData.lastname, plannerId);

        return response.json(sendInvite);
    }

}

module.exports = inviteController;