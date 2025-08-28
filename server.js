const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "https://gentle-cat-101050.netlify.app"  // ✅ only allow your Netlify frontend
}));

const extensions = ["com", "net", "org", "co.ke", "ke", "xyz", "shop"];

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  if (!keyword) return res.json({ error: "No keyword provided" });

  const results = extensions.map(ext => ({
    domain: `${keyword}.${ext}`,
    status: Math.random() > 0.5 ? "Available" : "Taken"
  }));

  res.json({ keyword, results });
});

app.listen(port, () => {
  console.log(`domain server running at http://localhost:${port}`);
});
