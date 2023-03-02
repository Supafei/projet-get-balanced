const jwt = require("jsonwebtoken");

const middlewareLogin = {
  // vérifie qu'un client est bien connecté
  // sinon redirige vers la page de connexion
  isLogged(request, response, next) {

    console.log(request.session);
    console.log(request.session.user);

    if (!request.session.user) {
      return response.status("401").json({
        message: 'Not logged'
      });

    }
    response.json(request.session);
    next();

  },


  checkToken(request, response, next) {
    try {
      console.log('envoyé par le front: ', request.headers.authorization.split(" ")[1]);

      // on vérifie qu'il y a le token dans le headers authorization
      const token = request.headers.authorization.split(" ")[1];

      // on décode le token 
      const user = jwt.verify(token, process.env.SECRET_SESSION);
      console.log("token validé !", user);

      next();

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

module.exports = middlewareLogin;