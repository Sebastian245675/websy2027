// Firebase modular setup for Firestore – simple helper for saving cotizaciones
// LAZY LOADING: Firebase se carga solo cuando se necesita la primera vez

let firebasePromise = null;
let firebaseModule = null;

async function loadFirebase() {
  if (firebaseModule) return firebaseModule;
  if (firebasePromise) return firebasePromise;

  firebasePromise = import('./firebaseLazy.js').then(module => {
    firebaseModule = module;
    return module;
  });

  return firebasePromise;
}

// Firebase config (provided by user)
const firebaseConfig = {
  apiKey: "AIzaSyAX0_2aSXzeFGDX732mNBKYTnsIzqvHDI4",
  authDomain: "multinivel-c0bcd.firebaseapp.com",
  projectId: "multinivel-c0bcd",
  storageBucket: "multinivel-c0bcd.firebasestorage.app",
  messagingSenderId: "1046991671729",
  appId: "1:1046991671729:web:dfbbdf1cd534952f96ad90",
  measurementId: "G-38CD7R6LGB"
};

// Lazy-loaded functions
export async function sendCotizacionEmail(payload) {
  const firebase = await loadFirebase();
  return firebase.sendCotizacionEmail(payload);
}

export async function saveCotizacion(data) {
  const firebase = await loadFirebase();
  return firebase.saveCotizacion(data);
}

export async function saveComentario(data) {
  const firebase = await loadFirebase();
  return firebase.saveComentario(data);
}

export async function subscribeComentarios(onChange) {
  const firebase = await loadFirebase();
  return firebase.subscribeComentarios(onChange);
}

export async function subscribeCotizaciones(onChange) {
  const firebase = await loadFirebase();
  return firebase.subscribeCotizaciones(onChange);
}

export async function subscribeNews(onChange) {
  const firebase = await loadFirebase();
  return firebase.subscribeNews(onChange);
}

export async function updateComentario(id, data) {
  const firebase = await loadFirebase();
  return firebase.updateComentario(id, data);
}

export async function deleteComentario(id) {
  const firebase = await loadFirebase();
  return firebase.deleteComentario(id);
}

export async function updateCotizacion(id, data) {
  const firebase = await loadFirebase();
  return firebase.updateCotizacion(id, data);
}

export async function deleteCotizacion(id) {
  const firebase = await loadFirebase();
  return firebase.deleteCotizacion(id);
}

export async function saveNews(data) {
  const firebase = await loadFirebase();
  return firebase.saveNews(data);
}

export async function updateNews(id, data) {
  const firebase = await loadFirebase();
  return firebase.updateNews(id, data);
}

export async function deleteNews(id) {
  const firebase = await loadFirebase();
  return firebase.deleteNews(id);
}

// For compatibility, export sync versions that trigger lazy loading
export function getFirebaseLazy() {
  return loadFirebase();
}
