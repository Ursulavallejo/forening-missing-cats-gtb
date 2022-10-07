import sendgrid from "@sendgrid/mail";

async function sendEmail(req, res) {
  try {
    sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
    await sendgrid.send({
      to: "missing.cats.gtb@gmail.com",
      from: "gethub-eoi@gethub.se", ///email sendgrid
      subject: `ContactForm from Website`,
      html: `<h1>Please contact this person:</h1>
              <p><strong>Namn:</strong> ${req.body.fullName}</p>
              <p><strong>Företag:</strong> ${req.body.company}</p>
              <p><strong>Email:</strong> ${req.body.email}</p>
`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
