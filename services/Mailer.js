const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  //sendgrid expect us to do this way
  constructor({ subject, recipients }, content) {
    super();

    //use this to send the mailer to sendgrid
    this.sgAPI = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email("no-reply@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);

    //Format addresses is used to extract the emailAddresses
    this.recipients = this.formatAddresses(recipients);

    //helper function to add body to email
    this.addContent(this.body);
    this.addClickTracking();

    //take and process list of recipients above
    this.addRecipients();
  }

  formatAddresses(recipients) {
    //need to have another parentheses to have destructuring and arrow function
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  //Helper Function from helper.mail sendGrid.
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    //define variable
    const personalize = new helper.Personalization();

    //iterate trough this recipient
    this.recipients.forEach(recipient => {
      //add to personal object
      personalize.addTo(recipient);
    });
    //
    this.addPersonalization(personalize);
  }

  //send this mailer to all people
  async send() {
    const request = this.sgAPi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    const response = this.sgAPI.API(request);
    return response;
  }
}
//import to other files
module.exports = Mailer;
