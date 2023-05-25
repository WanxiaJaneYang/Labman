export const formatDate = (date) => {
	date = new Date(date);
	const year = date.getFullYear();
	const month = date.getMonth()+1;
	const day = date.getDate();
	return `${year}-${month}-${day}`;
};