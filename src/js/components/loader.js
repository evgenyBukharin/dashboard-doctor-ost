import { disableScroll } from "../functions/disable-scroll";
import { enableScroll } from "../functions/enable-scroll";
disableScroll();

const loader = document.querySelector(".loader");
const loaderSpinner = document.querySelector(".loader__spinner");
const loaderErrorIcon = document.querySelector(".loader__errorIcon");
const loaderMessageIcon = document.querySelector(".loader__messageIcon");
const loaderTitleMain = document.querySelector(".loader__title-main");
const loaderTitleSub = document.querySelector(".loader__title-sub");
const loaderErrorList = document.querySelector(".loader__list-errors");
const loaderButtonRepeat = document.querySelector(".loader__button-repeat");
const loaderButtonOk = document.querySelector(".loader__button-ok");

function defaulLoaderState() {
	hideElement(loaderErrorIcon);
	hideElement(loaderMessageIcon);
	hideElement(loaderButtonRepeat);
	hideElement(loaderButtonOk);
}

function showErrorState1c() {
	hideElement(loaderSpinner);
	showElement(loaderErrorIcon);
	showElement(loaderButtonOk);
	changeText(loaderTitleMain, "Не удалось обработать ваши данные");
	changeText(loaderTitleSub, "Вы можете повторить попытку повторно загрузив файл");
}

function showErrorStateBitrix() {
	hideElement(loaderSpinner);
	showElement(loaderErrorIcon);
	showElement(loaderButtonOk);
	changeText(loaderTitleMain, "Не удалось обработать ваши данные");
	changeText(loaderTitleSub, `Вы можете повторить попытку повторно выбрав период и нажав кнопку "Сформировать"`);
}

function showLoader() {
	loader.classList.remove("loader-hidden");
	disableScroll();
}
function hideLoader() {
	loader.classList.add("loader-hidden");
	enableScroll();
}
function hideElement(domElement) {
	if (domElement) {
		domElement.style.display = "none";
	}
}
function showElement(domElement) {
	domElement.style.display = "block";
}
function changeText(domElement, text) {
	domElement.innerHTML = text;
}

loaderButtonOk.addEventListener("click", () => {
	hideLoader();
});

defaulLoaderState();

setTimeout(() => {
	showErrorStateBitrix();
}, 5000);
