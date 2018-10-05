const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

//const is a middleWare
//
const requireLogin = require('../middlewares/requireLogin');

//set up billing Route
module.exports =  app =>
{
    //this returns a promise to charge var
    //by using async Await
   const charge = app.post('/api/stripe',requireLogin,async (req,res)=>{

        await stripe.charges.create({
            //specifying the ammount to be charged
            amount: 500,
            currency:'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        //wheneve we want to makeuse of passport and the
       //user has already signed in  use the code below.
       req.user.credits += 5;

       //get the response from mongodb
       const user = await req.user.save();
        //get a reference to the current_user Model


       //send back the data to the browser
       res.send(user);


       console.log(charge);
    });
};