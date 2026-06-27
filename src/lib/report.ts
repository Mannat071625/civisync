import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

export async function submitReport(data: any) {
  const docRef = await addDoc(
    collection(db, "reports"),
    {
      ...data,
      status: "Pending",
      createdAt: serverTimestamp(),
    }
  );

  return docRef.id;
}