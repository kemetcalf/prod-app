import { useMemo } from "react";

const Preview = ({ path }) => {
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

const UploadForm = ({ inputs, isVisible, onChange, onSubmit }) => {
	const isDisabled = useMemo(() => {
		return !!Object.values(inputs).some((input) => !input);
	}, [inputs]);
	return (
		// 3.3: conditional rendering prop/fn
		// short circuit version; also works as ternary e.g. <condition> ? <renderthis> : <renderthat>/null
		isVisible && (
			<>
				<p className="display-6 text-center mb-3">Upload Stock Image</p>
				<div className="mb-5 d-flex align-items-center justify-content-center">
					<Preview {...inputs} />
					<form
						className="mb-2"
						style={{ textAlign: "left" }}
						// 3.4: sets form input as first item in items array, updates items array state
						onSubmit={onSubmit}
					>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								name="title"
								placeholder="title"
								aria-describedby="text"
								// 3.4: sets form input state - link
								onChange={onChange}
							/>
						</div>
						<div className="mb-3">
							<input
								type="file"
								className="form-control"
								name="file"
								// 3.4: sets form input state - file
								onChange={onChange}
							/>
						</div>
						<button
							type="submit"
							className="btn btn-success float-end"
							disabled={isDisabled}
						>
							Save changes
						</button>
					</form>
				</div>
			</>
		)
	);
};

export default UploadForm;
