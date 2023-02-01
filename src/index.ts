import express from 'express';
import Logging from './library/Logging';
import config from './config/config';
// import dbConnection from './config/dbConnection';
import routes from './routes';
import bodyParser from 'body-parser';
import sequelize from './config/dbConnection';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
    sequelize.authenticate().then(
        () => {
            Logging.info(`Database connected successfully.`);
            startServer();
        }
    ).catch(
        (err) => {
            Logging.error(`Database connection error: ${err}`);
        }
    )
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const startServer = () => {
    app.use('/api/v1', routes);

    app.listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
};
