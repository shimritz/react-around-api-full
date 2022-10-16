import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({ isOpen, onClose, onSubmit }) => {
  return (
    <PopupWithForm
      title="are you sure?"
      name="delete-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    ></PopupWithForm>
  );
};
export default DeleteCardPopup;
