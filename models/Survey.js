const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');
///pull out the schema object from mongoose
const { Schema } = mongoose ;

const surveySchema = new Schema({

    title: String,
    body: String,
    subject: String,
    //recipient is an away of strings.
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},

    _user:{type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date


});

mongoose.model('surveys',surveySchema);