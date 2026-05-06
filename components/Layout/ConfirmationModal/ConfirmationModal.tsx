import css from "./ConfirmationModal.module.css";

type ConfirmationModalProps = {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	isLoading: boolean;
	errorMessage?: string;
};

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, isLoading, errorMessage }: ConfirmationModalProps) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className={css.backdrop} onClick={onCancel}>
			<div
				className={css.modal}
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				<h2 className={css.title}>Підтвердіть вихід</h2>
				<p className={css.text}>Ви дійсно хочете вийти з системи?</p>
				{errorMessage ? <p className={css.error}>{errorMessage}</p> : null}
				<div className={css.actions}>
					<button className={css.cancel} onClick={onCancel} disabled={isLoading}>
						Скасувати
					</button>
					<button className={css.confirm} onClick={onConfirm} disabled={isLoading}>
						{isLoading ? "Вихід..." : "Підтвердити"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
