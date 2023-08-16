import Swiper, { Pagination, Navigation, Controller } from "swiper";
Swiper.use([Pagination, Navigation, Controller]);

export function drawSlider1c(data) {
	// данные для отрисовки в слайдере
	const data1c = data;

	const contactsValueSpan = document.querySelector(".contacts__value-1c");
	contactsValueSpan.innerHTML = data1c.length;

	// верстка внутреннего элемента списка
	const contactsItemInner = `
		<span class="contacts__name"></span>
		<span class="contacts__phone" data-mask='XX (XXX) XXX XX XX'></span>
		<span class="contacts__deals"></span>
	`;

	const list = document.querySelector(`.contacts__list-1c`);
	const formattedData = [];
	let chunkSize = 10;
	for (let i = 0; i < data1c.length; i += chunkSize) {
		const chunk = data1c.slice(i, i + chunkSize);
		formattedData.push(chunk);
	}
	formattedData.forEach((array) => {
		// создаем новый слайд
		let contactsSlide = document.createElement("div");
		contactsSlide.classList = `swiper-slide swiper-slide-1c`;

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

	const swiperThumbs1c = new Swiper(document.querySelector(`.swiper-thumbs-1c`), {
		slidesPerView: 7,
		speed: 500,
	});

	const slider1c = new Swiper(document.querySelector(`.contacts__container-slider-1c`), {
		slidesPerView: 1,
		spaceBetween: 30,
		slideClass: `swiper-slide-1c`,
		speed: 500,
		pagination: {
			el: ".contacts__pagination-1c",
			clickable: true,
			bulletActiveClass: "contacts__bullet-active",
			renderBullet: function (index, className) {
				return `<span class="swiper-slide contacts__bullet ${className}">${index + 1}</span>`;
			},
		},
		navigation: {
			nextEl: ".contacts__button-next-1c",
			prevEl: ".contacts__button-prev-1c",
		},
		controller: {
			by: "slide",
			control: swiperThumbs1c,
		},
	});
	return { mainSlider: slider1c, thumbsSlider: swiperThumbs1c };
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
