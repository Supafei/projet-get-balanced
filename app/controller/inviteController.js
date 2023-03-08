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

        let senderFirstName = request.;
        let senderLastName = request.body.lastname;
        let sendInvite = await emailInvite.sendMail();
    }

}

module.exports = inviteController;