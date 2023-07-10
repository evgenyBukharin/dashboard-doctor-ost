const startDateInput = document.getElementById("firstDateInput");
const endDateInput = document.getElementById("endDateInput");

if (startDateInput !== null && endDateInput !== null) {
	startDateInput.addEventListener("change", () => {
		console.log(startDateInput.value);
	});
	endDateInput.addEventListener("change", () => {
		console.log(endDateInput.value);
	});
}
