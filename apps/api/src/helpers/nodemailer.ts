import nodemailer from 'nodemailer';
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  token: string,
) => {
  try {
    const templatePath = path.join(
      __dirname,
      '../templates',
      'verification.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate({
    
      link: `http://localhost:3000/verification/${token}`,
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome to Bask-it',
      html,
    });
  } catch (error) {
    throw (error)
  }
};

export const reVerificationEmail = async (
  email: string,
  token: string,
) => {
  try {
    const templatePath = path.join(
      __dirname,
      '../templates',
      'verification.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate({
    
      link: `http://localhost:3000/verification/${token}`,
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome to Bask-it',
      html,
    });
  } catch (error) {
    throw (error)
  }
};