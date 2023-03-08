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

        let sendInvite = await emailInvite.sendMail
    }

}

module.exports = inviteController;