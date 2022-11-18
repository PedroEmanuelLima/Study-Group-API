const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: { 
        user: process.env.USER_EMAIL, 
        pass: process.env.PASSWORD_EMAIL 
    } 
})

module.exports ={
    send(email, senha){
    
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'SUA NOVA SENHA DO STUDY GROUP É:',
            html: `<h1>Sua Nova Senha é</h1><p>${senha}</p>`
        }
    
        try {
            transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            return false;
        }

    }
}
