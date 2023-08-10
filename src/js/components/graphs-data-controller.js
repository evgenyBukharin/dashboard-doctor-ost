import axios from "axios";
import { drawSlider1c } from "./contacts-slider-1c";
import { drawHeroRadial1c } from "./hero-radial-1c";

import { drawSliderBitrix } from "./contacts-slider-bitrix";
import { drawHeroRadialBitrix } from "./hero-radial-bitrix";

import { drawStatsRadial } from "./stats-radial-graph";
import { drawStatsRadialConversy } from "./stats-radial-conversy";

// Отсюда брать значение дат на странице битрикса
const startDateSpanB24 = document.querySelector(".hero__date-b24 .hero__date-text-start");
const endDateSpanB24 = document.querySelector(".hero__date-b24 .hero__date-text-end");

// данные для makeContent1c
const data1c = [
	{ name: "Петров Валерий Александрович", phone: "+79080567822", deals: 5 },
	{ name: "Максимов Эмир Андреевич", phone: "89060230760", deals: 12 },
	{ name: "Егоров Лев Александрович", phone: "+7 (908) 056 78 22", deals: 1 },
	{ name: "Евдокимов Максим Викторович", phone: "+7 (908) 056 78 22", deals: 5 },
	{ name: "Чеботарев Максим Владимирович", phone: "+7 (908) 056 78 22", deals: 6 },
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
const heroData1c = [
	{ label: "1 прием", persentage: "18%", count: 50 },
	{ label: "2 прием", persentage: "30%", count: 3 },
	{ label: "3 приема", persentage: "5%", count: 44 },
	{ label: "4 приема", persentage: "11%", count: 112 },
	{ label: "5 приемов", persentage: "20%", count: 23 },
	{ label: "6 приемов", persentage: "12%", count: 35 },
	{ label: "7 приемов", persentage: "4%", count: 32 },
	{ label: "8 приемов", persentage: "5%", count: 98 },
	{ label: "9 приемов", persentage: "12%", count: 23 },
	{ label: "10+ приемов", persentage: "0.5%", count: 3 },
];
let heroRadialChart1c = undefined;
let contactsSlider1cMain = undefined;
let contactsSlider1cThumbs = undefined;
const heroList1c = document.querySelector(".hero__list-1c");
function makeContent1c(data1c, heroData1c) {
	if (heroRadialChart1c !== undefined) {
		heroRadialChart1c.destroy();
	}
	if (heroList1c.innerHTML !== "") {
		heroList1c.innerHTML = "";
	}
	heroRadialChart1c = drawHeroRadial1c(heroData1c);

	redrawSlider1c(data1c);
}

// данные для makeContentBitrix
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
const heroDataBitrix = [
	{ label: "1 прием", persentage: "18%", count: 150 },
	{ label: "2 приема", persentage: "30%", count: 6 },
	{ label: "3 приема", persentage: "5%", count: 24 },
	{ label: "4 приема", persentage: "11%", count: 112 },
	{ label: "5 приемов", persentage: "20%", count: 43 },
	{ label: "6 приемов", persentage: "12%", count: 35 },
	{ label: "7 приемов", persentage: "4%", count: 32 },
	{ label: "8 приемов", persentage: "5%", count: 98 },
	{ label: "9 приемов", persentage: "12%", count: 32 },
	{ label: "10+ приемов", persentage: "0.5%", count: 12 },
];
let heroRadialChartBitrix = undefined;
let contactsSliderBitrixMain = undefined;
let contactsSliderBitrixThumbs = undefined;
const heroListBitrix = document.querySelector(".hero__list-bitrix");
function makeContentBitrix(bitrixData, heroDataBitrixContacts) {
	if (heroRadialChartBitrix !== undefined) {
		heroRadialChartBitrix.destroy();
	}
	if (heroListBitrix.innerHTML !== "") {
		heroListBitrix.innerHTML = "";
	}
	heroRadialChartBitrix = drawHeroRadialBitrix(heroDataBitrixContacts);
	redrawSliderBitrix(bitrixData);
}

// данные для статичных диаграмм
const statsRadialDataConversy = {
	count1c: 50,
	bitrix: 79,
};
const statsRadiaDataConversyEmpty = {
	count: 22,
	persent: 10,
};
let statsRadialConversyChart = undefined;
function drawConversyChart(statsRadialDataConversy, statsRadiaDataConversyEmpty) {
	if (!statsRadialDataConversy) {
		console.log("statsRadialDataConversy не получена");
		return;
	}
	if (!statsRadiaDataConversyEmpty) {
		console.log("statsRadiaDataConversyEmpty не получена");
		return;
	}
	if (statsRadialConversyChart !== undefined) {
		statsRadialConversyChart.destroy();
	}
	statsRadialConversyChart = drawStatsRadialConversy(statsRadialDataConversy, statsRadiaDataConversyEmpty);
}

const statsRadialData = {
	count1c: 0,
	bitrix: 1500000,
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

// что нужно сделать что бы создать страницу 1с ↓↓↓
// makeContent1c(data1c, heroData1c);

// что нужно сделать что бы создать страницу bitrix ↓↓↓
// makeContentBitrix(bitrixData, heroDataBitrix);

// что нужно сделать что бы создать секцию графиков со статичным контентом
// drawConversyChart(statsRadialDataConversy, statsRadiaDataConversyEmpty);
// drawSummChart(statsRadialData);

const generateButton1c = document.querySelector(".stats__button-generate-1c");
if (generateButton1c) {
	generateButton1c.addEventListener("click", () => {
		if (generateButton1c.classList.contains("blocked")) {
			return;
		}
		makeContent1c(data1c, heroData1c);
	});
}

const generateButtonBitrix = document.querySelector(".stats__button-generate-bitrix");
if (generateButtonBitrix) {
	generateButtonBitrix.addEventListener("click", () => {
		makeContentBitrix(bitrixData, heroDataBitrix);
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
	fileInput.addEventListener("change", () => {
		generateButton1c.classList.remove("blocked");
		const fileExtension = fileInput.files[0].name.split(".").pop();
		if (fileExtension == "xls") {
			let formData = new FormData();
			formData.append("userUploadedFile", fileInput.files[0]);
			// axios
			// 	.post("", formData, {
			// 		headers: {
			// 			"Content-Type": "multipart/form-data",
			// 		},
			// 	})
			// 	.then(function () {
			// 		console.log("SUCCESS!!");
			// 	})
			// 	.catch(function () {
			// 		console.log("FAILURE!!");
			// 	});
		}
	});
}
