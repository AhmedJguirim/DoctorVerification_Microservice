module.exports = (error, res) => {
  console.error(error);
  let statusCode = 500; // Default to Internal Server Error
  let message = "The server returned an error";
  if (
    error.code === "P2002" ||
    error.code === "P2013" ||
    error.code === "P2014" ||
    error.code === "P2004"
  ) {
    // Unique constraint violation
    message = "One of the form data has caused an error in the database";
    statusCode = 409; // Conflict
  } else if (error.code === "P2025") {
    // Record not found
    statusCode = 404; // Not Found
    message = "Record not found in the database";
  } else if (
    error.code === "P2014" ||
    error.code === "P2000" ||
    error.code === "P2001" ||
    error.code === "P2003" ||
    error.code === "P2007" ||
    error.code === "P2012" ||
    error.code === "P2020" ||
    error.code === "P2011" ||
    error.name === "PrismaClientValidationError"
  ) {
    // Foreign key constraint violation
    message = "Your request isn't valid";
    statusCode = 400; // Bad Request
  }
  // Add more conditions here based on Prisma error codes

  res.status(statusCode).json({ error: message });
};
