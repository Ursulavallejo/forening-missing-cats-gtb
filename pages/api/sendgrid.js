import sendgrid from "@sendgrid/mail";

async function sendEmail(req, res) {
  try {
    sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
    await sendgrid.send({
      to: "missing.cats.gtb@gmail.com",
      from: "missing.cats.gtb@gmail.com",
      subject: `Contact Form from MissingCats Web`,
      html: `<h1>Contact from WebPage</h1>
              <p><strong>Name:</strong> ${req.body.fullName}</p>
              <p><strong>Phone:</strong> ${req.body.phone}</p>
              <p><strong>Email:</strong> ${req.body.email}</p>
              <p><strong>Message:</strong> ${req.body.message}</p>
`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
