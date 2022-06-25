const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.authorization;
   console.log(authHeader)
  if (authHeader ) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "notice", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("You are not authenticated!");
  }
}

module.exports = verify;

