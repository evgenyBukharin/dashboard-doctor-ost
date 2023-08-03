import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";

// регистрация плагинов
Chart.register(ChartDataLabels);
Chart.register(DoughnutLabel);

const ctx = document.getElementById("statsRadialChart");

// данные которые используются для отрисовки диаграммы и списка
export const statsRadialData = {
	count1c: 750000,
	bitrix: 1500000,
};
const statsDataKeys = Object.keys(statsRadialData);

const colors = ["#E15335", "#299B9C"];

const data = {
	labels: [""],
	datasets: [
		{
			data: statsDataKeys.map((key) => statsRadialData[key]),
			backgroundColor: colors,
		},
	],
};

const config = {
	type: "doughnut",
	data: data,
	options: {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
				position: "nearest",
				external: externalTooltipHandler,
			},
			doughnutlabel: {
				paddingPercentage: 5,
				labels: [
					{
						text: "Всего",
						font: {
							size: 10,
							weight: "400",
						},
					},
					{
						text: format(new String(calcWholeSum(Object.values(statsRadialData)))) + " ₽",
						font: {
							size: 10,
							weight: "700",
						},
					},
				],
			},
			datalabels: {
				display: false,
			},
		},
		cutout: "75%",
		layout: {
			padding: {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		},
		rotation: -15,
	},
};

const statsRadialChart = new Chart(ctx, config);

// считает общее количество пациентов из data
export function calcWholeSum(data) {
	let sum = null;
	data.forEach((value) => {
		sum += value;
	});
	return sum;
}

function getOrCreateTooltip(chart) {
	let tooltipEl = ctx.parentNode.querySelector(".hero__container-tooltip");

	if (!tooltipEl) {
		tooltipEl = document.createElement("div");
		tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
		tooltipEl.style.borderRadius = "100%";
		tooltipEl.style.color = "white";
		tooltipEl.style.opacity = 1;
		tooltipEl.style.pointerEvents = "none";
		tooltipEl.style.position = "absolute";
		tooltipEl.style.transform = "translate(-50%, 0)";
		tooltipEl.style.transition = "all .1s ease";

		const table = document.createElement("div");
		table.style.margin = "0px";

		tooltipEl.appendChild(table);
		chart.canvas.parentNode.appendChild(tooltipEl);
	}

	return tooltipEl;
}

function externalTooltipHandler(context) {
	// Tooltip Element
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	// Hide if no tooltip
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = 0;
		return;
	}

	// Set Text
	if (tooltip.body) {
		const titleLines = tooltip.title || [];
		const bodyLines = tooltip.body.map((b) => b.lines);

		const tableHead = document.createElement("div");
		tableHead.classList = "hero__header-tooltip";

		titleLines.forEach((title, i) => {
			const colors = tooltip.labelColors[i];

			const span = document.createElement("div");
			span.classList = "hero__color-tooltip";
			span.style.background = colors.backgroundColor;
			span.style.borderColor = colors.borderColor;

			const tr = document.createElement("div");
			tr.style.borderWidth = 0;

			const th = document.createElement("div");
			th.style.borderWidth = 0;
			const text = document.createTextNode(title);

			tooltipEl.style.border = `1px solid ${colors.backgroundColor}`;

			th.appendChild(text);
			tr.appendChild(th);
			tableHead.appendChild(span);
			tableHead.appendChild(tr);
		});

		const tableBody = document.createElement("div");
		tableBody.classList = "hero__body-tooltip";
		bodyLines.forEach((body, i) => {
			const tr = document.createElement("div");
			tr.innerHTML = body + " руб.";

			const foundedData = statsDataKeys.find((element) => {
				element == tooltip.title[i];
				return element;
			});
			tableBody.appendChild(tr);
		});

		const tableRoot = tooltipEl.querySelector("div");
		tableRoot.classList = "hero__content-tooltip";

		// Remove old children
		while (tableRoot.firstChild) {
			tableRoot.firstChild.remove();
		}

		// Add new children
		tableRoot.appendChild(tableHead);
		tableRoot.appendChild(tableBody);
	}

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

	// Display, position, and set styles for font
	tooltipEl.style.opacity = 1;
	tooltipEl.style.left = positionX + tooltip.caretX + "px";
	tooltipEl.style.top = positionY + tooltip.caretY - tooltipEl.offsetHeight + "px";
}

function format(str) {
	const s = str.length;
	const chars = str.split("");
	const strWithSpaces = chars.reduceRight((acc, char, i) => {
		const spaceOrNothing = (s - i) % 3 === 0 ? " " : "";
		return spaceOrNothing + char + acc;
	}, "");

	return strWithSpaces[0] === " " ? strWithSpaces.slice(1) : strWithSpaces;
}
