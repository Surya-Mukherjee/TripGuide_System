import cron from  "node-cron"
import { Booking } from "../models/bookings.model.js"


cron.schedule("0 * * * *", async () => {
    try {
        const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);

        const result = await Booking.updateMany(
            {
                status: "PENDING",
                createdAt: { $lt: cutoff }
            },
            {
                $set: {
                    status: "REJECTED" 
                }
            }
        );

        console.log(
            `${result.modifiedCount} booking(s) automatically cancelled.`
        );
    } catch (error) {
        console.error("Cron Job Error:", error);
    }
});