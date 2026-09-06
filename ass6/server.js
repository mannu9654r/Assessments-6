const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
function servePage(res, fileName, statusCode = 200) {

    const filePath = path.join(__dirname, "pages", fileName);

    fs.readFile(filePath, "utf8", (error, data) => {

        if (error) {

            console.log("Error reading file:", error);

            res.writeHead(500, {
                "Content-Type": "text/html"
            });

            res.end(`
                <h1>500 - Internal Server Error</h1>
                <p>Unable to load the requested page.</p>
            `);

            return;
        }

        res.writeHead(statusCode, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
}

function serveCSS(res) {

    const cssPath = path.join(__dirname, "public", "style.css");

    fs.readFile(cssPath, "utf8", (error, data) => {

        if (error) {

            res.writeHead(500, {
                "Content-Type": "text/plain"
            });

            res.end("500 - CSS file could not be loaded.");

            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/css"
        });

        res.end(data);
    });
}

const server = http.createServer((req, res) => {

    const url = req.url;

    console.log(`Request: ${req.method} ${url}`);

    if (url === "/" || url === "/home") {
        servePage(res, "home.html", 200);
    }

    else if (url === "/about") {
        servePage(res, "about.html", 200);
    }

    else if (url === "/contact") {
        servePage(res, "contact.html", 200);
    }


    else if (url === "/style.css") {
        serveCSS(res);
    }


    else {
        servePage(res, "404.html", 404);
    }
});


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});