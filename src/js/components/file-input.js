const fileInputButton = document.getElementById("fileInputButton");
const fileInput = document.getElementById("fileInput");

if (fileInputButton !== null && fileInput !== null) {
	fileInputButton.addEventListener("click", () => {
		fileInput.click();
	});
	fileInput.addEventListener("change", () => {
		console.log(fileInput.files);
	});
}
