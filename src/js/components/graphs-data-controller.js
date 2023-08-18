import axios from "axios";
import { drawSlider1c } from "./contacts-slider-1c";
import { drawHeroRadial1c } from "./hero-radial-1c";

import { drawSliderBitrix } from "./contacts-slider-bitrix";
import { drawHeroRadialBitrix } from "./hero-radial-bitrix";

import { drawStatsRadial } from "./stats-radial-graph";
import { drawStatsRadialConversy } from "./stats-radial-conversy";

// loader
import { showLoader, hideLoader, showErrorState1c, showErrorStateBitrix } from "./loader";

const historySection = document.querySelector(".history");

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
function make1cRequests() {
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
	if (historySection.classList.contains("history-visible")) {
		historySection.classList.remove("history-visible");
	}
	generateButton1c.classList.remove("blocked");
}
if (generateButton1c) {
	generateButton1c.addEventListener("click", () => {
		if (generateButton1c.classList.contains("blocked")) {
			return;
		}
		showLoader();
		make1cRequests();
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

// страница истории
const rowsList = document.querySelector(".history__list");
const rowInnerHtml = `
		<span class="history__cell history__period">14.08.2023 – 14.09.2023</span>
		<span class="history__cell history__name">Аналитика лидов за май 2023</span>
		<span class="history__cell history__date">14.08.2023</span>
		<span class="history__cell history__buttons">
			<a href="#" target="_blank" class="history__container-button history__container-button-watch">
				<div class="history__container-icon">
					<svg
						class="history__icon history__icon-watch"
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
					>
						<rect width="25" height="25" rx="5" fill="#299B9C" />
						<path
							d="M13.802 4C14.0079 4 14.1663 4.168 14.1663 4.368V6.944C14.1663 8.408 15.3624 9.608 16.8119 9.616C17.4139 9.616 17.8891 9.624 18.2535 9.624L18.3884 9.62341C18.6319 9.62156 18.9597 9.616 19.2436 9.616C19.4416 9.616 19.6 9.776 19.6 9.976V16.408C19.6 18.392 18.0079 20 16.0436 20H9.73861C7.67921 20 6 18.312 6 16.232V7.608C6 5.624 7.6 4 9.57228 4H13.802ZM14.6495 14.32H10.3406C10.0158 14.32 9.74653 14.584 9.74653 14.912C9.74653 15.24 10.0158 15.512 10.3406 15.512H14.6495C14.9743 15.512 15.2436 15.24 15.2436 14.912C15.2436 14.584 14.9743 14.32 14.6495 14.32ZM13.0178 10.32H10.3406C10.0158 10.32 9.74653 10.592 9.74653 10.92C9.74653 11.248 10.0158 11.512 10.3406 11.512H13.0178C13.3426 11.512 13.6119 11.248 13.6119 10.92C13.6119 10.592 13.3426 10.32 13.0178 10.32ZM15.3206 4.7248C15.3206 4.38 15.7348 4.2088 15.9716 4.4576C16.8279 5.3568 18.3241 6.9288 19.1606 7.8072C19.3918 8.0496 19.2223 8.452 18.8889 8.4528C18.2378 8.4552 17.4703 8.4528 16.9182 8.4472C16.0421 8.4472 15.3206 7.7184 15.3206 6.8336V4.7248Z"
							fill="#F3F3F3"
						/>
					</svg>
				</div>
				<div class="history__container-button-inner">Посмотреть</div>
			</a>
			<a href="#" download class="history__container-button history__container-button-download history__container-button-active">
				<div class="history__container-icon">
					<svg
						class="history__icon history__icon-download"
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
					>
						<rect width="25" height="25" rx="5" fill="#299B9C" />
						<path
							d="M13.802 5C14 5 14.1663 5.168 14.1663 5.368V7.944C14.1663 9.408 15.3545 10.608 16.8119 10.616C17.4059 10.616 17.8891 10.624 18.2455 10.624L18.3805 10.6234C18.624 10.6216 18.9518 10.616 19.2356 10.616C19.4416 10.616 19.6 10.776 19.6 10.976V17.408C19.6 19.392 18 21 16.0356 21H9.73861C7.67129 21 6 19.312 6 17.232V8.608C6 6.624 7.59208 5 9.57228 5H13.802ZM12.5109 10.392C12.1861 10.392 11.9168 10.656 11.9168 10.992V14.848L10.6574 13.568C10.4277 13.336 10.0554 13.336 9.82574 13.568C9.59604 13.8 9.59604 14.176 9.82574 14.416L12.0911 16.712C12.1465 16.768 12.2099 16.808 12.2812 16.84C12.3525 16.872 12.4317 16.888 12.5109 16.888C12.5901 16.888 12.6614 16.872 12.7327 16.84C12.804 16.808 12.8673 16.768 12.9228 16.712L15.196 14.416C15.4257 14.176 15.4257 13.8 15.1881 13.568C14.9584 13.336 14.5861 13.336 14.3564 13.568L13.097 14.848V10.992C13.097 10.656 12.8356 10.392 12.5109 10.392ZM15.316 5.72488C15.316 5.38008 15.7303 5.20888 15.9663 5.45768C16.8234 6.35688 18.3196 7.92888 19.156 8.80728C19.3873 9.04968 19.2178 9.45208 18.8836 9.45288C18.2333 9.45528 17.4657 9.45288 16.9137 9.44728C16.0376 9.44728 15.316 8.71848 15.316 7.83368V5.72488Z"
							fill="#F3F3F3"
						/>
					</svg>
				</div>
				<div class="history__container-button-inner">Скачать</div>
			</a>
			<div class="history__container-button history__container-button-dashboard">
				<div class="history__container-icon">
					<svg
						class="history__icon history__icon-dashboard"
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
					>
						<rect width="25" height="25" rx="5" fill="#299B9C" />
						<path
							d="M13.802 5C14 5 14.1663 5.168 14.1663 5.368V7.944C14.1663 9.408 15.3545 10.608 16.8119 10.616C17.4059 10.616 17.8812 10.624 18.2455 10.624C18.4911 10.624 18.895 10.616 19.2356 10.616C19.4337 10.616 19.6 10.776 19.6 10.976V17.408C19.6 19.392 18 21 16.0356 21H9.73861C7.67129 21 6 19.312 6 17.232V8.608C6 6.624 7.59208 5 9.57228 5H13.802ZM12.5109 10.392C12.4317 10.392 12.3525 10.408 12.2812 10.44C12.2099 10.472 12.1465 10.512 12.0911 10.568L9.82574 12.872C9.59604 13.104 9.59604 13.48 9.82574 13.712C10.0554 13.944 10.4277 13.944 10.6574 13.712L11.9168 12.432V16.296C11.9168 16.624 12.1782 16.888 12.5109 16.888C12.8356 16.888 13.097 16.624 13.097 16.296V12.432L14.3564 13.712C14.5861 13.944 14.9584 13.944 15.1881 13.712C15.4257 13.48 15.4257 13.104 15.196 12.872L12.9228 10.568C12.8673 10.512 12.804 10.472 12.7327 10.44C12.6614 10.408 12.5901 10.392 12.5109 10.392ZM15.3162 5.7248C15.3162 5.38 15.7297 5.2088 15.9665 5.4576C16.8235 6.3568 18.3198 7.9288 19.1562 8.8072C19.3867 9.0496 19.2172 9.452 18.8837 9.4528C18.2326 9.4552 17.4659 9.4528 16.9138 9.4472C16.0378 9.4472 15.3162 8.7184 15.3162 7.8336V5.7248Z"
							fill="#F3F3F3"
						/>
					</svg>
				</div>
				<div class="history__container-button-inner">Дэшборд</div>
			</div>
		</span>
	`;

axios
	.get("https://b24-ost.ru/analytics/return-file-links.php")
	.then((r) => {
		r.data.forEach((row) => {
			let newRow = document.createElement("div");
			newRow.classList = `history__heading`;
			newRow.innerHTML = rowInnerHtml;
			newRow.querySelector(".history__period").innerHTML = row.period;
			newRow.querySelector(".history__name").innerHTML = row.name;
			newRow.querySelector(".history__date").innerHTML = row.date;
			newRow.querySelector(".history__container-button-watch").setAttribute("href", row.publicFileLink);
			newRow.querySelector(".history__container-button-download").setAttribute("href", row.fileLink);
			newRow.querySelector(".history__container-button-dashboard").addEventListener("click", async () => {
				const file = await fetch(row.fileLink);
				const data = await file.arrayBuffer();

				const wb = XLSX.read(data);
				const ws = wb.Sheets[wb.SheetNames[0]];
				dataEx = XLSX.utils.sheet_to_json(ws, { header: "A" });
				make1cRequests();
			});

			rowsList.appendChild(newRow);
		});
		document.querySelector(".history__value").innerHTML = r.data.length;
	})
	.finally(() => {
		const historyButtons = document.querySelectorAll(".history__container-button");
		if (historyButtons) {
			historyButtons.forEach((button) => {
				button.addEventListener("mouseenter", (e) => {
					toggleActive(e);
				});
				button.addEventListener("mouseleave", (e) => {
					toggleActive(e);
				});
			});
		} else {
			console.log("no historyButtons");
			console.log(historyButtons);
		}
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
