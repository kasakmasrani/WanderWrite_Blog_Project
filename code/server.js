const http = require("http");
const mysql = require("mysql2");
const qs = require("querystring");

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Update with your database username
    password: "1234", // Update with your database password
    database: "wanderwrite_blog"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// Create HTTP server
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Parse URL and method
    const { method, url } = req;

    // Handle login
    if (url === "/api/login" && method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk.toString(); });

        req.on("end", () => {
            const { email, password } = JSON.parse(body);

            if (!email || !password) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Email and password are required" }));
                return;
            }

            const query = "SELECT * FROM users WHERE email = ?";
            db.query(query, [email], (err, results) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Database error" }));
                    return;
                }

                if (results.length === 0) {
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Invalid credentials" }));
                    return;
                }

                const user = results[0];

                // Compare plain text passwords
                if (user.password !== password) {
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Invalid credentials" }));
                    return;
                }

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Login successful" }));
            });
        });
    }

    // Handle signup
    else if (url === "/api/signup" && method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk.toString(); });

        req.on("end", () => {
            const { fullName, email, password } = JSON.parse(body);

            if (!fullName || !email || !password) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "All fields are required" }));
                return;
            }

            db.query(
                "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
                [fullName, email, password], // Storing password as plain text
                (err, result) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: err.message }));
                        return;
                    }
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "User registered successfully" }));
                }
            );
        });
    }

    // Fetch posts
    else if (url === "/api/posts" && method === "GET") {
        db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, results) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(results));
        });
    }

    // Add new blog post
    else if (url === "/api/posts" && method === "POST") {
        let body = "";
        req.on("data", chunk => { body += chunk.toString(); });

        req.on("end", () => {
            const { title, content, excerpt, author, image, category, tags, status } = qs.parse(body);

            if (!title || !content || !author) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Title, content, and author are required" }));
                return;
            }

            const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
            const jsonTags = tags ? JSON.stringify(tags.split(",")) : "[]";

            db.query(
                "INSERT INTO posts (title, slug, content, excerpt, author, image, category, tags, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                [title, slug, content, excerpt, author, image, category, jsonTags, status || 'draft'],
                (err, result) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: err.message }));
                        return;
                    }
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Post created successfully" }));
                }
            );
        });
    }

    // Handle unknown routes
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});