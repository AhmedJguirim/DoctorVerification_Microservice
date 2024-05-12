const express = require("express");
const upload = require("../helpers/submissions/submissionDocsUploader.helper");
const SubmissionController = require("../controllers/Submissions.controller");
const router = express.Router();

// Route to handle file upload for creating a new submission
/**
 * @openapi
 * /api/submissions:
 *   post:
 *     summary: Creates a doctor documents submission.
 *     tags: [Submissions]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: The doctor ID
 *                 example: "123"
 *               identityDocument:
 *                 type: file
 *                 description: The identity document file
 *               medicalLicenses:
 *                 type: array
 *                 description: The medical licenses files
 *                 items:
 *                   type: file
 *                   description: The medical license file
 *     responses:
 *       201:
 *         description: The created submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The submission ID
 *                   example: 1
 *                 doctorId:
 *                   type: string
 *                   description: The doctor ID
 *                   example: "123"
 *                 created_at:
 *                   type: DateTime
 *                   description: The submission creation date
 *                   example: "2022-01-01T00:00:00.000Z"
 *                 identityDocument:
 *                   type: string
 *                   description: The identity document file path
 *                   example: "path/to/identityDocument.pdf"
 *                 medicalLicenses:
 *                   type: array
 *                   description: The medical licenses files paths
 *                   items:
 *                     type: string
 *                     description: The medical license filepath
 *                     example: "path/to/medicalLicense.pdf"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Bad request"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Internal server error"
 *
 *
 */
router.post(
  "/",
  upload.fields([
    { name: "identityDocument", maxCount: 1 },
    { name: "medicalLicenses", maxCount: 10 }, // Adjust maxCount as necessary
  ]),
  SubmissionController.createSubmission
);
// Route to get a single submission by doctor ID
/**
 * @openapi
 * /api/submissions/doc/{doctorId}:
 *   get:
 *     summary: Get a single submission by doctor ID
 *     tags: [NoTryItOut]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor ID
 *     responses:
 *       200:
 *         description: The submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The submission ID
 *                   example: 1
 *                 doctorId:
 *                   type: string
 *                   description: The doctor ID
 *                   example: "123"
 *                 created_at:
 *                   type: DateTime
 *                   description: The submission creation date
 *                   example: "2022-01-01T00:00:00.000Z"
 *                 identityDocument:
 *                   type: array
 *                   description: identity file buffer
 *                   example: [10,150,80,9]
 *                 medicalLicenses:
 *                   type: array
 *                   description: The medical licenses files paths
 *                   items:
 *                     type: array
 *                     description: medical license file buffer
 *                     example: [10,150,80,9]
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Internal server error"
 *
 */
router.get("/doc/:doctorId", SubmissionController.getSubmissionByDoc);

// Route to get a single submission by ID
/**
 * @openapi
 * /api/submissions/doc/{id}:
 *   get:
 *     summary: Get a single submission by doctor ID
 *     tags: [NoTryItOut]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: the submission id
 *     responses:
 *       200:
 *         description: The submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The submission ID
 *                   example: 1
 *                 doctorId:
 *                   type: string
 *                   description: The doctor ID
 *                   example: "123"
 *                 created_at:
 *                   type: DateTime
 *                   description: The submission creation date
 *                   example: "2022-01-01T00:00:00.000Z"
 *                 identityDocument:
 *                   type: array
 *                   description: identity file buffer
 *                   example: [10,150,80,9]
 *                 medicalLicenses:
 *                   type: array
 *                   description: The medical licenses files paths
 *                   items:
 *                     type: array
 *                     description: medical license file buffer
 *                     example: [10,150,80,9]
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Internal server error"
 *
 */
router.get("/id/:submissionId", SubmissionController.getSubmissionById);

// Route to get all submissions
/**
 * @openapi
 * /api/submissions:
 *   get:
 *     summary: Get a single submission by doctor ID
 *     tags: [Submissions]
 *     responses:
 *       200:
 *         description: The submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The submission ID
 *                   example: 1
 *                 doctorId:
 *                   type: string
 *                   description: The doctor ID
 *                   example: "123"
 *                 created_at:
 *                   type: DateTime
 *                   description: The submission creation date
 *                   example: "2022-01-01T00:00:00.000Z"
 *                 identityDocument:
 *                   type: array
 *                   description: identity file buffer
 *                   example: [10,150,80,9]
 *                 medicalLicenses:
 *                   type: array
 *                   description: The medical licenses files paths
 *                   items:
 *                     type: array
 *                     description: medical license file buffer
 *                     example: [10,150,80,9]
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: "Internal server error"
 *
 */
router.get("/", SubmissionController.getSubmissions);
module.exports = router;
