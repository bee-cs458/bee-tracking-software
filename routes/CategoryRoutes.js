import express from 'express';
import { getAllCategories, createCategory, deleteCategory} from '../controllers/CategoryController.js';

import { restrictTo, requireBody } from '../controllers/SecurityController.js'

const router = express.Router();

router.get("/", getAllCategories);
router.post(
    "/:id",
    restrictTo('operator'),
    requireBody('catName'),
    createCategory
);
router.delete("/:id", restrictTo('operator'), deleteCategory)

export default router;
