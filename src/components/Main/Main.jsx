

import { useState,useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import api from "../../utils/api.js";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import Popup from "./components/Popup/Popup.jsx";
import Card from "./components/Card/Card.jsx";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";


export default function Main() {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  
  const currentUser = useContext(CurrentUserContext);

  async function handleCardLike(card) {
    
    const isLiked = card.isLiked;
    
    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
}
async function handleCardDelete(card) {
  await api.deleteCard(card._id)
    .then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    })
    .catch((error) => console.error(error));
}
  useEffect(() => {
    api.getCardList()
    .then((data) => {
      setCards(data);
    })
      .catch((error) => {
        console.error(error);
      });
    },[]);

  const newCardPopup = {
    title: "Novo cartão",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Editar Avatar",
    children: <EditAvatar />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

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
          onClick={() => handleOpenPopup(editAvatarPopup)}
        />

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name} </h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />

          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike = {handleCardLike}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={handleClosePopup}
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