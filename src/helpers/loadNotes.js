import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const noteSnap = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];

  noteSnap.forEach((snap) => {
    notes.push({
      id: snap.id,
      ...snap.data(),
    });
  });

  return notes;
};
