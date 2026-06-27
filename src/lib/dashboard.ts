import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

export async function getReports() {
  const q = query(
    collection(db, "reports"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  console.log("Documents found:", snapshot.size);

  const reports = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(reports);

  return reports;
}