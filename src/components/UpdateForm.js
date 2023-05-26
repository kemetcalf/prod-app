import { useMemo, useState } from "react";
import { useFirestoreContext } from "../context/FirestoreContext";
import Firestore from "../handlers/firestore";
import Storage from "../handlers/storage";

const { updateDoc } = Firestore;
const { updateMetadataName, downloadFile } = Storage;

const UpdateForm = ({ itemTitle }) => {
	const {
		dispatch,
		state: { inputs, items },
	} = useFirestoreContext();

	const handleOnChange = (e) => {
		dispatch({ type: "setInputs", payload: { value: e } });
		console.log(inputs);
	};

	const currentItem = items.find((item) => itemTitle === item.name);

	const updateOnSubmit = async (e) => {
		e.preventDefault();
		const updateInfo = {
			mediaToUpdate: currentItem,
			updateContent: inputs.title,
		};
		const newMetaTitle = await updateMetadataName(updateInfo);
		const url = await downloadFile(newMetaTitle);
		console.log(newMetaTitle);
		console.log(url);
		// TODO:just clg the metadata and url for now to check
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
					// 3.4: sets form input as first item in items array, updates items array state
					onSubmit={updateOnSubmit}
				>
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							name="title"
							placeholder="title"
							aria-describedby="text"
							// 3.4: sets form input state - link
							onChange={handleOnChange}
						/>
					</div>
					<button
						type="submit"
						className="btn btn-success float-end"
						// disabled={isDisabled}
					>
						Save and upload
					</button>
				</form>
			</div>
		</>
	);
};

export default UpdateForm;
