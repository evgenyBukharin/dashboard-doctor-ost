import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";

// регистрация плагинов
Chart.register(ChartDataLabels);
Chart.register(DoughnutLabel);

export function drawHeroRadial1c(data) {
	const ctx = document.getElementById("myChart1c");
	// export const heroList1c = document.querySelector(".hero__list-1c");
	const heroList1c = document.querySelector(".hero__list-1c");

	const heroItemInner = `
	<div class="hero__container-icon-text">
		<svg class="hero__icon-ellipse">
			<use xlink:href="img/sprite.svg#ellipse"></use>
		</svg>
		<span class="hero__text hero__text-label title__h4"></span>
	</div>
	<span class="hero__text hero__text-persent title__h4"></span>
	<span class="hero__text hero__text-count title__h4"></span>`;

	// данные которые используются для отрисовки диаграммы и списка
	const heroData1c = data;

	const colors = [
		"#E15335",
		"#299B9C",
		"#469C78",
		"#52469C",
		"#D31DA0",
		"#00D7BD",
		"#F66818",
		"#298B9C",
		"#CFD311",
		"#FF002E",
	];

	heroData1c.forEach((row, idx) => {
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
		heroList1c.appendChild(heroItem);
	});

	const data1c = {
		labels: heroData1c.map((row) => row.label),
		datasets: [
			{
				label: "",
				data: heroData1c.map((row) => row.count),
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

	const config1c = {
		type: "doughnut",
		data: data1c,
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
							text: calcAllPatients(heroData1c),
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
							text: "Стоимость одного лида:",
							font: {
								size: 18,
								weight: "400",
							},
						},
						{
							text: 250,
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

				const foundedData = heroData1c.find((element) => {
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
	const heroChart1c = new Chart(ctx, config1c);
	return heroChart1c;
}
