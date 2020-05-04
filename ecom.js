const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['wsf54kl3jh9tsaRdmRjhgsDdgiu']
    })
);
app.use(authRouter);


app.listen(3333, () => {
    console.log('Dear Leonid Ilyich is listening');
});