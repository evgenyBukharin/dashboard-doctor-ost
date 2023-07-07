import Swiper, { Pagination, Navigation } from "swiper";
Swiper.use([Pagination, Navigation]);

// данные для отрисовки при теме bitrix
const bitrixData = [
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Калмыков Артём Михайлович", phone: "+7 (908) 056 78 22", deals: 9 },
	{ name: "Дмитриев Никита Александрович", phone: "+7 (908) 056 78 22", deals: 14 },
	{ name: "Макаров Лев Леонович", phone: "+7 (908) 056 78 22", deals: 22 },
	{ name: "Казакова Александра Егоровна", phone: "+7 (908) 056 78 22", deals: 4 },
	{ name: "Ильина Алиса Егоровна", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Князев Матвей Васильевич", phone: "+7 (908) 056 78 22", deals: 100 },
	{ name: "Орлова Полина Степановна", phone: "+7 (908) 056 78 22", deals: 8 },
	{ name: "Сергеева Серафима Владимировна", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Юдин Тимофей Петрович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Прокофьев Дмитрий Платонович", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Комаров Лев Дмитриевич", phone: "+7 (908) 056 78 22", deals: 0 },
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Калмыков Артём Михайлович", phone: "+7 (908) 056 78 22", deals: 9 },
	{ name: "Дмитриев Никита Александрович", phone: "+7 (908) 056 78 22", deals: 14 },
	{ name: "Макаров Лев Леонович", phone: "+7 (908) 056 78 22", deals: 22 },
	{ name: "Казакова Александра Егоровна", phone: "+7 (908) 056 78 22", deals: 4 },
	{ name: "Ильина Алиса Егоровна", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Князев Матвей Васильевич", phone: "+7 (908) 056 78 22", deals: 100 },
	{ name: "Орлова Полина Степановна", phone: "+7 (908) 056 78 22", deals: 8 },
	{ name: "Сергеева Серафима Владимировна", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Юдин Тимофей Петрович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Прокофьев Дмитрий Платонович", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Комаров Лев Дмитриевич", phone: "+7 (908) 056 78 22", deals: 0 },
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Калмыков Артём Михайлович", phone: "+7 (908) 056 78 22", deals: 9 },
	{ name: "Дмитриев Никита Александрович", phone: "+7 (908) 056 78 22", deals: 14 },
	{ name: "Макаров Лев Леонович", phone: "+7 (908) 056 78 22", deals: 22 },
	{ name: "Казакова Александра Егоровна", phone: "+7 (908) 056 78 22", deals: 4 },
	{ name: "Ильина Алиса Егоровна", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Князев Матвей Васильевич", phone: "+7 (908) 056 78 22", deals: 100 },
	{ name: "Орлова Полина Степановна", phone: "+7 (908) 056 78 22", deals: 8 },
	{ name: "Сергеева Серафима Владимировна", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Юдин Тимофей Петрович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Прокофьев Дмитрий Платонович", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Комаров Лев Дмитриевич", phone: "+7 (908) 056 78 22", deals: 0 },
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Калмыков Артём Михайлович", phone: "+7 (908) 056 78 22", deals: 9 },
	{ name: "Дмитриев Никита Александрович", phone: "+7 (908) 056 78 22", deals: 14 },
	{ name: "Макаров Лев Леонович", phone: "+7 (908) 056 78 22", deals: 22 },
	{ name: "Казакова Александра Егоровна", phone: "+7 (908) 056 78 22", deals: 4 },
	{ name: "Ильина Алиса Егоровна", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Князев Матвей Васильевич", phone: "+7 (908) 056 78 22", deals: 100 },
	{ name: "Орлова Полина Степановна", phone: "+7 (908) 056 78 22", deals: 8 },
	{ name: "Сергеева Серафима Владимировна", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Юдин Тимофей Петрович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Прокофьев Дмитрий Платонович", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Комаров Лев Дмитриевич", phone: "+7 (908) 056 78 22", deals: 0 },
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Калмыков Артём Михайлович", phone: "+7 (908) 056 78 22", deals: 9 },
	{ name: "Дмитриев Никита Александрович", phone: "+7 (908) 056 78 22", deals: 14 },
	{ name: "Макаров Лев Леонович", phone: "+7 (908) 056 78 22", deals: 22 },
	{ name: "Казакова Александра Егоровна", phone: "+7 (908) 056 78 22", deals: 4 },
	{ name: "Ильина Алиса Егоровна", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Князев Матвей Васильевич", phone: "+7 (908) 056 78 22", deals: 100 },
	{ name: "Орлова Полина Степановна", phone: "+7 (908) 056 78 22", deals: 8 },
	{ name: "Сергеева Серафима Владимировна", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Юдин Тимофей Петрович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Прокофьев Дмитрий Платонович", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Комаров Лев Дмитриевич", phone: "+7 (908) 056 78 22", deals: 0 },
];

const data1c = [
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Калмыков Артём Михайлович", phone: "+7 (908) 056 78 22", deals: 9 },
	{ name: "Дмитриев Никита Александрович", phone: "+7 (908) 056 78 22", deals: 14 },
	{ name: "Макаров Лев Леонович", phone: "+7 (908) 056 78 22", deals: 22 },
	{ name: "Казакова Александра Егоровна", phone: "+7 (908) 056 78 22", deals: 4 },
	{ name: "Ильина Алиса Егоровна", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Князев Матвей Васильевич", phone: "+7 (908) 056 78 22", deals: 100 },
	{ name: "Орлова Полина Степановна", phone: "+7 (908) 056 78 22", deals: 8 },
	{ name: "Сергеева Серафима Владимировна", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Юдин Тимофей Петрович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Прокофьев Дмитрий Платонович", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Комаров Лев Дмитриевич", phone: "+7 (908) 056 78 22", deals: 0 },
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Калмыков Артём Михайлович", phone: "+7 (908) 056 78 22", deals: 9 },
	{ name: "Дмитриев Никита Александрович", phone: "+7 (908) 056 78 22", deals: 14 },
	{ name: "Макаров Лев Леонович", phone: "+7 (908) 056 78 22", deals: 22 },
	{ name: "Казакова Александра Егоровна", phone: "+7 (908) 056 78 22", deals: 4 },
	{ name: "Ильина Алиса Егоровна", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Князев Матвей Васильевич", phone: "+7 (908) 056 78 22", deals: 100 },
	{ name: "Орлова Полина Степановна", phone: "+7 (908) 056 78 22", deals: 8 },
	{ name: "Сергеева Серафима Владимировна", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Юдин Тимофей Петрович", phone: "+7 (908) 056 78 22", deals: 6 },
	{ name: "Прокофьев Дмитрий Платонович", phone: "+7 (908) 056 78 22", deals: 3 },
	{ name: "Комаров Лев Дмитриевич", phone: "+7 (908) 056 78 22", deals: 0 },
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
];

// верстка внутреннего элемента списка
const contactsItemInner = `
		<span class="contacts__name"></span>
		<span class="contacts__phone" data-mask='XX (XXX) XXX XX XX'></span>
		<span class="contacts__deals"></span>
	`;

function makeSlider(data, classModifier) {
	const list = document.querySelector(`.contacts__list-${classModifier}`);
	const formattedData = [];
	const chunkSize = 10;
	for (let i = 0; i < data.length; i += chunkSize) {
		const chunk = data.slice(i, i + chunkSize);
		formattedData.push(chunk);
	}
	formattedData.forEach((array) => {
		// создаем новый слайд
		let contactsSlide = document.createElement("div");
		contactsSlide.classList = `swiper-slide swiper-slide-${classModifier}`;

		array.forEach((row) => {
			// создем новый айтем
			let contactsItem = document.createElement("div");
			contactsItem.classList = "contacts__item title title__h4";
			contactsItem.innerHTML = contactsItemInner;

			// изменяем контент внутри
			const phone = contactsItem.querySelector(".contacts__phone");
			contactsItem.querySelector(".contacts__name").innerHTML = row.name;
			phone.innerHTML = formatByMask(phone.getAttribute("data-mask"), row.phone);
			contactsItem.querySelector(".contacts__deals").innerHTML = row.deals;

			// засовываем в лист
			contactsSlide.appendChild(contactsItem);
		});
		list.appendChild(contactsSlide);
	});

	new Swiper(document.querySelector(`.contacts__container-slider-${classModifier}`), {
		slidesPerView: 1,
		spaceBetween: 30,
		slideClass: `swiper-slide-${classModifier}`,
		speed: 500,
		pagination: {
			el: ".contacts__pagination",
			clickable: true,
			bulletActiveClass: "contacts__bullet-active",
			renderBullet: function (index, className) {
				return `<span class="contacts__bullet ${className}">${index + 1}</span>`;
			},
		},
		navigation: {
			nextEl: ".contacts__button-next",
			prevEl: ".contacts__button-prev",
		},
	});
}

function formatByMask(mask, value) {
	if (value.length >= 13) {
		return value;
	}
	if (value.length < 12) {
		let maskArray = mask.split("");
		maskArray.shift();
		mask = maskArray.join("");
	}
	let formattedValue = mask;
	const maskCharCount = [...mask].reduce((result, chr) => {
		if (chr === "X") result++;
		return result;
	}, 0);

	for (let i = 0; i < maskCharCount; i++) {
		if (value[i]) formattedValue = formattedValue.replace("X", value[i]);
	}

	return formattedValue;
}

makeSlider(bitrixData, "bitrix");
makeSlider(data1c, "1c");
