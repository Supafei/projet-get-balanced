const jwt = require("jsonwebtoken");

const middlewareLogin = {
  // vérifie qu'un client est bien connecté
  // sinon redirige vers la page de connexion
  isLogged(request, response, next) {

    console.log(request.session);

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
      console.log(req.headers.authorization.split(" ")[1]);
      const token = request.headers.authorization.split(" ")[1];
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