import { getUsersToEmail } from "./getUsersToEmail.js";
import { sendEmailToUser } from "./sendEmailToUser.js";
export async function sendEmailsToUsers() {
  const registeredUsers = await getUsersToEmail();
  // console.log(registeredUsers);
  for (const user of registeredUsers) {
    await sendEmailToUser(user);
  }
}