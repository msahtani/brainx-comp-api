import { createTransport } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import env from "dotenv"

env.config()

export default function send(
    _to:       string|string[],
    _message:  string,
    _subject?: string,
){
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    if(_to instanceof Array<string>){
        _to = _to.join(", ")
    }
      
    const mailOptions: Options = {
        from:    process.env.APP_EMAIL,
        to:      _to,
        subject: _subject,
        text:    _message,
    };
      
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error) {
            console.log(error)
            return
        }
    
        console.log('Email sent: ' + info.response);
    });
}