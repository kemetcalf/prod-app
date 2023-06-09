import { useLocation, useNavigate } from "react-router-dom";
import { useFirestoreContext } from "../context/FirestoreContext";
// import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
// import Firestore from "../handlers/firestore";
import Card from "./Card";
import UpdateForm from "./UpdateForm";
import Firestore from "../handlers/firestore";
import Storage from "../handlers/storage";

const { deleteDoc } = Firestore;
const { deleteFile } = Storage;

function useToggle() {
	const [formState, setFormState] = useState(false);
	const toggle = () => {
		setFormState(!formState);
	};
	return { formState, toggle };
}

const Single = () => {
	const navigate = useNavigate();
	const { state } = useFirestoreContext();
	const { state: routerState } = useLocation();
	const { formState, toggle } = useToggle();

	// find() returns 1st obj in state.items arr that matches the given property (item) in this case by finding the item.id that matches the routerState.id returned by useLocation
	const item = state.items.find((item) => item.id === routerState.id);

	const handleDelete = async (e) => {
		try {
			e.preventDefault();
			await deleteDoc(item);
			await deleteFile(item);
			console.log(item);
		} catch (e) {
			console.error();
		}
	};

	return (
		<>
			<button className="btn btn-link" onClick={() => navigate(-1)}>
				Back
			</button>
			<div className="d-flex justify-content-center mb-5">
				<Card {...item} />
			</div>
			<button type="button" className="btn btn-warning" onClick={toggle}>
				Edit
			</button>
			<button type="button" className="btn btn-danger" onClick={handleDelete}>
				Delete
			</button>
			{formState && <UpdateForm />}
		</>
	);
};
export default Single;
