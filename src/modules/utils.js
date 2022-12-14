import { Card } from './components/Card.js';
import { Api } from './components/Api.js';

// Создает кнопку. buttonClass указывается в формате '.buttonClass'
function setButtonListener(container, buttonClass, action) {
  const buttons = Array.from(container.querySelectorAll(buttonClass));
  buttons.forEach((button) => {
    button.addEventListener('click', action);
  });
}

function createCardElement(
  cardItem,
  cardParam,
  template,
  clickHanler,
  likeButtonHandler
) {
  const card = new Card(
    cardItem.link,
    cardItem.name,
    cardParam,
    template,
    clickHanler,
    likeButtonHandler
  );
  console.log(card);
  return card.getCardElement();
}

function setCardParam(userInfo, cardItem) {
  const isOwner = isCardOwner(
    userInfo.getUserValues().name,
    cardItem.owner.name
  );
  const cardID = cardItem._id;
  const isLiked = isLikedCard(cardItem.likes, userInfo.getUserValues().id);
  const numberOfLikes = cardItem.likes.length;
  return {
    isOwner: isOwner,
    cardID: cardID,
    isLiked: isLiked,
    numberOfLikes: numberOfLikes,
  };
}

function isCardOwner(userName, cardOwner) {
  if (userName === cardOwner) {
    return true;
  }
  return false;
}

function isLikedCard(likesArray, userID) {
  if (likesArray.length !== 0) {
    for (let i = 0; i < likesArray.length; i++) {
      if (likesArray[i]._id === userID) {
        return true;
      }
    }
  }
  return false;
}

export { setButtonListener, createCardElement, setCardParam };
