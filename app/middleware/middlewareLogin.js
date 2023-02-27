const middlewareLogin = {
    // vérifie qu'un client est bien connecté
    // sinon redirige vers la page de connexion
    isLogged (request, response, next) {
      if (!request.session.user) {
        return response.status("401").json({message : 'Not logged'});
      }
      next();
    }

}

module.exports = middlewareLogin;