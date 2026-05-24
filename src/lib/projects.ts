import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

const COL = 'projects';

export async function getProjectBySlug(slug: string) {
  const q = query(
    collection(db, COL),
    where('slug', '==', slug)
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const d = snap.docs[0];

  return {
    id: d.id,
    ...d.data(),
  };
}

export async function getAllProjects() {
  const q = query(
    collection(db, COL),
    orderBy('createdAt', 'desc')
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function addProject(data: any) {
  const ref = await addDoc(
    collection(db, COL),
    data
  );

  return ref.id;
}

export async function updateProject(
  id: string,
  data: any
) {
  await updateDoc(doc(db, COL, id), data);
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, COL, id));
}