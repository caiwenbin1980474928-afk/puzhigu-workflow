const path = require("path");
const express = require("express");

const app = express();
const port = Number(process.env.PORT || 3000);
const projectRoot = path.resolve(__dirname, "..");

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "puzhigu-ai-content-workbench",
    mode: process.env.NODE_ENV || "development"
  });
});

app.use("/assets", express.static(path.join(projectRoot, "assets"), { fallthrough: false }));

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(projectRoot, "styles.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(projectRoot, "app.js"));
});

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(projectRoot, "index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    error: "not_found",
    message: "Route not found"
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Puzhigu AI content workbench is running at http://127.0.0.1:${port}`);
});
