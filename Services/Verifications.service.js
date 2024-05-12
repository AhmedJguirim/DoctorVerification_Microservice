const prisma = require("../prisma/prismaClient");

class VerificationsService {
  /**
   * Retrieves all verification statuses.
   *
   * @return {Promise<Object[]>} A Promise that resolves to an array of verification status objects.
   */
  static async getAll() {
    return await prisma.verificationStatus.findMany();
  }

  /**
   * Retrieves the verification status for a given submission ID.
   *
   * @param {string} submissionId - The ID of the submission.
   * @return {Promise<Object>} A Promise that resolves to the verification status object.
   * */
  static async getVerificationStatusBySubmissionId(submissionId) {
    return await prisma.verificationStatus.findFirst({
      where: {
        submission_id: submissionId,
      },
    });
  }

  /**
   * Retrieves the verification status for a given doctor ID.
   *
   * @param {string} doctorId - The ID of the doctor.
   * @return {Promise<Object>} A Promise that resolves to the verification status object
   * */
  static async getVerificationByDoctorId(doctorId) {
    const submission = await prisma.submission.findFirst({
      where: {
        doctorId: doctorId,
      },
    });
    if (!submission) {
      throw new Error("Submission not found");
    }
    return await prisma.verificationStatus.findFirst({
      where: {
        submission_id: submission.id,
      },
    });
  }

  /**
   * Retrieves the verification status for a given submission ID.
   *
   * @param {string} id - The ID of the submission.
   * @return {Promise<Object>} A Promise that resolves
   * */
  static async getVerificationBySubmissionId(id) {
    const submission = await prisma.submission.findUniqueOrThrow({
      where: {
        id,
      },
    });
    if (!submission) {
      throw new Error("Submission not found");
    }
    return await prisma.verificationStatus.findFirst({
      where: {
        submission_id: submission.id,
      },
    });
  }

  /**
   * Retrieves verifications based on the verifier ID.
   *
   * @param {string} verifierId - The ID of the verifier.
   * @return {Promise<Object[]>} A Promise that resolves to an array of verification objects.
   */
  static async getVerificationsByVerifier(verifierId) {
    return await prisma.verificationStatus.findMany({
      where: {
        verified_by_user_id: verifierId,
      },
    });
  }

  /**
   * Retrieves a verification by its ID.
   *
   * @param {string} verificationId - The ID of the verification to retrieve.
   * @return {Promise<Object>} A Promise that resolves to the unique verification object.
   */
  static async getVerificationById(verificationId) {
    return await prisma.verificationStatus.findUniqueOrThrow({
      where: {
        verification_id: verificationId,
      },
    });
  }

  /**
   * Updates the status of a verification.
   *
   * @param {string} verificationId - The ID of the verification.
   * @param {string} newStatus - The new status to update the verification to.
   * @param {string} changedByUserId - The ID of the user who made the status change.
   * @return {Promise<Object>} A Promise that resolves to the updated verification object.
   */
  static async updateVerificationStatus(
    verificationId,
    newStatus,
    changedByUserId
  ) {
    const verification = await prisma.verificationStatus.update({
      where: {
        verification_id: verificationId,
      },
      data: {
        status: newStatus,
        updated_at: new Date(),
        verified_by_user_id: changedByUserId,
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

    return verification;
  }

  /**
   * Creates a new verification for a submission.
   *
   * @param {string} submissionId - The ID of the submission.
   * @param {string} verifierId - The ID of the user who is verifying the submission.
   * @param {string} status - The status of the verification.
   * @return {Promise<Object>} A Promise that resolves to the created verification object.
   */
  static async createVerification(submissionId, verifierId, status) {
    const verification = await prisma.verificationStatus.create({
      data: {
        submission_id: submissionId,
        verified_by_user_id: verifierId,
        status: status,
        updated_at: new Date(),
      },
    });
    return verification;
  }
}
module.exports = VerificationsService;
