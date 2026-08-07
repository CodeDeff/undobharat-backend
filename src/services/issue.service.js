// services/issue.services.js
import { createIssue } from '../repositorys/issue.repository.js';

/**
 * Service to handle the creation of a new issue.
 * @param {Object} issueData
 * @returns {Promise<Object>}
 */
export const createNewIssue = async (issueData) => {
  try {
    
    const createdIssue = await createIssue(issueData);
    return createdIssue;
  } catch (error) {
    throw new Error(`Error creating issue in service: ${error.message}`);
  }
};
