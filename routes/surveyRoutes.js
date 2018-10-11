const mongoose = require("mongoose");
const _ = require("lodash");
const Path = require("path-parse");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

//get mongodb model surveys
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    //pass data to this properties
    const { title, subject, body, recipients } = req.body;

    //assign values to mongodb model by creating an instance of Survey
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //send info from sendgrid to here
    app.post("/api/surveys/webhooks", (req, res) => {
      const events = _.map(req.body, event => {
        //Extract the path from the URL
        //Take entire URL
        const pathname = new URL(event.url);

        //Extract this route
        const p = new Path("/api/surveys/:surveyId/:choice");

        console.log(p.test(pathname));
      });
    });

    //Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      //save or survey to the DB
      await survey.save();
      //deduct credits from users
      req.user.credits -= 1;
      //save user
      const user = await req.user.save();

      //send back updated user model fo the header
      // inside our model to be updated
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
