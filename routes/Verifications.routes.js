const express = require("express");
const router = express.Router();
const verificationsController = require("../controllers/Verifications.controller");

// POST route to create a new verification
/**
 * @openapi
 * /api/verifications/verify-doctor:
 *   post:
 *     summary: Verify a doctor
 *     tags:
 *       - Verifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               submissionId:
 *                 type: integer
 *                 description: The ID of the submission to be verified
 *               verifiedByUserId:
 *                 type: string
 *                 description: The ID of the user who verified the submission
 *               status:
 *                 type: string
 *                 description: The status of the verification
 *             example:
 *               submissionId: 1
 *               verifiedByUserId: "123"
 *               status: "Verified"
 *     responses:
 *       201:
 *         description: The verification was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the verification
 *                   example: 1
 *                 submissionId:
 *                   type: integer
 *                   description: The ID of the submission
 *                   example: 1
 *                 verifiedByUserId:
 *                   type: string
 *                   description: The ID of the user who verified the submission
 *                   example: "123"
 *                 status:
 *                   type: string
 *                   description: The status of the verification
 *                   example: "Verified"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Not found
 */
router.post("/verify-doctor", verificationsController.verifyDoctor);

// GET route to get verification status by doctor ID
/**
 * @openapi
 * /api/verifications/status/{doctorId}:
 *  get:
 *    summary: Get verification status by doctor ID
 *    tags: [Verifications]
 *    parameters:
 *      - in: path
 *        name: doctorId
 *        schema:
 *          type: string
 *        required: true
 *        description: The doctor ID
 *    responses:
 *      200:
 *        description: The verification status
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The verification status
 *                  example: "Verified"
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: "Not found"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: "Internal server error"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: "Bad request"
 */
router.get("/status/:doctorId", verificationsController.getVerificationStatus);

// POST route to update verification status
/**
 * @openapi
 * /api/verifications/update-status:
 *  post:
 *    summary: Update verification status
 *    tags: [Verifications]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              verificationId:
 *                type: integer
 *                description: The ID of the verification
 *              newStatus:
 *                type: string
 *                description: The new status of the verification
 *              changedByUserId:
 *                type: string
 *                description: The ID of the user who made the status change
 *            example:
 *              verificationId: 1
 *              newStatus: "Verified"
 *              changedByUserId: "123"
 *    responses:
 *      200:
 *        description: The verification status was updated successfully
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: "Bad request"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: "Internal server error"
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: The error message
 *                  example: "Not found"
 */
router.post("/update-status", verificationsController.updateVerificationStatus);
module.exports = router;
