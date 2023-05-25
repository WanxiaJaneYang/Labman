import { sendEmailsToUsers } from './helpers/sendEmailsToUsers.js';
import { deleteOldEmailLogs } from '../../../controllers/logs/helperFunctions/deleteOldEmailLogs.js';
//UAT environment, send email every 9am
import cron from 'node-cron';
export function startEmailTimer() {
    // Schedule the task to run every day at 9AM
    cron.schedule('0 9 * * *', () => {
        sendEmailsToUsers();
        //delete logs one month ago
        deleteOldEmailLogs();
    });
}

//testing environment, // send email per 30 seconds
// export function startEmailTimer() {
//     // Set the interval for sending emails (e.g., every 24 hours)
//     const interval = 30 * 1000; 
//     // Start the timer
//     setInterval(() => {
//         sendEmailsToUsers();
//        // delete logs one month ago
        // deleteOldEmailLogs();
//     }, interval);
// }
