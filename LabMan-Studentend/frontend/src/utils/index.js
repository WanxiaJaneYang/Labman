export function getID() {
	const value = `; ${document.cookie}`;
	const parts = value.split("; username=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}
