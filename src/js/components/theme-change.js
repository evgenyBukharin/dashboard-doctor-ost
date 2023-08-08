import { statsRadialDataConversy, statsRadiaDataConversyEmpty } from "./stats-radial-conversy.js";
import { statsRadialData, calcWholeSum } from "./stats-radial-graph.js";
import { heroList1c } from "./hero-radial-1c.js";
import { heroListBitrix } from "./hero-radial-bitrix.js";

const switchBtn = document.querySelector(".switch");
const root = document.querySelector(":root");

const heroTitle = document.querySelector(".hero__title");
const statsCountStatic1c = document.querySelector(".stats__text-static-1c");
const statsCountStaticBitrix = document.querySelector(".stats__text-static-bitrix");
const statsPersentageStatic1c = document.querySelector(".stats__text-persentage-static-1c");
const statsPersentageStaticBitrix = document.querySelector(".stats__text-persentage-static-bitrix");
const contactsLabelBitrix = document.querySelector(".contacts__label-bitrix");
const contactsLabel1c = document.querySelector(".contacts__label-1с");
const contactSliders = document.querySelectorAll(".contacts__container-slider");
const statsButtonsContainers = document.querySelectorAll(".stats__block-buttons");
const heroChart1cContainer = document.querySelector(".hero__container-graph-1c");
const heroChartBitrixContainer = document.querySelector(".hero__container-graph-bitrix");
const statsConversyPersent1c = document.querySelector(".stats__text-persent-1c");
const statsConversyCount1c = document.querySelector(".stats__text-count-1c");
const statsConversyPersentb24 = document.querySelector(".stats__text-persent-b24");
const statsConversyCountb24 = document.querySelector(".stats__text-count-b24");
const statsConversyPersentEmpty = document.querySelector(".stats__text-persent-empty");
const statsConversyCountEpmty = document.querySelector(".stats__text-count-empty");
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

// конверсия лидов 1c
const count1cPersentCoversy = Math.round(
	(statsRadialDataConversy.count1c * 100) / calcWholeSum(Object.values(statsRadialDataConversy))
);
statsConversyCount1c.innerHTML = statsRadialDataConversy.count1c + " пац.";
statsConversyPersent1c.innerHTML = count1cPersentCoversy + "%";

// конверсия лидов b24
statsConversyCountb24.innerHTML = statsRadialDataConversy.bitrix + " пац.";
statsConversyPersentb24.innerHTML = 100 - count1cPersentCoversy + "%";

// общая сумма сделок 1с
const count1cPersent = Math.round((statsRadialData.count1c * 100) / calcWholeSum(Object.values(statsRadialData)));
statsCountStatic1c.innerHTML = statsRadialData.count1c + " руб.";
statsPersentageStatic1c.innerHTML = count1cPersent + "%";

// общая сумма сделок b24
statsCountStaticBitrix.innerHTML = statsRadialData.bitrix + " руб.";
statsPersentageStaticBitrix.innerHTML = 100 - count1cPersent + "%";

// без приема
statsConversyCountEpmty.innerHTML =
	statsRadiaDataConversyEmpty.count + " " + declOfNum(statsRadiaDataConversyEmpty.count, ["лид", "лида", "лидов"]);
statsConversyPersentEmpty.innerHTML = statsRadiaDataConversyEmpty.persent + "%";

function declOfNum(n, text_forms) {
	n = Math.abs(n) % 100;
	var n1 = n % 10;
	if (n > 10 && n < 20) {
		return text_forms[2];
	}
	if (n1 > 1 && n1 < 5) {
		return text_forms[1];
	}
	if (n1 == 1) {
		return text_forms[0];
	}
	return text_forms[2];
}
