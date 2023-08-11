import axios from "axios";
import { drawSlider1c } from "./contacts-slider-1c";
import { drawHeroRadial1c } from "./hero-radial-1c";

import { drawSliderBitrix } from "./contacts-slider-bitrix";
import { drawHeroRadialBitrix } from "./hero-radial-bitrix";

import { drawStatsRadial } from "./stats-radial-graph";
import { drawStatsRadialConversy } from "./stats-radial-conversy";

// loader
import { showLoader, hideLoader, showErrorState1c, showErrorStateBitrix } from "./loader";

// Отсюда брать значение дат на странице битрикса
const startDateInput = document.getElementById("firstDateInputB24");
const endDateInput = document.getElementById("endDateInputB24");

// обработанные не отправленные данные 1с
let dataEx = "";

// даты 1с
const startDate1c = document.querySelector(".hero__date-1c .hero__date-text-start");
const endDate1c = document.querySelector(".hero__date-1c .hero__date-text-end");

// oneDealB24Price
let oneDealB24Price = "";

// данные для makeContent1c
let data1c = [];
let heroData1c = [];
let heroRadialChart1c = undefined;
let contactsSlider1cMain = undefined;
let contactsSlider1cThumbs = undefined;
const heroList1c = document.querySelector(".hero__list-1c");
function makeContent1c(data1c, heroData1c, oneLeadPrice) {
	if (heroRadialChart1c !== undefined) {
		heroRadialChart1c.destroy();
	}
	if (heroList1c.innerHTML !== "") {
		heroList1c.innerHTML = "";
	}
	heroRadialChart1c = drawHeroRadial1c(heroData1c, oneLeadPrice);

	redrawSlider1c(data1c);
}

// данные для makeContentBitrix
let bitrixData = [];
let heroDataBitrix = [];
let heroRadialChartBitrix = undefined;
let contactsSliderBitrixMain = undefined;
let contactsSliderBitrixThumbs = undefined;
const heroListBitrix = document.querySelector(".hero__list-bitrix");
function makeContentBitrix(bitrixData, heroDataBitrixContacts, oneLeadPrice) {
	if (heroRadialChartBitrix !== undefined) {
		heroRadialChartBitrix.destroy();
	}
	if (heroListBitrix.innerHTML !== "") {
		heroListBitrix.innerHTML = "";
	}

	if (heroDataBitrixContacts !== [] && oneLeadPrice !== "") {
		heroRadialChartBitrix = drawHeroRadialBitrix(heroDataBitrixContacts, oneLeadPrice);
	}

	if (bitrixData !== undefined) {
		redrawSliderBitrix(bitrixData);
	}
}

// данные для статичных диаграмм
const statsRadialDataConversy = {
	count1c: 0,
	bitrix: 0,
	empty: 0,
};
let statsRadialConversyChart = undefined;
function drawConversyChart(statsRadialDataConversy) {
	if (!statsRadialDataConversy) {
		console.log("statsRadialDataConversy не получена");
		return;
	}
	if (statsRadialConversyChart !== undefined) {
		statsRadialConversyChart.destroy();
	}
	statsRadialConversyChart = drawStatsRadialConversy(statsRadialDataConversy);
}

const statsRadialData = {
	count1c: 0,
	bitrix: 0,
};
let statsRadialChart = undefined;
function drawSummChart(statsRadialData) {
	if (!statsRadialData) {
		console.log("statsRadialData не получена");
		return;
	}
	if (statsRadialChart !== undefined) {
		statsRadialChart.destroy();
	}
	statsRadialChart = drawStatsRadial(statsRadialData);
}

const generateButton1c = document.querySelector(".stats__button-generate-1c");
if (generateButton1c) {
	generateButton1c.addEventListener("click", () => {
		if (generateButton1c.classList.contains("blocked")) {
			return;
		}
		showLoader();
		axios
			.post("https://b24-ost.ru/analytics/file_2.php", {
				startDate: startDateInput.value == "" ? null : startDateInput.value,
				endDate: endDateInput.value == "" ? null : endDateInput.value,
				dataExcel: dataEx,
			})
			.then((response) => {
				startDate1c.innerHTML = response.data.date.split(" ").reverse()[2];
				endDate1c.innerHTML = response.data.date.split(" ").reverse()[0];
				statsRadialData.count1c = response.data.totalSum1C;
				drawSummChart(statsRadialData);
				statsRadialDataConversy.count1c = response.data.totalContacts1C;
				drawConversyChart(statsRadialDataConversy);
				makeContent1c(response.data.data1C, response.data.lead1C, response.data.oneLeadPrice1C);
				console.log(response.data.bitrixData);
				bitrixData = response.data.bitrixData;
				makeContentBitrix(bitrixData, heroDataBitrix, oneDealB24Price);
				hideLoader();
			})
			.catch((e) => {
				console.log(e);
				showErrorState1c();
			});
		axios
			.post("https://b24-ost.ru/analytics/file_3.php", {
				startDate: startDateInput.value == "" ? null : startDateInput.value,
				endDate: endDateInput.value == "" ? null : endDateInput.value,
			})
			.then((response) => {
				statsRadialDataConversy.empty = response.data.noVisits;
				drawConversyChart(statsRadialDataConversy);
			})
			.catch((e) => {
				console.log(e);
				showErrorStateBitrix();
			});
	});
}

const generateButtonBitrix = document.querySelector(".stats__button-generate-bitrix");
if (generateButtonBitrix) {
	generateButtonBitrix.addEventListener("click", () => {
		if (generateButtonBitrix.classList.contains("blocked")) {
			return;
		}
		axios
			.post("https://b24-ost.ru/analytics/file_1.php", {
				startDate: startDateInput.value == "" ? null : startDateInput.value,
				endDate: endDateInput.value == "" ? null : endDateInput.value,
			})
			.then((response) => {
				statsRadialData.bitrix = response.data.totalDealB24Price;
				drawSummChart(statsRadialData);
				statsRadialDataConversy.bitrix = response.data.totalContactsB24;
				drawConversyChart(statsRadialDataConversy);
				heroDataBitrix = response.data.bitrixData;
				oneDealB24Price = response.data.oneDealB24Price;
				makeContentBitrix(bitrixData, heroDataBitrix, oneDealB24Price);
				hideLoader();
			})
			.catch((e) => {
				console.log(e);
				showErrorStateBitrix();
			});
		axios
			.post("https://b24-ost.ru/analytics/file_3.php", {
				startDate: startDateInput.value == "" ? null : startDateInput.value,
				endDate: endDateInput.value == "" ? null : endDateInput.value,
			})
			.then((response) => {
				statsRadialDataConversy.empty = response.data.noVisits;
				drawConversyChart(statsRadialDataConversy);
			})
			.catch((e) => {
				console.log(e);
				showErrorStateBitrix();
			});
	});
}

// перерисовываем слайдер с контактами 1с
function redrawSlider1c(data1c) {
	if (contactsSlider1cMain && contactsSlider1cThumbs) {
		contactsSlider1cMain.$wrapperEl[0].innerHTML = "";
		document.querySelector(".contacts__pagination-1c").innerHTML = "";
		contactsSlider1cMain.destroy();
		contactsSlider1cThumbs.destroy();
	}
	let slidersObj = drawSlider1c(data1c);
	contactsSlider1cMain = slidersObj.mainSlider;
	contactsSlider1cThumbs = slidersObj.mainSlider;
}

// перерисовываем слайдер с контактами битрикса
function redrawSliderBitrix(dataBitrix) {
	if (contactsSliderBitrixMain && contactsSliderBitrixThumbs) {
		contactsSliderBitrixMain.$wrapperEl[0].innerHTML = [];
		document.querySelector(".contacts__pagination-bitrix").innerHTML = "";
		contactsSliderBitrixMain.destroy();
		contactsSliderBitrixThumbs.destroy();
	}
	let slidersObj = drawSliderBitrix(dataBitrix);
	contactsSliderBitrixMain = slidersObj.mainSlider;
	contactsSliderBitrixThumbs = slidersObj.mainSlider;
}

// FILE INPUT SCRIPT
const fileInputButton = document.getElementById("fileInputButton");
const fileInput = document.getElementById("fileInput");

if (fileInputButton !== null && fileInput !== null) {
	fileInputButton.addEventListener("click", () => {
		fileInput.click();
	});
	fileInput.addEventListener("change", async () => {
		generateButton1c.classList.remove("blocked");
		/* get data as an ArrayBuffer */
		const file = fileInput.files[0];
		const data = await file.arrayBuffer();

		/* parse and load first worksheet */
		const wb = XLSX.read(data);
		const ws = wb.Sheets[wb.SheetNames[0]];
		dataEx = XLSX.utils.sheet_to_json(ws, { header: "A" });
	});
}
