import { db } from './firebase';

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

/* =========================
   PROJECTS
========================= */

const PROJECT_COL =
  'projects';

// GET PROJECT BY SLUG

export async function getProjectBySlug(
  slug: string
) {

  const q = query(
    collection(
      db,
      PROJECT_COL
    ),
    where(
      'slug',
      '==',
      slug
    )
  );

  const snap =
    await getDocs(q);

  if (snap.empty)
    return null;

  const d =
    snap.docs[0];

  return {

    id: d.id,

    ...d.data(),

  };

}

// GET PROJECT BY ID

export async function getProjectById(
  id: string
) {

  const snap =
    await getDoc(
      doc(
        db,
        PROJECT_COL,
        id
      )
    );

  if (!snap.exists())
    return null;

  return {

    id: snap.id,

    ...snap.data(),

  };

}

// GET ALL PROJECTS

export async function getAllProjects() {

  const snap =
    await getDocs(
      collection(
        db,
        PROJECT_COL
      )
    );

  return snap.docs.map(
    (d) => ({

      id: d.id,

      ...d.data(),

    })
  );

}

// GET PROJECTS BY CATEGORY

export async function getProjectsByCategory(
  category: string
) {

  const snap =
    await getDocs(
      collection(
        db,
        PROJECT_COL
      )
    );

  return snap.docs
    .map((d) => ({

      id: d.id,

      ...d.data(),

    }))
    .filter(
      (p: any) =>
        p.category
          ?.toLowerCase() ===
        category.toLowerCase()
    );

}

// ADD PROJECT

export async function addProject(
  data: any
) {

  const ref =
    await addDoc(
      collection(
        db,
        PROJECT_COL
      ),
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
    doc(
      db,
      PROJECT_COL,
      id
    ),
    data
  );

}

// DELETE PROJECT

export async function deleteProject(
  id: string
) {

  await deleteDoc(
    doc(
      db,
      PROJECT_COL,
      id
    )
  );

}

/* =========================
   BLOGS
========================= */

const BLOG_COL =
  'blogs';

// GET ALL BLOGS

export async function getAllBlogs() {

  const snap =
    await getDocs(
      collection(
        db,
        BLOG_COL
      )
    );

  return snap.docs.map(
    (d) => ({

      id: d.id,

      ...d.data(),

    })
  );

}

// GET BLOG BY SLUG

export async function getBlogBySlug(
  slug: string
) {

  const q = query(
    collection(
      db,
      BLOG_COL
    ),
    where(
      'slug',
      '==',
      slug
    )
  );

  const snap =
    await getDocs(q);

  if (snap.empty)
    return null;

  const d =
    snap.docs[0];

  return {

    id: d.id,

    ...d.data(),

  };

}

// ADD BLOG

export async function addBlog(
  data: any
) {

  const ref =
    await addDoc(
      collection(
        db,
        BLOG_COL
      ),
      data
    );

  return ref.id;

}

// UPDATE BLOG

export async function updateBlog(
  id: string,
  data: any
) {

  await updateDoc(
    doc(
      db,
      BLOG_COL,
      id
    ),
    data
  );

}

// DELETE BLOG

export async function deleteBlog(
  id: string
) {

  await deleteDoc(
    doc(
      db,
      BLOG_COL,
      id
    )
  );

}