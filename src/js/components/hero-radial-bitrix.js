import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";

// регистрация плагинов
Chart.register(ChartDataLabels);
Chart.register(DoughnutLabel);

export function drawHeroRadialBitrix(data, oneLeadPrice) {
	// данные для отрисовки в диаграмме
	const heroDataBitrix = data;

	const ctx = document.getElementById("myChartBitrix");
	// export const heroListBitrix = document.querySelector(".hero__list-bitrix");
	const heroListBitrix = document.querySelector(".hero__list-bitrix");

	const heroItemInner = `
	<div class="hero__container-icon-text">
		<svg class="hero__icon-ellipse">
			<use xlink:href="img/sprite.svg#ellipse"></use>
		</svg>
		<span class="hero__text hero__text-label title__h4"></span>
	</div>
	<span class="hero__text hero__text-persent title__h4"></span>
	<span class="hero__text hero__text-count title__h4"></span>`;

	const colors = [
		"#299B9C",
		"#E15335",
		"#469C78",
		"#52469C",
		"#D31DA0",
		"#00D7BD",
		"#F66818",
		"#298B9C",
		"#CFD311",
		"#FF002E",
	];

	heroDataBitrix.forEach((row, idx) => {
		// создаем новый айтем
		let heroItem = document.createElement("li");
		heroItem.classList.add("hero__item");
		heroItem.innerHTML = heroItemInner;

		// изменяем контент внутри
		heroItem.querySelector(".hero__text-label").innerHTML = row.label;
		heroItem.querySelector(".hero__text-persent").innerHTML = row.persentage;
		heroItem.querySelector(".hero__text-count").innerHTML = row.count + " пац.";
		heroItem.querySelector(".hero__icon-ellipse").style.fill = colors[idx];

		// засовываем в лист
		heroListBitrix.appendChild(heroItem);
	});

	const dataBitrix = {
		labels: heroDataBitrix.map((row) => row.label),
		datasets: [
			{
				label: "",
				data: heroDataBitrix.map((row) => row.count),
				backgroundColor: colors,
				datalabels: {
					labels: {
						index: {
							color: "#1e1e1e",
							font: {
								size: 12,
							},
							align: "end",
							anchor: "end",
						},
					},
				},
			},
		],
	};

	const configBitrix = {
		type: "doughnut",
		data: dataBitrix,
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
							text: "a",
							font: {
								size: 22,
								weight: "400",
							},
							color: "transparent",
						},
						{
							text: "Всего пациентов:",
							font: {
								size: 18,
								weight: "400",
							},
						},
						{
							text: calcAllPatients(heroDataBitrix),
							font: {
								size: 24,
								weight: "500",
							},
						},
						{
							text: "a",
							font: {
								size: 18,
								weight: "400",
							},
							color: "transparent",
						},
						{
							text: "Средний чек:",
							font: {
								size: 18,
								weight: "400",
							},
						},
						{
							text: oneLeadPrice + " руб.",
							font: {
								size: 24,
								weight: "500",
							},
						},
					],
				},
			},
			cutout: "82%",
			layout: {
				padding: {
					top: 35,
					bottom: 35,
					left: 35,
					right: 35,
				},
			},
		},
	};

	const heroChartBitrix = new Chart(ctx, configBitrix);

	// считает общее количество пациентов из data
	function calcAllPatients(data) {
		let sum = null;
		data.forEach((row) => {
			sum += row.count;
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
			bodyLines.forEach((body) => {
				const tr = document.createElement("div");
				tr.innerHTML = body + " пац.";

				tableBody.appendChild(tr);
			});

			titleLines.forEach((title) => {
				const td = document.createElement("div");

				const foundedData = heroDataBitrix.find((element) => {
					return element.label == title;
				});
				td.innerHTML = foundedData.persentage;
				tableBody.appendChild(td);
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
	return heroChartBitrix;
}
