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
			datalabels: {
				labels: {
					index: {
						color: "#1e1e1e",
						font: {
							size: 8,
						},
						align: "end",
						anchor: "end",
					},
				},
			},
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
			},
			doughnutlabel: {
				paddingPercentage: 5,
				labels: [
					{
						text: "Всего",
						font: {
							size: 8,
							weight: "400",
						},
					},
					{
						text: calcWholeSum(Object.values(statsRadialData)) + " руб.",
						font: {
							size: 8,
							weight: "500",
						},
					},
				],
			},
		},
		cutout: "75%",
		layout: {
			padding: {
				top: 40,
				bottom: 40,
				left: 40,
				right: 40,
			},
		},
		rotation: 45,
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
