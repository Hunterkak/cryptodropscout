import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

const airdropsRef = collection(
  db,
  "airdrops"
);

export async function getAirdrops() {

  try {

    const q = query(
      airdropsRef,
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      })
    );

  } catch (err) {

    console.error(
      "Firestore airdrop fetch error:",
      err
    );

    return [];
  }
}

export async function addAirdrop(
  data: any
) {

  try {

    await addDoc(
      airdropsRef,
      {
        ...data,
        createdAt:
          serverTimestamp(),
      }
    );

  } catch (err) {

    console.error(
      "Add airdrop error:",
      err
    );

    throw err;
  }
}

export async function updateAirdrop(
  id: string,
  data: any
) {

  try {

    const docRef = doc(
      db,
      "airdrops",
      id
    );

    await updateDoc(
      docRef,
      data
    );

  } catch (err) {

    console.error(
      "Update airdrop error:",
      err
    );

    throw err;
  }
}

export async function deleteAirdrop(
  id: string
) {

  try {

    const docRef = doc(
      db,
      "airdrops",
      id
    );

    await deleteDoc(
      docRef
    );

  } catch (err) {

    console.error(
      "Delete airdrop error:",
      err
    );

    throw err;
  }
}