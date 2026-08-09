// repository/issue.repository.js
import Issue from '../models/Issue.model.js';

/**
 * Creates a new issue in the database.
 * @param {Object} issueData
 * @returns {Promise<Object>} The saved issue document.
 */
export const createIssue = async (issueData) => {
  try {
    const newIssue = new Issue(issueData);
    return await newIssue.save();
  } catch (error) {
    throw error;
  }
};
