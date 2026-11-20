const button = document.getElementById("weather-button");
const weather = document.getElementById("weather");

button.addEventListener("click", async () => {
    button.disabled = true;
    weather.textContent = "Завантаження…";

    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London,GB&units=metric&appid=eddfd7c11166b214ac3c8f9ecbcda893");
        if (response.status === 401) {
            weather.textContent = "OpenWeatherMap відхилив ключ. Перевірте, чи він уже активний.";
            return;
        }
        if (!response.ok) throw new Error();

        const data = await response.json();
        weather.innerText = [
            `Температура: ${data.main.temp} °C`,
            `Вологість: ${data.main.humidity} %`,
            `Швидкість вітру: ${data.wind.speed} м/с`
        ].join("\n");
    } catch {
        weather.textContent = "Не вдалося отримати погоду. Спробуйте ще раз.";
    } finally {
        button.disabled = false;
    }
});
