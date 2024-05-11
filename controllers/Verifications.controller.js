const prisma = require("../prisma/prismaClient");
const APILogger = require("../helpers/Logger"); // Assuming APILogger is correctly imported
const handlePrismaError = require("../helpers/handleError.helper"); // Assuming this is the error handling function

class VerificationController {
  static async verifyDoctor(req, res) {
    const { doctorId, verifiedByUserId, status } = req.body;
    try {
      const verification = await prisma.verificationStatus.create({
        data: {
          doctor_id: doctorId,
          verified_by_user_id: verifiedByUserId,
          status: status,
          updated_at: new Date(),
        },
      });
      APILogger.info("Doctor verified successfully", {
        doctorId,
        verifiedByUserId,
      });
      res.status(201).json(verification);
    } catch (error) {
      APILogger.error("Error verifying doctor");
      handlePrismaError(error, res);
    }
  }

  static async getVerificationStatus(req, res) {
    const { doctorId } = req.params;
    try {
      const status = await prisma.verificationStatus.findMany({
        where: {
          doctor_id: doctorId,
        },
        orderBy: [{ updated_at: "desc" }],
      });
      APILogger.info("Verification status retrieved", { doctorId });
      res.json(status[0]?.status);
    } catch (error) {
      APILogger.error("Error retrieving verification status");
      handlePrismaError(error, res);
    }
  }

  static async updateVerificationStatus(req, res) {
    const { verificationId, newStatus, changedByUserId } = req.body;
    try {
      const verification = await prisma.verificationStatus.update({
        where: { verification_id: verificationId },
        data: {
          status: newStatus,
          updated_at: new Date(),
        },
      });
      await prisma.auditTrail.create({
        data: {
          verification_id: verificationId,
          previous_status: verification.status,
          new_status: newStatus,
          changed_by_user_id: changedByUserId,
          changed_at: new Date(),
        },
      });
      APILogger.info("Verification status updated", {
        verificationId,
        newStatus,
      });
      res.json(verification);
    } catch (error) {
      APILogger.error("Error updating verification status");
      handlePrismaError(error, res);
    }
  }
}

module.exports = VerificationController;
