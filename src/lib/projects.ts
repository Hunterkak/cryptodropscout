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
} from 'firebase/firestore';

const COL = 'projects';

// GET PROJECT BY SLUG
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

// GET ALL PROJECTS
export async function getAllProjects() {

  const snap = await getDocs(
    collection(db, COL)
  );

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// GET PROJECTS BY CATEGORY
export async function getProjectsByCategory(category: string) {

  const snap = await getDocs(
    collection(db, COL)
  );

  return snap.docs
    .map((d) => ({
      id: d.id,
      ...d.data(),
    }))
    .filter(
      (p: any) =>
        p.category?.toLowerCase() === category.toLowerCase()
    );
}

// ADD PROJECT
export async function addProject(data: any) {

  const ref = await addDoc(
    collection(db, COL),
    data
  );

  return ref.id;
}

// UPDATE PROJECT
export async function updateProject(
  id: string,
  data: any
) {

  await updateDoc(
    doc(db, COL, id),
    data
  );
}

// DELETE PROJECT
export async function deleteProject(id: string) {

  await deleteDoc(
    doc(db, COL, id)
  );
}