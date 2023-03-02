const middlewareSession = {
    userToLocals(request, response, next) {
      // si on est connecté, on ajoute l'objet user à l'objet response.locals
      // afin de pouvoir y accéder dans nos templates ejs
      // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      if (request.session?.user) {
        response.locals.user = request.session.user
      }
      next();
    }
  }
  module.exports = middlewareSession;
  