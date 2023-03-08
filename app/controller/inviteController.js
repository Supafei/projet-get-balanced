const dataMapper = require('../datamapper');
const emailInvite = require('../service/emailInvite');

/**
 * Represente les méthodes pour récupérer toutes les catégories
 * @param {*} request
 * @param {*} response
 * 
 */

const inviteController = {

    async sendInvite (request,response) {
        let emailToInvite = request.body.email;
        console.log(request)

        // let senderFirstName = request.;
        // let senderLastName = 
        // let sendInvite = await emailInvite.sendMail();

        return response.json
    }

}

module.exports = inviteController;