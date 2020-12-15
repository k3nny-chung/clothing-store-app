const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, resp) => { 
        resp.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log(`Server running on port ${port}`);
});

const firebaseAdmin = require('firebase-admin');
// const serviceAccount = require('./kc-clothing-store-firebase-adminsdk-smv26-9e267cf5ff.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        type: 'service_account',
        project_id: 'kc-clothing-store',
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID
    })
});

const db = firebaseAdmin.firestore();

app.post('/payment', (req, resp) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeResp) => {
        if (stripeErr) {
            resp.status(500).send({ error: stripeErr });
        }else {
            const { email } = req.body.token;
            const { amount, userID, items } = req.body;
            const { name, address_line1, address_line2, address_city, address_zip, address_country} = req.body.token.card;

            const order = {
                created: new Date(),
                amount: amount/100,
                email,
                userID,
                items,
                billingAddress: {
                    name,
                    addressLine1: address_line1,
                    addressLine2: address_line2,
                    city: address_city,
                    zip: address_zip,
                    country: address_country
                }
            };

            db.collection('orders').add(order)
            .then((docRef) => 
                resp.status(200).send({ 
                    success: stripeResp,
                    order: {
                        id: docRef.id,
                        ...order
                    }
                 })
            ).catch( error => {
                resp.status(500).send({
                    error: 'The transaction was successful but there was an error saving the order data' 
                });
                console.log(error);
            });
        }
    });
});

