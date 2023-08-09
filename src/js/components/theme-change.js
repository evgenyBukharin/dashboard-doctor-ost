const switchBtn = document.querySelector(".switch");
const root = document.querySelector(":root");

// были в импортах из своих скриптов
const heroList1c = document.querySelector(".hero__list-1c");
const heroListBitrix = document.querySelector(".hero__list-bitrix");

const heroTitle = document.querySelector(".hero__title");

const contactsLabelBitrix = document.querySelector(".contacts__label-bitrix");
const contactsLabel1c = document.querySelector(".contacts__label-1с");
const contactSliders = document.querySelectorAll(".contacts__container-slider");
const statsButtonsContainers = document.querySelectorAll(".stats__block-buttons");
const heroChart1cContainer = document.querySelector(".hero__container-graph-1c");
const heroChartBitrixContainer = document.querySelector(".hero__container-graph-bitrix");

const heroDate1c = document.querySelector(".hero__date-1c");
const heroDateb24 = document.querySelector(".hero__date-b24");

let currentTheme = "theme1c";
const themes = {
	theme1c: {
		"--orange-color": "#e15335",
		"--blue-color": "#299b9c",
	},
	bitrix: {
		"--orange-color": "#299b9c",
		"--blue-color": "#e15335",
	},
};

switchBtn.addEventListener("change", () => {
	changeTheme();
});

function changeTheme() {
	if (currentTheme == "theme1c") {
		Object.entries(themes.bitrix).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
		changeThemeContent();
		currentTheme = "bitrix";
	} else {
		Object.entries(themes.theme1c).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
		changeThemeContent();
		currentTheme = "theme1c";
	}
}

function changeThemeContent() {
	heroList1c.classList.toggle("hero__list-visible");
	heroChart1cContainer.classList.toggle("hero__container-graph-visible");
	heroListBitrix.classList.toggle("hero__list-visible");
	heroChartBitrixContainer.classList.toggle("hero__container-graph-visible");
	contactSliders.forEach((slider) => {
		slider.classList.toggle("contacts__container-slider-visible");
	});
	statsButtonsContainers.forEach((container) => {
		container.classList.toggle("stats__block-buttons-visible");
	});
	heroDate1c.classList.toggle("hero__date-hidden");
	heroDateb24.classList.toggle("hero__date-hidden");
	changeText();
}

function changeText() {
	if (currentTheme == "theme1c") {
		heroTitle.innerHTML = "Конверсия приемов";
		contactsLabel1c.innerHTML = "Б24";
		contactsLabelBitrix.innerHTML = "1C";
	} else {
		heroTitle.innerHTML = "Конверсия лидов";
		contactsLabelBitrix.innerHTML = "Б24";
		contactsLabel1c.innerHTML = "1C";
	}
}

function calcWholeSum(data) {
	let sum = null;
	data.forEach((value) => {
		sum += value;
	});
	return sum;
}
