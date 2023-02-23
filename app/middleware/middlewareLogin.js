const middlewareLogin = {
    // vérifie qu'un client est bien connecté
    // sinon redirige vers la page de connexion
    isLogged(request, response, next) {
      if (!request.session.user) {
        response.redirect('/login')
      }
      next();
    }

}

module.exports = middlewareLogin;