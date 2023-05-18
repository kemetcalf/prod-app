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

	// TODO: wrong approach; handleOnClick should render editing texts fields; then handleOnChange to setInputs; then new handleOnSubmit to updateDocs
	// const handleOnClick = async (e) => {
	// 	await updateDoc({...state.inputs, title: })
	// }
	return (
		<>
			<button className="btn btn-link" onClick={() => navigate(-1)}>
				Back
			</button>
			<div className="d-flex justify-content-center mb-5">
				<Card {...item} />
			</div>
			<UpdateForm inputs={inputs} isVisible={isVisible} />
			<button
				type="button"
				class="btn btn-warning"
				onClick={() => toggle(!isVisible)}
			>
				Edit
			</button>
			<button type="button" class="btn btn-danger" onClick={() => {}}>
				Delete
			</button>
		</>
	);
};
export default Single;
