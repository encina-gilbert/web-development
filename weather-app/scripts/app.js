// DOM Selectors
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
  // Destructure properties
  const { cityDetails, weather } = data;

  // Update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // Update the Night/Day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  // Remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', (e) => {
  // Prevent submit default action
  e.preventDefault();

  // Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update the UI with new city
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // Set local storage
  localStorage.setItem('city', city);
});

// On page load/reload check if there's a city stored on local storage
if (localStorage.getItem('city')) {
  forecast
    .updateCity(localStorage.getItem('city'))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
