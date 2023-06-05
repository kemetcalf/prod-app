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
	writeDoc: (inputs, collection_name) => {
		// TODO: why was collection_name even made??
		// const [inputs, collection_name] = args;
		return new Promise(async (resolve) => {
			try {
				const docRef = doc(db, "stocks", inputs.id);
				await setDoc(docRef, {
					id: inputs.id,
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
		// TODO: why was below even made??
		// const [collection_name] = args;
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
	// updateDoc: (...args) => {
	// 	const [inputs] = args;

	// 	return new Promise(async (resolve) => {
	// 		try {
	// 			const updateRef = doc(db, "stocks", inputs.id);
	// 			await updateDoc(updateRef, {
	// 				title: inputs.title,
	// 				// updatedAt: serverTimestamp(),
	// 			});
	// 			resolve("doc successfully updated");
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	});
	// },
	deleteDoc: () => {
		return;
	},
};

export default Firestore;
