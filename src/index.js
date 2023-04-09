import './css/styles.css';
import Notiflix from 'notiflix';
import _ from 'lodash';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

export const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

input.placeholder = "Enter your country";

const handler = _.debounce(() => {
    fetchCountries(nam).then((response) => {
        return response.json();
    }).then((response) => {
        if (response.length > 10) {
            return Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.');
        }
        response.map((res) => {
            let nameOfficial = res.name.official;
            let capitalsArray = res.capital;
            let population = res.population;
            let flags = res.flags.svg;
            let language = Object.values(res.languages);

            if (response.length === 1) {
                list.innerHTML = `
                <li class="flag">
                    <img src='${flags}' width="100" height="60">
                </li>
                <li class="name">${nameOfficial}</li>
                <li class="item"><span class="spanCapital">Capital:</span>${capitalsArray}</li>
                <li class="item"><span class="spanPopulation">Population:</span>${population}</li>
                <li class="item"><span class="spanLanguages">Languages:</span>${language}</li>
                `;

                const name = document.querySelector(".name");
                const spanCapital = document.querySelector('.spanCapital');
                const spanPopulation = document.querySelector('.spanPopulation');
                const spanLanguages = document.querySelector('.spanLanguages');
                spanPopulation.style.fontWeight = "700";
                spanLanguages.style.fontWeight = '700';
                spanCapital.style.fontWeight = '700';
                name.style.position = 'relative';
                name.style.fontSize = '26px';
                name.style.top = '-56px';
                name.style.left = '112px';
                name.style.fontWeight = '700';
                list.style.listStyleType = 'none';
            };
            if (response.length > 1) {
                input.addEventListener("keydown", () => {
                    list.innerHTML = "";
                });
                list.innerHTML += `
                <li class="listItem">
                <img src='${flags}' width="100" height="60">
                <p>${nameOfficial}</p></li>`
            };

        })
    }).catch((error) => {
        return Notiflix.Notify.failure(
            'Oops, there is no country with that name');
    })
}, DEBOUNCE_DELAY);

input.addEventListener("input", handler);
