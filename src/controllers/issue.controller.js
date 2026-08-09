// controllers/issue.controller.js
import { createNewIssue } from '../services/issue.service.js';


export const newIssue = async (req, res) => {
  try {
    const issueData = req.body;

    // Call the service layer, passing the request body
    const savedIssue = await createNewIssue(issueData);

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: savedIssue
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create issue",
      error: error.message
    });
  }
};
