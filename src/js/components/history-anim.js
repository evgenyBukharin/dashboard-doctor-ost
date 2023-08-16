const historySection = document.querySelector(".history");
const historyButton = document.querySelector(".stats__button-history-show");
if (historySection && historyButton) {
	historyButton.addEventListener("click", () => {
		historySection.classList.add("history-visible");
	});
}

const historyButtonBack = document.querySelector(".history__button-back");
if (historySection && historyButtonBack) {
	historyButtonBack.addEventListener("click", () => {
		historySection.classList.remove("history-visible");
	});
}
