import { useLocation, useNavigate } from "react-router-dom";
import { useFirestoreContext } from "../context/FirestoreContext";
import Card from "./Card";

const Single = () => {
	return (
		<>
			<button className="btn btn-link" onClick={() => {}}>
				Back
			</button>
			<div className="d-flex justify-content-center mb-5">
				<Card />
			</div>
		</>
	);
};
export default Single;
