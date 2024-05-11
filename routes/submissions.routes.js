const express = require("express");
const upload = require("../helpers/submissions/submissionDocsUploader.helper");
const SubmissionController = require("../controllers/Submissions.controller");
const router = express.Router();

// Route to handle file upload for creating a new submission

router.post(
  "/",
  upload.fields([
    { name: "identityDocument", maxCount: 1 },
    { name: "medicalLicenses", maxCount: 10 }, // Adjust maxCount as necessary
  ]),
  SubmissionController.createSubmission
);
// Route to get a single submission by doctor ID
router.get("/doc/:doctorId", SubmissionController.getSubmissionByDoc);
// Route to get a single submission by ID
router.get("/id/:submissionId", SubmissionController.getSubmissionById);

// Route to get all submissions
router.get("/", SubmissionController.getSubmissions);
module.exports = router;
