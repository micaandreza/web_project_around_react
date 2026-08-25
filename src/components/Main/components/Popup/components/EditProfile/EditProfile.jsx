 
 import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

 export default function EditProfile() {
  const {currentUser, handleUpdateUser} = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(event){
    setName(event.target.value);
  }
  function handleDescriptionChange(event){
    setDescription(event.target.value);
  }
  const handleSubmit = (event) => {
     event.preventDefault(); 

    handleUpdateUser({ name, about: description }); 
  };

  return (
     <form className="popup__form" id="edit-profile-form" onSubmit={handleSubmit}>
            <input
              className="popup__input popup__input_type_name"
               id="name-input"
               
              name="name"
              placeholder="Nome"
              type="text"
              minLength="2"
              maxLength="40"
              required
              value={name}
              onChange={handleNameChange}
              
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
              value={description}
              onChange={handleDescriptionChange}
            />
            <span className="popup__error" id="description-input-error"></span>
            <button className="button popup__button" type="submit">Salvar</button>
    </form>
  );
}
