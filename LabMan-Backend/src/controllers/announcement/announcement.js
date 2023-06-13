let announcement = "Available collecting time: 9:00 - 17:00 on Monday to Thursday.";

export const updateAnnouncement = (req, res) => {
	const newAnnouncement = req.body.announcement; // Assuming the announcement is sent in the request body

	announcement = newAnnouncement; // Update the announcement variable

	res.status(200).json({ message: "Announcement updated successfully" });
};

export const getAnnouncement = (req, res) => {
	// Logic to retrieve the announcement variable or fetch it from a database

	res.status(200).json({ announcement });
};