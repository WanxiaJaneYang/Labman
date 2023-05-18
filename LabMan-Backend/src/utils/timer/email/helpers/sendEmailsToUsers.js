import { getUsersToEmail } from "./getUsersToEmail.js";
import { sendEmailToUser } from "./sendEmailToUser.js";
export async function sendEmailsToUsers() {
    // Implement your email sending logic here
    // Example:
    const [registeredUsers] = await getUsersToEmail(); // Get the list of registered users to send emails to
  console.log(registeredUsers);
    for (const user of registeredUsers) {
      await sendEmailToUser(user); // Call the function to send email to each user
    }
  }