import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";
import declOfNum from "../_functions";

// регистрация плагинов
Chart.register(ChartDataLabels);
Chart.register(DoughnutLabel);

export function drawStatsRadialConversy(dataConversy) {
	const ctx = document.getElementById("statsRadialConversy");

	// данные которые используются для отрисовки диаграммы и списка
	const statsRadialDataConversy = dataConversy;

	const statsDataKeys = Object.keys(statsRadialDataConversy);

	const colors = ["#E15335", "#299B9C", "grey"];

	const data = {
		labels: [""],
		datasets: [
			{
				data: statsDataKeys.map((key) => statsRadialDataConversy[key]),
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
							text: calcWholeSum(Object.values(statsRadialDataConversy)) + " лид",
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

	const statsConversyPersent1c = document.querySelector(".stats__text-persent-1c");
	const statsConversyCount1c = document.querySelector(".stats__text-count-1c");
	const statsConversyPersentb24 = document.querySelector(".stats__text-persent-b24");
	const statsConversyCountb24 = document.querySelector(".stats__text-count-b24");
	const statsConversyPersentEmpty = document.querySelector(".stats__text-persent-empty");
	const statsConversyCountEpmty = document.querySelector(".stats__text-count-empty");

	// конверсия лидов 1c
	const count1cPersentCoversy = Math.round(
		(statsRadialDataConversy.count1c * 100) / calcWholeSum(Object.values(statsRadialDataConversy))
	);
	statsConversyCount1c.innerHTML = statsRadialDataConversy.count1c + " пац.";
	statsConversyPersent1c.innerHTML = count1cPersentCoversy + "%";

	// конверсия лидов b24
	const countb24PersentCoversy = Math.round(
		(statsRadialDataConversy.bitrix * 100) / calcWholeSum(Object.values(statsRadialDataConversy))
	);
	statsConversyCountb24.innerHTML = statsRadialDataConversy.bitrix + " пац.";
	statsConversyPersentb24.innerHTML = countb24PersentCoversy + "%";

	// без приема
	const countEmptyPersentCoversy = Math.round(
		(statsRadialDataConversy.empty * 100) / calcWholeSum(Object.values(statsRadialDataConversy))
	);
	statsConversyCountEpmty.innerHTML =
		statsRadialDataConversy.empty + " " + declOfNum(statsRadialDataConversy.empty, ["лид", "лида", "лидов"]);
	statsConversyPersentEmpty.innerHTML = countEmptyPersentCoversy + "%";

	const statsRadialChart = new Chart(ctx, config);

	// считает общее количество пациентов из data
	function calcWholeSum(data) {
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
				tr.innerHTML = body + " пац.";

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
	return statsRadialChart;
}
