import { Card } from './components/Card.js';

// Создает кнопку. buttonClass указывается в формате '.buttonClass'
function setButtonListener(container, buttonClass, action) {
  const buttons = Array.from(container.querySelectorAll(buttonClass));
  buttons.forEach((button) => {
    button.addEventListener('click', action);
  });
}

function createCardElement(link, title, template, action) {
  const card = new Card(link, title, template, action);
  return card.getCardElement();
}

export { setButtonListener, createCardElement };
