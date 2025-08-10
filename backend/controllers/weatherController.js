const axios = require('axios');

exports.getWeather = async (req, res) => {
    const city = req.params.city;
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;

        // Debug log
        console.log("Fetching weather for:", city);
        console.log("API Key loaded:", apiKey ? "Yes" : "No");

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        res.json(response.data);
    } catch (error) {
        console.error("Weather API Error:", error.response?.data || error.message);

        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || "Unable to fetch weather data"
        });
    }
};
