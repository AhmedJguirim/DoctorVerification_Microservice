const fs = require("fs").promises;

module.exports = async ({ identityDocument, medicalLicenses }) => {
  // Assuming `identityDocument` and `medicalLicenses` are stored as paths in the database
  const identityDocumentBuffer = await fs
    .readFile(identityDocument)
    .catch((err) => {
      APILogger.error("Failed to read identity document: " + err.message);
      throw new Error("Failed to read identity document");
    });

  // Assuming `medicalLicenses` is an array of paths
  const medicalLicensesBuffers = await Promise.all(
    medicalLicenses.map((path) =>
      fs.readFile(path).catch((err) => {
        APILogger.error(
          "Failed to read medical license document: " + err.message
        );
        throw new Error("Failed to read medical license document");
      })
    )
  );
  return {
    identityDocumentBuffer,
    medicalLicensesBuffers,
  };
};
