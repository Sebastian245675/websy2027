// Sesión del panel (/panel). Va aparte de firebaseLazy.js para que el SDK de Auth no se descargue con los
// formularios públicos. Las cuentas se crean en Firebase Console > Authentication > Usuarios, y
// firestore.rules solo deja leer leads a los correos de la lista de administradores.
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './firebaseLazy';

const auth = getAuth(app);

export const adminSignIn = (email, password) => signInWithEmailAndPassword(auth, email.trim(), password);
export const adminSignOut = () => signOut(auth);
export const onAdminAuth = (callback) => onAuthStateChanged(auth, callback);
