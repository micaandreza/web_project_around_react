import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

 export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarInputRef = useRef();

  function handleSubmit(event) {
  event.preventDefault();

  handleUpdateAvatar({
    avatar: avatarInputRef.current.value,
  });
}
  
  return (
     <div>
      <form className="popup__form" 
      id="avatar-form"
      name="avatar-form"
      onSubmit={handleSubmit}>

      <input
        className="popup__input popup__input_type_url"
        id="avatar-input"
        name="avatar"
        placeholder="Link da imagem"
        type="url"
        required
        ref={avatarInputRef}
      />

      <span className="popup__error" id="avatar-input-error"></span>

      <button className="button popup__button" type="submit">
        Salvar
      </button>

     </form>
    </div>
     
  );
}
