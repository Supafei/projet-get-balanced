const middlewareLogin = {
  // vérifie qu'un client est bien connecté
  // sinon redirige vers la page de connexion
  isLogged(request, response, next) {
    if (!request.session.user) {
      return response.status("401").json({ message: 'Not logged' });
    }

    next();
  },
  // authenticateToken(req, res, next) {
  //   const authHeader = req.headers['authorization']
  //   const token = authHeader && authHeader.split(' ')[1]

  //   if (token == null) return res.sendStatus(401)

  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     if (err) {
  //       return res.sendStatus(401)
  //     }
  //     req.user = user;
  //     next();
  //   });

  // }
}

module.exports = middlewareLogin;