const historyButtons = document.querySelectorAll(".history__container-button");
historyButtons.forEach((button) => {
	button.addEventListener("mouseenter", (e) => {
		toggleActive(e);
	});
	button.addEventListener("mouseleave", (e) => {
		toggleActive(e);
	});
});

function toggleActive(event) {
	const hoveredButton = event.target;
	if (!hoveredButton.classList.contains("history__container-button-active")) {
		let children = hoveredButton.parentNode.querySelectorAll(".history__container-button");
		children.forEach((child) => {
			child.classList.remove("history__container-button-active");
		});
		hoveredButton.classList.add("history__container-button-active");
	}
}
