const http = require("http");
const { URL } = require("url");
const routes = require("./routes");

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(`http://localhost:3333${req.url}`);

    let { pathname } = parsedUrl;
    let id = null;

    const splitEndpoint = pathname.split("/").filter(Boolean);

    if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`;
        id = splitEndpoint[1];
    }

    const route = routes.find(item => (
        pathname === item.endpoint && req.method === item.method
    ));

    if (route) {
        req.query = Object.fromEntries(parsedUrl.searchParams);
        req.params = { id };

        res.send = (statusCode, body) => {
            res.writeHead(statusCode, {
                "Content-Type": "application/json",
            });

            res.end(JSON.stringify(body));
        };

        route.handler(req, res);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
        });

        res.end(`Cannot ${req.method} ${pathname}`);
    }
});

server.listen(3333, () => console.log("Server started at 3333"));