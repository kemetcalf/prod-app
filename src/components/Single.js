import { useLocation, useNavigate } from "react-router-dom";
import { useFirestoreContext } from "../context/FirestoreContext";
import Firestore from "../handlers/firestore";
import Card from "./Card";
import UpdateForm from "./UpdateForm";

const Single = () => {
	const navigate = useNavigate();
	const { dispatch, state } = useFirestoreContext();
	const { isOpen: isVisible, inputs } = state;
	const { state: routerState } = useLocation();
	// find() returns 1st obj in state.items arr that matches the given property (item) in this case by finding the item.id that matches the routerState.id returned by useLocation
	const item = state.items.find((item) => item.id === routerState.id);

	const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });

	const backNav = () => {
		if (isVisible) {
			toggle(!isVisible);
		}
		navigate(-1);
		return;
	};

	// TODO: handleOnChange to setInputs
	// TODO: new handleOnSubmit to updateDocs
	// const handleOnClick = async (e) => {
	// 	await updateDoc({...state.inputs, title: })
	// }
	return (
		<>
			<button className="btn btn-link" onClick={backNav}>
				Back
			</button>
			<div className="d-flex justify-content-center mb-5">
				<Card {...item} />
			</div>
			<button
				type="button"
				className="btn btn-warning"
				onClick={() => toggle(!isVisible)}
			>
				Edit
			</button>
			<button type="button" className="btn btn-danger" onClick={() => {}}>
				Delete
			</button>
			<UpdateForm inputs={inputs} isVisible={isVisible} />
		</>
	);
};
export default Single;
