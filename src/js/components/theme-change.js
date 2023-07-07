import { graphData1c, graphDataBitrix, graphData1cKeys } from "./bar-graph.js";
import { statsRadialData, calcWholeSum } from "./stats-radial-graph.js";

const switchBtn = document.querySelector(".switch");
const root = document.querySelector(":root");

const chart1c = document.getElementById("statsBarChart-1c");
const chartBitrix = document.getElementById("statsBarChart-bitrix");
const statsTitleFluid = document.querySelector(".stats__title-fluid");
const statsContactsCount = document.querySelector(".stats__text-count");
const statsContactsCountAll = document.querySelector(".stats__text-count-all ");
const statsLabel = document.querySelector(".stats__text-label");
const statsPersentage = document.querySelector(".stats__text-persent");
const statsPersentageAll = document.querySelector(".stats__text-persent-all");
const statsCountStatic1c = document.querySelector(".stats__text-static-1c");
const statsCountStaticBitrix = document.querySelector(".stats__text-static-bitrix");
const statsPersentageStatic1c = document.querySelector(".stats__text-persentage-static-1c");
const statsPersentageStaticBitrix = document.querySelector(".stats__text-persentage-static-bitrix");
const contactsLabelBitrix = document.querySelector(".contacts__label-bitrix");
const contactsLabel1c = document.querySelector(".contacts__label-1с");
const contactSliders = document.querySelectorAll(".contacts__container-slider");

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
	chart1c.classList.toggle("stats__canvas-bar-visible");
	chartBitrix.classList.toggle("stats__canvas-bar-visible");
	contactSliders.forEach((slider) => {
		slider.classList.toggle("contacts__container-slider-visible");
	});
	changeText();
}

function changeText() {
	if (currentTheme == "theme1c") {
		statsTitleFluid.innerHTML = "Б24";
		statsLabel.innerHTML = "Б24";
		statsContactsCount.innerHTML = graphDataBitrix.bitrix + " чел.";
		statsPersentage.innerHTML = Math.round((graphDataBitrix.bitrix * 100) / graphDataBitrix.all) + "%";
		contactsLabel1c.innerHTML = "Б24";
		contactsLabelBitrix.innerHTML = "1C";
	} else {
		statsTitleFluid.innerHTML = "1C";
		statsLabel.innerHTML = "1C";
		statsContactsCount.innerHTML = graphData1c[graphData1cKeys[0]] + " чел.";
		statsPersentage.innerHTML = Math.round((graphData1c[graphData1cKeys[0]] * 100) / graphData1c.all) + "%";
		contactsLabelBitrix.innerHTML = "Б24";
		contactsLabel1c.innerHTML = "1C";
	}
}

statsTitleFluid.innerHTML = "1C";
statsLabel.innerHTML = "1C";
statsContactsCount.innerHTML = graphData1c[graphData1cKeys[0]] + " чел.";
statsPersentage.innerHTML = Math.round((graphData1c[graphData1cKeys[0]] * 100) / graphData1c.all) + "%";
statsPersentageAll.innerHTML = "100%";
statsContactsCountAll.innerHTML = graphData1c.all + " чел.";
statsCountStatic1c.innerHTML = statsRadialData.count1c + " руб.";
statsCountStaticBitrix.innerHTML = statsRadialData.bitrix + " руб.";

const count1cPersent = Math.round((statsRadialData.count1c * 100) / calcWholeSum(Object.values(statsRadialData)));
statsPersentageStatic1c.innerHTML = count1cPersent + "%";
statsPersentageStaticBitrix.innerHTML = 100 - count1cPersent + "%";
