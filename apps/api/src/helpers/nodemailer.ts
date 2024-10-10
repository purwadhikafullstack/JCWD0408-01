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
    
      link: `${process.env.BASE_URL_FRONTEND}/verification/${token}`,
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

export const sendResetPassEmail = async (
  email: string,
  token: string,
) => {
  try {
    const templatePath = path.join(
      __dirname,
      '../templates',
      'resetpass.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate({
    
      link: `${process.env.BASE_URL_FRONTEND}/resetpassword/${token}`,
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    throw (error)
  }
};

export const sendReverificationEmail = async (
  email: string,
  token: string,
) => {
  try {
    const templatePath = path.join(
      __dirname,
      '../templates',
      'reverification.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate({
    
      link: `${process.env.BASE_URL_FRONTEND}/reverify/${token}`,
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Changing email address',
      html,
    });
  } catch (error) {
    throw (error)
  }
};