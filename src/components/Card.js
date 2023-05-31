import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestoreContext } from "../context/FirestoreContext";

function Card({ path, title, createdAt, user, id }) {
	const { collapseForm } = useFirestoreContext();

	const navigate = useNavigate();

	const handleOnClick = () => {
		collapseForm();
		navigate(`/images/${id}`, { state: { id } });
	};

	const timestamp = useMemo(() => {
		const date = `${new Date(createdAt?.seconds * 1000)}`.split(" ");
		return `${date[1]} ${date[2]} ${date[3]}`;
	}, []);
	// TODO: Above: create 2 index array with 'created' and 'last updated' to render edits on card and remove warning?
	return (
		<div className="mb-5" onClick={handleOnClick}>
			<div className="card" style={{ width: "18rem" }}>
				<div
					style={{
						height: "220px",
						backgroundImage: `url(${path})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
					}}
				></div>
				<h5 className="text-center mt-1">{title}</h5>
				<div className="d-flex justify-content-between p-2">
					<p>{timestamp}</p>
					<p>{`@${user}`}</p>
				</div>
			</div>
		</div>
	);
}
export default Card;
