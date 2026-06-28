import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import {
  deleteDoc,
  doc,
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

export async function getReports() {
  const snapshot = await getDocs(collection(db, "reports"));

  console.log("Documents found:", snapshot.size);

  const reports = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(reports);

  return reports;
}
export async function deleteReport(id: string) {
  await deleteDoc(doc(db, "reports", id));
}