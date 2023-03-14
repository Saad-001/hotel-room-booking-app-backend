import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const toekn = req.cookies.access_token;

  if (!toekn) {
    return next({ status: 401, message: "You are not authenticated!" });
  }

  jwt.verify(toekn, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next({ status: 403, message: "token is not valid!" });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next({ status: 404, message: "you are not authorized!" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next({ status: 404, message: "you are not an admin!" });
    }
  });
};
