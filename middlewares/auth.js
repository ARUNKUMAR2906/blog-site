import { validateToken } from "../utils/auth.js";

export const checkForToken = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) return next();
  try {
    const userPayload = validateToken(token);
    req.user = userPayload;
    next();
  } catch (error) {
    next();
  }
};

export const grantAccessTo = (role) => {
  return function (req, res, next) {
    const token = req.cookies["token"];
    if (!token) return res.redirect("/");
    try {
      const userPayload = validateToken(token);
      if (userPayload.role == role) {
        req.user = userPayload;
        next();
      } else {
        res.redirect("/");
      }
    } catch (error) {
      res.redirect("/");
    }
  };
};

export const ensureAuthenticated = (req, res, next) => {
  if (!req.user) return res.redirect("/Login");
  return next();
};
