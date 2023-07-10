const statsButtons = document.querySelectorAll(".stats__button");
const buttonsContainer = document.querySelector(".stats__block-buttons-visible");
const innerButtonsContainer = buttonsContainer.querySelectorAll(".stats__button");
const containerGap = 25;
const buttonHeight = (buttonsContainer.offsetHeight - (innerButtonsContainer.length - 1) * containerGap) / 3;

statsButtons.forEach((button) => {
	button.style.maxHeight = buttonHeight + "px";
});
