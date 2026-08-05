/**
 * Firebase Lazy Module - Contains all Firebase implementations
 * This module is loaded dynamically to reduce initial bundle size
 */

// Firebase imports
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAX0_2aSXzeFGDX732mNBKYTnsIzqvHDI4",
  authDomain: "multinivel-c0bcd.firebaseapp.com",
  projectId: "multinivel-c0bcd",
  storageBucket: "multinivel-c0bcd.firebasestorage.app",
  messagingSenderId: "1046991671729",
  appId: "1:1046991671729:web:dfbbdf1cd534952f96ad90",
  measurementId: "G-38CD7R6LGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

/**
 * Call a callable Cloud Function named 'sendCotizacionEmail'.
 * Expects an object with cotizacion data and returns the function result.
 */
export async function sendCotizacionEmail(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid payload for sendCotizacionEmail');
  const sendFn = httpsCallable(functions, 'sendCotizacionEmail');
  const res = await sendFn(payload);
  return res.data;
}

/**
 * Save a cotizacion document to the 'cotizaciones' collection.
 * @param {Object} data - The form data to store.
 * @returns {Promise<string>} - The new document id on success.
 */
export async function saveCotizacion(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data for saveCotizacion');
  }

  const payload = {
    ...data,
    createdAt: serverTimestamp()
  };

  const colRef = collection(db, 'cotizaciones');
  const docRef = await addDoc(colRef, payload);
  return docRef.id;
}

/**
 * Save a comentario/testimonial to 'comentarios' collection.
 * @param {Object} data
 */
export async function saveComentario(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid data for saveComentario');
  const payload = {
    ...data,
    createdAt: serverTimestamp()
  };
  const colRef = collection(db, 'comentarios');
  const docRef = await addDoc(colRef, payload);
  return docRef.id;
}

/**
 * Subscribe to comentarios collection in real-time. Calls `onChange` with an array of documents.
 * @param {(docs:Array)=>void} onChange
 * @returns {Function} unsubscribe
 */
export function subscribeComentarios(onChange) {
  const colRef = collection(db, 'comentarios');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      onChange(docs);
    },
    (error) => {
      console.error('Error in subscribeComentarios:', error);
      onChange([]); // Return empty array on error
    }
  );
  return unsub;
}

/**
 * Update a comentario document
 * @param {string} id - Document ID
 * @param {Object} data - Updated fields
 */
export async function updateComentario(id, data) {
  if (!id || !data) throw new Error('Invalid data for updateComentario');
  const docRef = doc(db, 'comentarios', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

/**
 * Delete a comentario document
 * @param {string} id - Document ID
 */
export async function deleteComentario(id) {
  if (!id) throw new Error('Invalid ID for deleteComentario');
  const docRef = doc(db, 'comentarios', id);
  await deleteDoc(docRef);
}

/**
 * Subscribe to cotizaciones collection in real-time
 * @param {(docs:Array)=>void} onChange
 * @returns {Function} unsubscribe
 */
export function subscribeCotizaciones(onChange) {
  const colRef = collection(db, 'cotizaciones');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      onChange(docs);
    },
    (error) => {
      console.error('Error in subscribeCotizaciones:', error);
      onChange([]); // Return empty array on error
    }
  );
  return unsub;
}

/**
 * Update a cotizacion document
 * @param {string} id - Document ID
 * @param {Object} data - Updated fields
 */
export async function updateCotizacion(id, data) {
  if (!id || !data) throw new Error('Invalid data for updateCotizacion');
  const docRef = doc(db, 'cotizaciones', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

/**
 * Delete a cotizacion document
 * @param {string} id - Document ID
 */
export async function deleteCotizacion(id) {
  if (!id) throw new Error('Invalid ID for deleteCotizacion');
  const docRef = doc(db, 'cotizaciones', id);
  await deleteDoc(docRef);
}

/**
 * Subscribe to news collection in real-time
 * @param {(docs:Array)=>void} onChange
 * @returns {Function} unsubscribe
 */
export function subscribeNews(onChange) {
  const colRef = collection(db, 'news');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      onChange(docs);
    },
    (error) => {
      console.error('Error in subscribeNews:', error);
      onChange([]); // Return empty array on error
    }
  );
  return unsub;
}

/**
 * Save a news item to the 'news' collection
 * @param {Object} data - The news data to store
 * @returns {Promise<string>} - The new document id on success
 */
export async function saveNews(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data for saveNews');
  }

  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const colRef = collection(db, 'news');
  const docRef = await addDoc(colRef, payload);
  return docRef.id;
}

/**
 * Update a news document
 * @param {string} id - Document ID
 * @param {Object} data - Updated fields
 */
export async function updateNews(id, data) {
  if (!id || !data) throw new Error('Invalid data for updateNews');
  const docRef = doc(db, 'news', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

/**
 * Delete a news document
 * @param {string} id - Document ID
 */
export async function deleteNews(id) {
  if (!id) throw new Error('Invalid ID for deleteNews');
  const docRef = doc(db, 'news', id);
  await deleteDoc(docRef);
}
