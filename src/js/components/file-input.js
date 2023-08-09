import axios from "axios";
const fileInputButton = document.getElementById("fileInputButton");
const fileInput = document.getElementById("fileInput");

if (fileInputButton !== null && fileInput !== null) {
	fileInputButton.addEventListener("click", () => {
		fileInput.click();
	});
	fileInput.addEventListener("change", () => {
		let formData = new FormData();
		formData.append("userUploadedFile", fileInput.files[0]);
		// axios
		// 	.post("", formData, {
		// 		headers: {
		// 			"Content-Type": "multipart/form-data",
		// 		},
		// 	})
		// 	.then(function () {
		// 		console.log("SUCCESS!!");
		// 	})
		// 	.catch(function () {
		// 		console.log("FAILURE!!");
		// 	});
	});
}
