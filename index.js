// server.js
const express = require("express");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
  res.send("Hello There !");
});

app.post("/send-email", (req, res) => {
  sgMail.setApiKey(process.env.KEY);
  console.log(req.body);

  const msg = {
    to: "sdharun2211@gmail.com",
    from: "dharun.vercel@gmail.com",
    subject: req.body.name,
    content: [
      {
        type: "text/plain",
        value: `From : ${req.body.name} Email : ${req.body.email} Message : ${req.body.message} Phone : ${req.body.phone}`,
      },
      
      {
        type: "text/html",
        value: `<p><strong>From : </strong> ${req.body.name}</p>
        <p><strong>Email : </strong> ${req.body.email}</p>
        <p><strong>Message : </strong> ${req.body.message}</p>
        <p><strong>Phone : </strong> ${req.body.phone}</p>`,
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send("Email sent successfully");
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).send("An error occurred while sending email");
    });
});
app.listen(3000, () => console.log("Server is running on port 3000"));
