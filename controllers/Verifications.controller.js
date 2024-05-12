const APILogger = require("../helpers/Logger"); // Assuming APILogger is correctly imported
const handlePrismaError = require("../helpers/handleError.helper"); // Assuming this is the error handling function
const submissionsService = require("../Services/Submissions.service");
const verificationsService = require("../Services/Verifications.service");

class VerificationController {
  static async verifyDoctor(req, res) {
    const { submissionId, verifiedByUserId, status } = req.body;
    if (status !== "Verified" && status !== "Refused") {
      return res.status(400).json({ error: "Invalid status" });
    }
    try {
      const verification =
        await verificationsService.getVerificationStatusBySubmissionId(
          submissionId
        );
      if (verification) {
        return res.status(400).json({
          error:
            "Doctor already verified, try updating the status using the update endpoint",
        });
      }
      const newVerification = await verificationsService.createVerification(
        submissionId,
        verifiedByUserId,
        status
      );
      APILogger.info("Doctor verified successfully", verification);
      res.status(201).json(newVerification);
    } catch (error) {
      APILogger.error("Error verifying doctor");
      handlePrismaError(error, res);
    }
  }

  static async getVerificationStatus(req, res) {
    const { doctorId } = req.params;
    try {
      const verification = await verificationsService.getVerificationByDoctorId(
        doctorId
      );
      APILogger.info("Verification status retrieved", { doctorId });
      res.json(verification.status);
    } catch (error) {
      APILogger.error("Error retrieving verification status");
      handlePrismaError(error, res);
    }
  }

  static async updateVerificationStatus(req, res) {
    const { verificationId, newStatus, changedByUserId } = req.body;
    try {
      const verification = await verificationsService.updateVerificationStatus(
        verificationId,
        newStatus,
        changedByUserId
      );
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
