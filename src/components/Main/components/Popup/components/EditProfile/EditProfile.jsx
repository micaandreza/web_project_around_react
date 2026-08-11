 
 export default function EditProfile() {
  return (
     <form classNameName="popup__form" id="edit-profile-form">
            <input
              className="popup__input popup__input_type_name"
               id="name-input"
              name="name"
              placeholder="Nome"
              type="text"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error" id="name-input-error"></span>
            <input
              className="popup__input popup__input_type_description"
              id="about-input"
              name="description"
              placeholder="Sobre mim"
              type="text"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__error" id="description-input-error"></span>
            <button className="button popup__button" type="submit">Salvar</button>
    </form>
  );
}
