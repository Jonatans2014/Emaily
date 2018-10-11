const _ = require("lodash");


const path = require("path-parse");

const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

//path
//const Path = require("path-parse");
module.exports = app => {


    //query to find all surveys created by the user.
    app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });
  //send thanks a message to users
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.get("/api/surveys", (req, res) => {});

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
      const p = new path("/api/surveys/:surveyId/:choice");

      //loadash chain statement
      _.chain(req.body)
        //Extract the path from the URL
        //Take entire URL
        //Extract this route
        .map(({ email, url }) => {
          const match = p.test(new URL(url).pathname);
          //if match is found return that match
          if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
          }
        })
        // will return only events objects
        .compact()
        //get rid of duplicates answers from surveys
        .uniqBy("email", "surveyId")
        .each(({ surveyId, email, choice }) => {
          Survey.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email: email, responded: false }
              }
            },
            {
              $inc: { [choice]: 1 },
              $set: { "recipients.$.responded": true },
              lastResponded: new Date()
            }
          ).exec();
        })
        .value();
      res.send({});
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
