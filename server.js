const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./custom_middleware/error-handler');

const app = express();

//Load env vars
dotenv.config({ path: './config/config.env'});

//Dev logging middleware
if (process.env.Node_ENV === 'development') {
   // app.use(morgan('dev'));
}

//UI route to authenticate to spotify
// app.use('/authenticate', express.static(__dirname + '/public'))
// .use(cors())
// .use(cookieParser());
app.use(cors()).use(cookieParser());

//Route files
const authorizationSpotifyRoutes = require('./routes/authorization-spotify');
const userSpotifyRoutes = require('./routes/user-spotify');

//Body Parser
app.use(express.json());

//Mount routers
app.use('/authenticate', authorizationSpotifyRoutes);
app.use('/user', userSpotifyRoutes);

//Error Handlder
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,
    console.log('testing backend')
);