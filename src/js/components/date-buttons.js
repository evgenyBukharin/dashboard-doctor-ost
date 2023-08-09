const startDateInput = document.getElementById("firstDateInputB24");
const endDateInput = document.getElementById("endDateInputB24");

const startDateSpanB24 = document.querySelector(".hero__date-b24 .hero__date-text-start");
const endDateSpanB24 = document.querySelector(".hero__date-b24 .hero__date-text-end");

if (startDateInput !== null && endDateInput !== null) {
	startDateInput.addEventListener("change", () => {
		startDateSpanB24.innerHTML = startDateInput.value;
	});
	endDateInput.addEventListener("change", () => {
		endDateSpanB24.innerHTML = endDateInput.value;
	});
}
