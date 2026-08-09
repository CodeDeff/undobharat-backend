// routes/issue.route.js
import express from 'express';
import { newIssue } from '../controllers/issue.controller.js';

const router = express.Router();

// POST /api/issues/create
router.post("/create", newIssue);

export default router;
