import Chart from "chart.js/auto";

const ctx = document.getElementById("statsBarChart-1c");
const ctxBitrix = document.getElementById("statsBarChart-bitrix");
// данные которые используются для отрисовки диаграммы и списка
export const graphData1c = {
	"1c": 140,
	all: 250,
};
export const graphData1cKeys = Object.keys(graphData1c);

const data = {
	labels: [""],
	datasets: [
		{
			data: [graphData1c["1c"]],
			backgroundColor: "#e15335",
			barThickness: 47,
		},
		{
			data: [graphData1c.all - graphData1c["1c"]],
			backgroundColor: "white",
			borderRadius: 10,
			borderWidth: 1,
			borderColor: "#299b9c",
			barThickness: 47,
		},
	],
};

const barTextTooltip = {
	id: "barTextTooltip",
	afterDraw(chart) {
		const {
			ctx,
			chartArea: { top, bottom, left, right, width, height },
		} = chart;
		const barHeights = [];
		chart.data.datasets.forEach((dataset, i) => {
			chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
				const { x, y } = datapoint.tooltipPosition();
				barHeights.push({ height: datapoint.height, width: datapoint.width, y: y });
			});
		});
		barHeights.forEach((obj, idx) => {
			ctx.font = "12px Inter";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "black";
			ctx.fillText(graphData1c[graphData1cKeys[idx]], obj.width + 10, obj.y + obj.height / 2);
		});
	},
};

const config = {
	type: "bar",
	data: data,
	options: {
		scales: {
			x: {
				stacked: true,
				grid: {
					display: false,
				},
				ticks: {
					display: false,
				},
				display: false,
			},
			y: {
				stacked: true,
				grid: {
					display: false,
				},
				ticks: {
					display: false,
				},
				display: false,
			},
		},
		plugins: {
			legend: false,
			tooltip: {
				enabled: false,
			},
			datalabels: {
				display: false,
			},
		},
		layout: {
			padding: {
				right: 45,
			},
		},
		hover: { mode: null },
	},
	plugins: [barTextTooltip],
};

const barChart1c = new Chart(ctx, config);

// второй скрытый график
export const graphDataBitrix = {
	bitrix: 180,
	all: 250,
};
const graphDataBitrixKeys = Object.keys(graphDataBitrix);

const dataBitrix = {
	labels: [""],
	datasets: [
		{
			data: [graphDataBitrix.bitrix],
			backgroundColor: "#299b9c",
			barThickness: 47,
		},
		{
			data: [graphDataBitrix.all - graphDataBitrix.bitrix],
			backgroundColor: "white",
			borderRadius: 10,
			borderWidth: 1,
			borderColor: "#e15335",
			barThickness: 47,
		},
	],
};

const barTextTooltipBitrix = {
	id: "barTextTooltipBitrix",
	afterDraw(chart) {
		const {
			ctx,
			chartArea: { top, bottom, left, right, width, height },
		} = chart;
		const barHeights = [];
		chart.data.datasets.forEach((dataset, i) => {
			chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
				const { x, y } = datapoint.tooltipPosition();
				barHeights.push({ height: datapoint.height, width: datapoint.width, y: y });
			});
		});
		barHeights.forEach((obj, idx) => {
			ctx.font = "12px Inter";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "black";
			ctx.fillText(graphDataBitrix[graphDataBitrixKeys[idx]], obj.width + 10, obj.y + obj.height / 2);
		});
	},
};

const configBitrix = {
	type: "bar",
	data: dataBitrix,
	options: {
		scales: {
			x: {
				stacked: true,
				grid: {
					display: false,
				},
				ticks: {
					display: false,
				},
				display: false,
			},
			y: {
				stacked: true,
				grid: {
					display: false,
				},
				ticks: {
					display: false,
				},
				display: false,
			},
		},
		plugins: {
			legend: false,
			tooltip: {
				enabled: false,
			},
			datalabels: {
				display: false,
			},
		},
		layout: {
			padding: {
				right: 45,
			},
		},
		hover: { mode: null },
	},
	plugins: [barTextTooltipBitrix],
};
const barChartBitrinx = new Chart(ctxBitrix, configBitrix);
