const jwt = require("jsonwebtoken");

const middlewareLogin = {


  checkToken(request, response, next) {
    try {

      console.log(request);

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