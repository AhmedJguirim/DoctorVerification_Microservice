// // submissionController.test.js
// const SubmissionController = require("../controllers/SubmissionController");
// const submissionsService = require("../Services/Submissions.service");
// const APILogger = require("../helpers/Logger");
// const handlePrismaError = require("../helpers/handleError.helper");

// // Mocking the external modules
// jest.mock("../services/Submission.service");
// jest.mock("../helpers/Logger");
// jest.mock("../helpers/handleError.helper");

// describe("SubmissionController", () => {
//   describe("getSubmissionById", () => {
//     it("should return a submission if found", async () => {
//       // Setup
//       const req = { params: { submissionId: 1 } };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn().mockReturnThis(),
//       };
//       const mockSubmission = {
//         id: 1,
//         doctorId: "doc123",
//         identityDocument: "path/to/doc",
//         medicalLicenses: ["path/to/license"],
//       };
//       submissionsService.getSubmissionById.mockResolvedValue(mockSubmission);

//       // Act
//       await SubmissionController.getSubmissionById(req, res);

//       // Assert
//       expect(res.json).toHaveBeenCalledWith(mockSubmission);
//       expect(APILogger.info).toHaveBeenCalledWith(
//         "Submission retrieved successfully",
//         { submissionId: 1 }
//       );
//     });

//     it("should send a 404 if the submission is not found", async () => {
//       // Setup
//       const req = { params: { submissionId: 1 } };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn().mockReturnThis(),
//       };
//       submissionsService.getSubmissionById.mockResolvedValue(null);

//       // Act
//       await SubmissionController.getSubmissionById(req, res);

//       // Assert
//       expect(res.status).toHaveBeenCalledWith(404);
//       expect(res.send).toHaveBeenCalledWith("Submission not found");
//     });

//     it("should handle errors by logging and error handling", async () => {
//       // Setup
//       const req = { params: { submissionId: 1 } };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn().mockReturnThis(),
//       };
//       const error = new Error("Something went wrong");
//       submissionsService.getSubmissionById.mockRejectedValue(error);

//       // Act
//       await SubmissionController.getSubmissionById(req, res);

//       // Assert
//       expect(APILogger.error).toHaveBeenCalledWith(
//         "Error in getSubmissionById " + error
//       );
//       expect(handlePrismaError).toHaveBeenCalledWith(error, res);
//     });
//   });

//   describe("getSubmissionById", () => {
//     it("should return a submission if found", async () => {
//       // Setup
//       const req = { params: { submissionId: 1 } };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn().mockReturnThis(),
//       };
//       const mockSubmission = {
//         id: 1,
//         doctorId: "doc123",
//         identityDocument: "path/to/doc",
//         medicalLicenses: ["path/to/license"],
//       };
//       submissionsService.getSubmissionById.mockResolvedValue(mockSubmission);

//       // Act
//       await SubmissionController.getSubmissionById(req, res);

//       // Assert
//       expect(res.json).toHaveBeenCalledWith(mockSubmission);
//       expect(APILogger.info).toHaveBeenCalledWith(
//         "Submission retrieved successfully",
//         { submissionId: 1 }
//       );
//     });

//     it("should send a 404 if the submission is not found", async () => {
//       // Setup
//       const req = { params: { submissionId: 1 } };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn().mockReturnThis(),
//       };
//       submissionsService.getSubmissionById.mockResolvedValue(null);

//       // Act
//       await SubmissionController.getSubmissionById(req, res);

//       // Assert
//       expect(res.status).toHaveBeenCalledWith(404);
//       expect(res.send).toHaveBeenCalledWith("Submission not found");
//     });

//     it("should handle errors by logging and error handling", async () => {
//       // Setup
//       const req = { params: { submissionId: 1 } };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn().mockReturnThis(),
//       };
//       const error = new Error("Something went wrong");
//       submissionsService.getSubmissionById.mockRejectedValue(error);

//       // Act
//       await SubmissionController.getSubmissionById(req, res);

//       // Assert
//       expect(APILogger.error).toHaveBeenCalledWith(
//         "Error in getSubmissionById " + error
//       );
//       expect(handlePrismaError).toHaveBeenCalledWith(error, res);
//     });
//   });
//   // Additional tests for other methods can be similarly structured
// });
