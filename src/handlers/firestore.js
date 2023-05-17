import {
	doc,
	setDoc,
	serverTimestamp,
	collection,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

const Firestore = {
	writeDoc: (...args) => {
		const [inputs, collection_name] = args;
		return new Promise(async (resolve) => {
			const randomIndex = Math.floor(Math.random() * 1000000000);
			try {
				const docRef = doc(db, "stocks", `${randomIndex}`);
				await setDoc(docRef, {
					id: randomIndex,
					title: inputs.title,
					path: inputs.path,
					createdAt: serverTimestamp(),
					user: inputs.user,
				});
				resolve("new doc successfully inserted");
			} catch (e) {}
		});
	},
	readDocs: (...args) => {
		const [collection_name] = args;
		let docs = [];
		const ref = collection(db, "stocks");
		return new Promise(async (resolve) => {
			try {
				const snapshots = await getDocs(ref);
				snapshots.forEach((doc) => {
					const d = { ...doc.data(), id: doc.id };
					docs.push(d);
				});
				resolve(docs);
			} catch (e) {
				console.log(e);
			}
		});
	},
	updateDoc: (...args) => {
		const [inputs] = args;

		return new Promise(async (resolve) => {
			try {
				const updateRef = doc(db, "stocks", inputs.id);
				await updateDoc(updateRef, {
					title: inputs.title,
				});
			} catch (e) {
				console.log(e);
			}
		});
	},
	deleteDoc: () => {
		return;
	},
};

export default Firestore;
