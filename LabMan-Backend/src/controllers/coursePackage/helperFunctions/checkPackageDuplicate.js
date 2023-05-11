import errorMessages from "../../../utils/constants/errorMessages.js";

export async function checkPackageDuplicate(connection, package_name) {
  const query = "SELECT * FROM course_package WHERE package_name = ?";
  try {
    const [result] = await connection.query(query, [package_name]);
    if (result.length) {
      throw new Error(errorMessages.DUPLICATE_PACKAGE);
    }
    return result[0];
  } catch (error) {
    if (Object.values(errorMessages).includes(error.message)) {
      throw new Error(error.message);
    }
    throw new Error("Failed checking if duplicate enrollment: " + error.message);
  }
}
