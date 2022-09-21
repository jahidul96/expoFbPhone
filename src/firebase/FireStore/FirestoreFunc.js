import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	startAfter,
	where,
} from "firebase/firestore";
import {auth, db} from "../firebase";

export const addUserToFB = async (info, id) => {
	await setDoc(doc(db, "Users", id), info);
};
