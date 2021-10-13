import moment = require("moment");
import { firestore } from "../firebase/fire";

export const getAllBakalariMediaDocumentsForExport = async () =>
  await firestore
    .collection("media")
    .where("bakalariConfiguration", "==", "auto")
    .get();

export const updateBakalariDoc = async (
  ref: FirebaseFirestore.DocumentReference,
  updateData: Record<string, unknown>
) =>
  await ref.update({
    bakalariUpdated: moment().format(),
    ...updateData,
  });
