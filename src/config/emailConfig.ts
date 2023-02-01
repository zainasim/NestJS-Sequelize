import nodemailer from 'nodemailer';
import config from './config';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.user.GMAIL_USER,
        pass: config.user.GMAIL_PASSWORD
    }
});

export default transporter;
