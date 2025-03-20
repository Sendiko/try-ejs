const { count } = require("console");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Middleware to use layout
function renderWithLayout(res, view, options = {}) {
  res.render("layouts/main", {
    ...options,
    body: `pages/${view}`, // Inject the page inside the layout
  });
}

// Routes
app.get("/", (req, res) => {
  renderWithLayout(res, "home", { title: "Home" });
});

app.get("/about", (req, res) => {
  renderWithLayout(res, "about", { title: "About Us" });
});

app.get("/counter", (req, res) => {
  renderWithLayout(res, "counter", { title: "Counter", initialCount: 0 });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
