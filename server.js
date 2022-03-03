const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const jwt =  require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Socially API!'
    })
})
app.use('/users', require('./users/users.controller'));
app.use('/posts', require('./posts/posts.controller'));
app.use('/media', require('./attachments/attachments.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
