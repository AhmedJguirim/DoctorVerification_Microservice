const prisma = require("../prisma/client");
const APILogger = require("../helpers/Logger");
const handlePrismaError = require("../helpers/handleError.helper"); // Assuming this is the error handling function

class AuditTrailController {
  static async getAuditTrails(req, res) {
    const { verificationId } = req.params;
    try {
      const auditTrails = await prisma.auditTrail.findMany({
        where: {
          verification_id: parseInt(verificationId),
        },
      });
      APILogger.info("Audit trails retrieved successfully", { verificationId });
      res.json(auditTrails);
    } catch (error) {
      APILogger.error("Error retrieving audit trails");
      handlePrismaError(error, res);
    }
  }
}

module.exports = AuditTrailController;
