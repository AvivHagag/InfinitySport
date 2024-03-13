import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { emailTemplate } from "./emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, message } = req.body;
    const { data, error } = await resend.emails.send({
      from: email,
      to: ["Aviv1049@gmail.com"],
      subject: `Message from ${firstName} ${lastName}`,
      react: emailTemplate({ firstName, lastName, email, message }),
    });

    if (error) {
      return res.status(400).json(error);
    }

    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
