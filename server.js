const http = require("http");

const PORT = 3000;

const server = http.createServer(async (req, res) => {

    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({
            success: true,
            message: "Weather API Running 🚀"
        }));
    }

    if (req.url.startsWith("/weather/") && req.method === "GET") {

        const city = req.url.split("/")[2];

        try {

            const response = await fetch(`https://wttr.in/${city}?format=j1`);

            const data = await response.json();

            const current = data.current_condition[0];

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: true,
                city: city,
                temperature: current.temp_C + "°C",
                humidity: current.humidity + "%",
                weather: current.weatherDesc[0].value
            }));

        } catch (error) {

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                success: false,
                message: "Internal Server Error"
            }));
        }
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        success: false,
        message: "Route Not Found"
    }));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
