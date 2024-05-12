const APILogger = require("../helpers/Logger");
const handlePrismaError = require("../helpers/handleError.helper");
const submissionsService = require("../Services/Submissions.service");

class SubmissionController {
  static async getSubmissionById(req, res) {
    try {
      //find the submission by id
      const { submissionId } = req.params;
      const submission = await submissionsService.getSubmissionById(
        submissionId
      );
      if (!submission) {
        res.status(404).send("Submission not found");
        return;
      }

      APILogger.info("Submission retrieved successfully", { submissionId });

      //return the submission with its identityDocument and medicalLicenses
      return res.json(submission);
    } catch (error) {
      APILogger.error("Error in getSubmissionById " + error);
      handlePrismaError(error, res);
    }
  }
  static async getSubmissionByDoc(req, res) {
    try {
      //find the submission by doctorId
      const { doctorId } = req.params;
      console.log(doctorId);
      const submission = await submissionsService.getSubmissionByCriteria(
        "doctorId",
        doctorId
      );
      if (!submission) {
        res.status(404).send("Submission not found");
        return;
      }

      APILogger.info("Submission retrieved successfully", { doctorId });
      //return the submission with its identityDocument and medicalLicenses
      return res.json(submission);
    } catch (error) {
      APILogger.error("Error in getSubmissionByDoc " + error);
      handlePrismaError(error, res);
    }
  }
  static async getSubmissions(req, res) {
    try {
      //find the submissions but don't get the paths of the identityDocument and medicalLicenses
      const submissions = await submissionsService.getAll();
      //return the submissions
      return res.json(submissions);
    } catch (error) {
      APILogger.error("Error retrieving submissions " + error);
      handlePrismaError(error, res);
    }
  }

  static async createSubmission(req, res) {
    try {
      //destructure identityDocument , medicalLicense, doctorId
      const identityDocument = req.files.identityDocument[0].path;
      const medicalLicenses = req.files.medicalLicenses.map(
        (file) => file.path
      );
      const { doctorId } = req.body;
      //add a new submission and set the verificationStatus to null
      const submission = await submissionsService.createSubmission({
        doctorId,
        identityDocument,
        medicalLicenses,
      });
      //return success message
      return res.status(201).json(submission);
    } catch (error) {
      APILogger.error("Error in createSubmission " + error);
      handlePrismaError(error, res);
    }
  }
}
module.exports = SubmissionController;
