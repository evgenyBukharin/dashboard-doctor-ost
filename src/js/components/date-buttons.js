const startDateInput = document.getElementById("firstDateInputB24");
const endDateInput = document.getElementById("endDateInputB24");

const startDateSpanB24 = document.querySelector(".hero__date-b24 .hero__date-text-start");
const endDateSpanB24 = document.querySelector(".hero__date-b24 .hero__date-text-end");

let startDateFlag = false;
let endDateFlag = false;

if (startDateInput !== null && endDateInput !== null) {
	startDateInput.addEventListener("change", () => {
		startDateSpanB24.innerHTML = startDateInput.value;
		startDateFlag = true;
		if (startDateFlag && endDateFlag) {
			document.querySelector(".stats__button-generate-bitrix").classList.remove("blocked");
		}
	});
	endDateInput.addEventListener("change", () => {
		endDateSpanB24.innerHTML = endDateInput.value;
		endDateFlag = true;
		if (startDateFlag && endDateFlag) {
			document.querySelector(".stats__button-generate-bitrix").classList.remove("blocked");
		}
	});
}
