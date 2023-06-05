import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase.config";
import { v4 as uuidv4 } from "uuid";

// Async fn sends file to storage in Cloud Firestore; see reference to storage service in firebase.config
const Storage = {
	uploadFile: (media) => {
		return new Promise(async (resolve) => {
			const newId = uuidv4();
			try {
				const mediaRef = ref(storage, `images/${newId}`);
				// const metadata = {
				// 	customMetadata: {
				// 	  'location': 'Yosemite, CA, USA',
				// 	}
				//   };

				uploadBytes(mediaRef, media.file, {
					customMetadata: { title: media.title },
				}).then((snapshot) => {
					resolve({
						path: snapshot.metadata.fullPath,
						id: snapshot.metadata.name,
					});
				});
			} catch (e) {
				console.error(e);
			}
		});
	},
	downloadFile: (media) => {
		return new Promise(async (resolve) => {
			try {
				const mediaRef = ref(storage, media.path);
				const fileURL = await getDownloadURL(mediaRef);
				resolve(fileURL);
			} catch (e) {
				console.error(e);
			}
		});
	},
};
export default Storage;
