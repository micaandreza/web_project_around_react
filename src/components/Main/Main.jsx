

import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import Popup from "./components/Popup/Popup.jsx";
import Card from "./components/Card/Card.jsx";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";


export default function Main({popup, 
  onOpenPopup, 
  onClosePopup,
 cards,
 onCardLike,
 onCardDelete,
onAddPlaceSubmit}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const {currentUser} = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Novo cartão",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit}/>,
  };

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Editar Avatar",
    children: <EditAvatar />,
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <img
          className="profile__image"
          src={currentUser.avatar}
          alt="Avatar"
          onClick={() => onOpenPopup(editAvatarPopup)}
        />

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name} </h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />

          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
        >
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <Popup onClose={() => setSelectedCard(null)}>
          <ImagePopup card={selectedCard} />
        </Popup>
      )}
    </main>
  );
}