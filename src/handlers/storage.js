import {
	ref,
	uploadBytes,
	getDownloadURL,
	updateMetadata,
} from "firebase/storage";
import { storage } from "../lib/firebase.config";

// Async fn sends file to storage in Cloud Firestore; see reference to storage service in firebase.config
const Storage = {
	uploadFile: (media) => {
		return new Promise(async (resolve) => {
			try {
				const mediaRef = ref(storage, `images/${media.title}`);
				uploadBytes(mediaRef, media.file).then((snapshot) => {
					resolve({ path: snapshot.metadata.fullPath, name: media.title });
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
	// TODO:1st- define the mediaRef and clg it so you know what you're sending
	// TODO:bug- save and upload btn disabled
	updateMetadataName: ({ mediaToUpdate, updateContent }) => {
		// media.title accesses input.title instead of current read() items.item.title
		// TODO: clg to check that updateOnSubmit is passing the correct object property to access the media
		//TODO: need permission to access storage/update
		return new Promise(async (resolve) => {
			try {
				const mediaRef = ref(storage, `images/${mediaToUpdate}`);
				updateMetadata(mediaRef, { name: updateContent }).then((metadata) => {
					console.log(metadata.name);
					console.log(metadata.fullPath);
				});
			} catch {
				console.error();
			}
		});
	},
};
export default Storage;
