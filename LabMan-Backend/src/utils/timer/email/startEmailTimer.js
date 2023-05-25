import { sendEmailsToUsers } from './helpers/sendEmailsToUsers.js';

export function startEmailTimer() {
    // Set the interval for sending emails (e.g., every 24 hours)
    const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Start the timer
    setInterval(() => {
        sendEmailsToUsers();
    }, interval);
}
