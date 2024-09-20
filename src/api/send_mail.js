const nodemailer = require('nodemailer');
const mail_formats = require('../lib/mail_formats');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
tls:{
  ciphers: 'SSLv3'
}
});


console.log({
  user: process.env.MAIL_EMAIL,
  pass: process.env.MAIL_PASSWORD
});

const MAILING_LIST = ["contact@metaguise.in"];

async function sendMail(user_data) {

    let mail_template="contact";
    let mail_to = MAILING_LIST;
    let selected_type = '';

    console.log({mail_template, mail_to, selected_type, user_data});

    // return true;

    // if (service_type == 'residences for seniors' || service_type == 'residences') {
    //   mail_to.push('sonika@weaddo.com');
    //   mail_to.push('assist@antaraseniorcare.com');
    //   mail_to.push('contactus@antaraseniorcare.com');
    //   mail_to.push('fazal@weaddo.com');
    // }else{
    //   mail_to.push("fazal@weaddo.com","sonika@weaddo.com");
    //   mail_to.push('sonika@weaddo.com');
    //   mail_to.push('assist@antaraseniorcare.com');
    //   mail_to.push("aacsl.customercare@antaraseniorcare.com","assist@antaraseniorcare.com");
    // }

    let success = false;
   
    if (mail_template) {
      const mailOptions = {
        from: process.env.MAIL_EMAIL,
        to: mail_to,
        subject: mail_formats[mail_template].subject,
        html: mail_formats[mail_template].text(user_data)
      };
      
      await transporter.sendMail(mailOptions)
      .then((res) => {
        console.log('mail sent successfully.')
          success = true;
      })
      .catch((err) => {
          console.log("Error in sending mail:", err);
      });
    }
    
        
    return success;
      
}

module.exports = {
    sendMail
}
