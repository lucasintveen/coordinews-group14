import emailjs from "emailjs-com";

export default function sendEmail() {
  emailjs.send(
    "service_5flydld",
    "template_1fkl0ur",
    {
      to_name: "LI",
      Title: "ABCDE",
      Section: "Sport",
      Deadline: "27-01-2021",
      email: "neumann.lucas8@gmail.com",
    },
    "user_0gUfh2qxMOwB9lgArUZI6"
  );
}
