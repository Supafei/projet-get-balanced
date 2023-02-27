const middlewareSession = {

    isAuthentified (request, response, next) {
        if (request.session.user) {
            // on a la propriété user dans la session, c'est donc qu'un user est connecté
            response.locals.user = request.session.user
        } else {
            // on n'a pas d'user connecté
            response.locals.user = false;
        }

        next();
    }
}

module.exports = middlewareSession;