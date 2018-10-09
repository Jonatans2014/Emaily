const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require('../services/Mailer');
const surveyTemplate = require ('../services/emailTemplates/surveyTemplate');

//get mongodb model surveys
const Survey =  mongoose.model('surveys');

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {


      //pass data to this properties
      const {title,subject,body,recipients} = req.body;

      //assign values to mongodb model by creating an instance of Survey
      const survey = new Survey({

          title,
          subject,
          body,
              recipients: recipients.split(',').map(email => ({ email: email.trim() })),
          _user: req.user.id,
          dateSent: Date.now()

      });

      //Great place to send an email!
      const mailer = new Mailer(survey,surveyTemplate(survey));
  });
};
