const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// ✅ Allow only your Netlify frontend
app.use(cors({
  origin: "https://gentle-cat-101050.netlify.app"
}));

// 🔹 Extended list of common domain extensions (you can add more)
const extensions = [
  "com", "net", "org", "info", "biz", "xyz", "online", "site", "store",
  "io", "co", "app", "tech", "ai", "dev", "cloud", "shop", "blog",
  "pro", "us", "uk", "ca", "au", "in", "co.ke", "ke", "co.za", "ng",
  "eu", "asia", "me", "tv", "fm", "cc", "pk", "sa", "qa", "bh", "ae",
  "cn", "jp", "kr", "ph", "id", "my", "sg"
];

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  if (!keyword) return res.json({ error: "No keyword provided" });

  const results = extensions.map(ext => ({
    domain: `${keyword}.${ext}`,
    status: "Available ✅"   // 🔹 Always available
  }));

  res.json({ keyword, results });
});

app.get("/", (req, res) => {
  res.send("✅ Fake Domain API is running with all domains available");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
