import { useLocation, useNavigate } from "react-router-dom";
import { useFirestoreContext } from "../context/FirestoreContext";
import Card from "./Card";

const Single = () => {
	const navigate = useNavigate();
	const { state } = useFirestoreContext();
	const { state: routerState } = useLocation();
	// find() returns 1st obj in state.items arr that matches the given property (item) in this case by finding the item.id that matches the routerState.id returned by useLocation
	const item = state.items.find((item) => item.id === routerState.id);
	return (
		<>
			<button className="btn btn-link" onClick={() => navigate(-1)}>
				Back
			</button>
			<div className="d-flex justify-content-center mb-5">
				<Card {...item} />
			</div>
		</>
	);
};
export default Single;
