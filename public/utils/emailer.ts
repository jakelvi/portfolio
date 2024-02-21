import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { NextApiRequest, NextApiResponse } from "next";

const myEmail = "yakirprati@gmail.com";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "halevyworks@gmail.com",
      pass: "flalgbtxyxgvgqbw",
    },
  });
};

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, subject, text } = req.body;
  try {
    if (!email || !subject || !text) {
      throw new Error(
        "Email, subject, and text are required for sending emails."
      );
    }
    const transporter = createTransporter();
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "Your Portfolio",
        link: "https://your-portfolio-url.com/",
      },
    });

    const emailMessageToOwner = {
      body: {
        name: "Portfolio User", // Placeholder name
        intro: "You received a new message from your portfolio website:",
        outro: "Please respond to the user as soon as possible.",
        message: {
          action: {
            instructions: "Here is the message:",
            button: {
              text: "View Message",
            },
          },
        },
      },
    };

    const emailBodyToOwner = mailGenerator.generate(emailMessageToOwner);

    const messageToOwner = {
      from: myEmail,
      to: myEmail,
      subject: `New message: ${subject}`, // Subject of user's email
      html: emailBodyToOwner,
    };

    await transporter.sendMail(messageToOwner); // Send email to owner

    // Email to user
    const emailMessageToUser = {
      body: {
        name: "Visitor",
        intro: "Thank you for contacting us!",
        outro:
          "We have received your message and will get back to you as soon as possible.",
      },
    };

    const emailBodyToUser = mailGenerator.generate(emailMessageToUser);

    const messageToUser = {
      from: myEmail,
      to: email,
      subject: "Message Received",
      html: emailBodyToUser,
    };

    await transporter.sendMail(messageToUser);

    res.status(200).json({ message: "Emails sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while sending emails." });
  }
};

export default sendEmail;
