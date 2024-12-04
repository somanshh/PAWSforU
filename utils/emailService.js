const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendWelcomeEmail(user) {
    try {
      await this.transporter.sendMail({
        from: '"PAWSforU" <noreply@pawsforu.com>',
        to: user.email,
        subject: 'Welcome to PAWSforU!',
        html: `
          <h1>Welcome to PAWSforU, ${user.firstName}!</h1>
          <p>Thank you for registering. Get ready to find your perfect furry friend!</p>
          <p>Best regards,<br/>PAWSforU Team</p>
        `
      });
    } catch (error) {
      console.error('Welcome email send failed:', error);
    }
  }

  async sendAdoptionConfirmation(user, dog) {
    try {
      await this.transporter.sendMail({
        from: '"PAWSforU" <noreply@pawsforu.com>',
        to: user.email,
        subject: 'Adoption Application Received',
        html: `
          <h1>Adoption Application Received</h1>
          <p>Hello ${user.firstName},</p>
          <p>Your adoption application for ${dog.name} has been received.</p>
          <p>We will review your application and contact you soon.</p>
          <p>Best regards,<br/>PAWSforU Team</p>
        `
      });
    } catch (error) {
      console.error('Adoption confirmation email failed:', error);
    }
  }

  async sendAdoptionStatusUpdate(user, dog, status) {
    try {
      await this.transporter.sendMail({
        from: '"PAWSforU" <noreply@pawsforu.com>',
        to: user.email,
        subject: 'Adoption Application Status Update',
        html: `
          <h1>Adoption Application Status Update</h1>
          <p>Hello ${user.firstName},</p>
          <p>Your adoption application for ${dog.name} has been ${status}.</p>
          <p>Please contact us for more details.</p>
          <p>Best regards,<br/>PAWSforU Team</p>
        `
      });
    } catch (error) {
      console.error('Adoption status email failed:', error);
    }
  }
}

module.exports = new EmailService();