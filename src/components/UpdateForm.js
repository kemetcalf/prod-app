import { useMemo, useState } from "react";
import { useFirestoreContext } from "../context/FirestoreContext";
import Firestore from "../handlers/firestore";
// import Storage from "../handlers/storage";

const { updateDoc } = Firestore;

const UpdateForm = ({ itemTitle }) => {
	const {
		dispatch,
		state: { inputs, items },
	} = useFirestoreContext();

	const handleOnChange = (e) => {
		dispatch({ type: "setInputs", payload: { value: e } });
		console.log(inputs);
	};

	// eslint-disable-next-line no-lone-blocks
	{
		/*FIXME: need to start the update fn over
		-TODO: establish reference to db document using item data in Single view
		-TODO: use firestore docs to write fn to update title using inputs.title
		-TODO: pull db update fn out into firestore.js handler
		-TODO: refactor to import and use in UpdateForm
		-TODO: put it behind an auth check
		-TODO: add 'last edited' timestamp attr
		-TODO: render 'last edited' attr onto card
		-TODO: THEN see about whether to update storage metadata
*/
	}

	const updateOnSubmit = async (e) => {
		e.preventDefault();
	};

	const isDisabled = useMemo(() => {
		return !!Object.values(inputs).some((input) => !input);
	}, [inputs]);

	return (
		<>
			<div className="mb-5 d-flex align-items-center justify-content-center">
				<form
					className="mb-2"
					style={{ textAlign: "left" }}
					onSubmit={updateOnSubmit}
				>
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							name="title"
							placeholder="title"
							aria-describedby="text"
							onChange={handleOnChange}
						/>
					</div>
					<button
						type="submit"
						className="btn btn-success float-end"
						disabled={isDisabled}
					>
						Save and upload
					</button>
				</form>
			</div>
		</>
	);
};

export default UpdateForm;
