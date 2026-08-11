 
 export default function EditAvatar() {
  return (
     <div>
      <form className="popup__form" id="avatar-form" name="avatar-form">

      <input
        className="popup__input popup__input_type_url"
        id="avatar-input"
        name="avatar"
        placeholder="Link da imagem"
        type="url"
        required
      />

      <span className="popup__error" id="avatar-input-error"></span>

      <button className="button popup__button" type="submit">
        Salvar
      </button>

     </form>
    </div>
     
  );
}
