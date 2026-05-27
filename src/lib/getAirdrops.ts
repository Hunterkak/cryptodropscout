import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export async function getAirdrops() {

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "airdrops"
        )
      );

    return snapshot.docs.map(
      (doc) => ({

        id: doc.id,

        ...doc.data(),

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