const slider = document.querySelector(".slider");

if (slider !== null) {
	slider.addEventListener("click", (e) => {
		e.stopPropagation();
		slider.classList.toggle("switch-active");
	});
}
