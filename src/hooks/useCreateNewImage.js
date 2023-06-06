import { useFirestoreContext } from "../context/FirestoreContext";
import { useAuthContext } from "../context/AuthContext";
import Firestore from "../handlers/firestore.js";
import Storage from "../handlers/storage";

const { writeDoc } = Firestore;
const { uploadFile, downloadFile } = Storage;

function useCreateNewImage() {
	const { dispatch, state, read } = useFirestoreContext();
	const { currentUser } = useAuthContext();
	const { inputs } = state;
	async function CreateNewImage() {
		const storageFile = await uploadFile(inputs);
		console.log(storageFile);
		const url = await downloadFile(storageFile);
		const username = currentUser?.displayName.split(" ").join("");

		await writeDoc(
			{
				...inputs,
				id: storageFile.id,
				path: url,
				user: username.toLowerCase(),
			},
			"stocks"
		);
		await read();
		dispatch({ type: "collapse", payload: { bool: false } });
		dispatch({ type: "clearInputs" });
	}
	return CreateNewImage;
}

export default useCreateNewImage;
