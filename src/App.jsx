

import { useState,useEffect } from "react";
import api from "./utils/api";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CurrentUserContext from "./contexts/CurrentUserContext";

function App() {
  const[currentUser, setCurrentUser] = useState({});
  const[cards,setCards] = useState([]);
  const[popup, setPopup] = useState(null);
  function handleOpenPopup(popup){
    setPopup(popup);
  }
  function handleClosePopup(){
    setPopup(null);
  }

function handleAddPlaceSubmit(data) {
  api.addCard(data.name, data.link)
    .then((newCard) => {
      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    })
    .catch((error) => console.error(error));
}
  useEffect(() =>{
    api.getUserInfo()
    .then((data) =>{
      setCurrentUser(data);
    })
    .catch((error) =>{
      console.error(error);
    });
  },[]);

  useEffect(() => {
  api.getCardList()
    .then((data) => {
      setCards(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

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


 const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };
 const handleUpdateAvatar = (data) => {
  api
    .setUserAvatar(data)
    .then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    })
    .catch((error) => console.error(error));
};

  return (
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
    <div className="page__content">
      <Header />
      <Main
      popup={popup}
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      <Footer />      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;