const prisma = require("../prisma/prismaClient");
const getFilesBuffers = require("../helpers/submissions/extractSubmissionFilesBuffers.helper");

class SubmissionService {
  static async getAll() {
    return await prisma.submission.findMany({
      select: {
        id: true,
        doctorId: true,
        created_at: true,
        verificationStatus: true, // Assuming you want to include this relational data
        // Any other fields you want included go here
      },
    });
  }
  static async getSubmissionById(submissionId) {
    //find the submission by id
    let submission = await prisma.submission.findUnique({
      where: {
        id: parseInt(submissionId),
      },
    });
    if (!submission) {
      return null;
    }

    // Assuming identityDocument and medicalLicenses are stored as paths in the database and getFilesBuffers
    const { identityDocument, medicalLicenses } = submission;

    //get the  identityDocument and medicalLicenses files as buffers and put them in the submission object
    const { identityDocumentBuffer, medicalLicensesBuffers } =
      await getFilesBuffers({
        identityDocument,
        medicalLicenses,
      });

    //return the submission with its identityDocument and medicalLicenses
    return {
      ...submission,
      identityDocument: identityDocumentBuffer,
      medicalLicenses: medicalLicensesBuffers,
    };
  }

  static async getSubmissionByCriteria(criteria, value) {
    //find the submission by criteria
    console.log(criteria, value);
    let submission = await prisma.submission.findFirst({
      where: {
        [criteria]: value,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (!submission) {
      return null;
    }

    // Assuming identityDocument and medicalLicenses are stored as paths in the database and getFilesBuffers
    const { identityDocument, medicalLicenses } = submission;

    //get the  identityDocument and medicalLicenses files as buffers and put them in the submission object
    const { identityDocumentBuffer, medicalLicensesBuffers } =
      await getFilesBuffers({
        identityDocument,
        medicalLicenses,
      });

    //return the submission with its identityDocument and medicalLicenses
    return {
      ...submission,
      identityDocument: identityDocumentBuffer,
      medicalLicenses: medicalLicensesBuffers,
    };
  }

  static async createSubmission({
    doctorId,
    identityDocument,
    medicalLicenses,
  }) {
    //add a new submission and set the verificationStatus to null
    const submission = await prisma.submission.create({
      data: {
        doctorId,
        identityDocument,
        medicalLicenses,
        created_at: new Date(),
      },
    });
    return submission;
  }
}
module.exports = SubmissionService;
