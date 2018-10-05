const passport = require("passport");

module.exports = app => {
  app.get("/", (req, res) => res.send("Hello !"));

  //Routes Handlers
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    ///After succesfully logged in redirect the user to the landing page
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  //event handler
  //authenticate using passport strategy Google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
