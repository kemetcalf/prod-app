import { useMemo } from "react";
import { useFirestoreContext } from "../context/FirestoreContext";
import useCreateNewImage from "../hooks/useCreateNewImage";

const Preview = () => {
	const { state } = useFirestoreContext();
	// destructures current state
	const {
		inputs: { path },
	} = state;

	return (
		path && (
			<div
				className="rounded p-1 m-5"
				style={{
					width: "30%",
					height: "300px",
					backgroundImage: `url(${path}`,
					backgroundSize: "cover",
				}}
			></div>
		)
	);
};

const UploadForm = () => {
	const createNewImage = useCreateNewImage();
	const { dispatch, state } = useFirestoreContext();
	const { isOpen: isVisible, inputs } = state;

	const handleOnChange = (e) => {
		dispatch({ type: "setInputs", payload: { value: e } });
	};

	//TODO: add loading state visual indicator
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		console.log(inputs);
		createNewImage();
	};

	const isDisabled = useMemo(() => {
		return !!Object.values(inputs).some((input) => !input);
	}, [inputs]);

	return (
		isVisible && (
			<>
				<p className="display-6 text-center mb-3">Upload Stock Image</p>
				<div className="mb-5 d-flex align-items-center justify-content-center">
					<Preview />
					<form
						className="mb-2"
						style={{ textAlign: "left" }}
						onSubmit={handleOnSubmit}
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
						<div className="mb-3">
							<input
								type="file"
								className="form-control"
								name="file"
								// 3.4: sets form input state - file
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
		)
	);
};

export default UploadForm;
