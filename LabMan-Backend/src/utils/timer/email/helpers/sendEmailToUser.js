import nodemailer from "nodemailer";
import { insertEmailLog } from "../../../../controllers/logs/helperFunctions/insertEmailLog.js";
// Function to send an email to a user
export async function sendEmailToUser(user) {
	try {
		// Create a nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "gmail", // Replace with your email service provider (e.g., Gmail, Outlook)
			auth: {
				user: "changkaini91@gmail.com", // Replace with your email address
				pass: "vibxinrfakkpufda", // Replace with your email password
			},
		});

		// Compose the email
		const mailOptions = {
			from: "changkaini91@gmail.com", // Replace with your email address
			to: user.email, // Use the user's email address
			subject: "Return reminder",
			text: "Hello, " + user.student_id + "! This is the reminder email from Labman. Please return the equipment you borrowed:\n======\n"+"Equipment: "+user.type_name+"\n"+"Borrowed amount: "+user.borrow_amount+"\n"+"Returned amount: "+user.returned_amount+"\n"+"Due date: "+user.return_date+"\n"+"======\nIf you return them after due date, your marks would be affected.\nThank you for the colaboration!",
		};

		// Send the email
		await transporter.sendMail(mailOptions);
		insertEmailLog(user,mailOptions);
		// console.log("Email sent to user:", user.email);
	} catch (error) {
		console.error("Error sending email to user:",  error);
	}
}
