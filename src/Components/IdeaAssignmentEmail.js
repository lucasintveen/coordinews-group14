import emailjs from "emailjs-com";

const email = "neumann.lucas8@gmail.com";
export default function sendEmail(name, title, section, deadline) {
  emailjs.send(
    "service_5flydld",
    "template_1fkl0ur",
    {
      to_name: name,
      Title: title,
      Section: section,
      Deadline: deadline,
      email: email,
    },
    "user_0gUfh2qxMOwB9lgArUZI6"
  );
}
