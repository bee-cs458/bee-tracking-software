import express from 'express';
import { getCheckoutRecordsByTag, getCheckoutRecordsByUser, getAllCheckedOutRecords, checkInAsset, checkInAssetWithNotes } from '../controllers/CheckInController.js';

const router = express.Router();

router.get('/byasset/:tag', getCheckoutRecordsByTag);
router.get('/:id', getCheckoutRecordsByUser);
router.get('/', getAllCheckedOutRecords);
router.get('/checkin/:id', checkInAsset);
router.get('/checkin/:id/:notes', checkInAssetWithNotes);

export default router;