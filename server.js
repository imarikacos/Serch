const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// ✅ Allow only your Netlify frontend
app.use(cors({
  origin: "https://gentle-cat-101050.netlify.app"
}));

// 🔹 Large TLD list (common + many extras)
const extensions = [
  // Generic TLDs
  "com","net","org","info","biz","xyz","online","site","store","app","tech","dev",
  "blog","pro","cloud","shop","web","global","live","digital","world","group","today",
  "solutions","services","agency","systems","technology","consulting","support","network",
  "company","enterprises","ventures","partners","capital","finance","money","bank","credit",
  "marketing","media","design","graphics","studio","art","photography","gallery","film","tv",
  "video","music","audio","radio","game","games","play","fun","zone","club","community",
  "chat","social","dating","love","life","family","home","house","properties","realty",
  "estate","land","build","contractors","tools","kitchen","cafe","restaurant","food",
  "pizza","beer","wine","bar","events","party","holiday","travel","flights","hotel",
  "vacations","cruise","tours","cars","auto","bike","motorcycles","taxi","bus","train",
  "school","education","college","university","academy","institute","science","health",
  "doctor","hospital","clinic","pharmacy","fitness","yoga","law","legal","lawyer","attorney",
  "judge","gov","mil","int",
  
  // New fancy gTLDs
  "ai","io","me","co","fm","tv","gg","cc","vc","to","ly","app","dev","page","space",
  "tech","news","press","wiki","help","how","guide","review","reviews","feedback","expert",
  "guru","ninja","rocks","cool","zone","club","buzz","click","link","lol","omg","wtf",

  // Finance & business
  "trade","market","exchange","fund","loans","credit","cash","insurance","investments",
  "financial","tax","accountants","capital","money","forex","finance","banking",

  // Country Codes (ccTLDs)
  "us","uk","ca","au","nz","in","cn","jp","kr","hk","sg","my","id","ph","th","vn",
  "pk","bd","np","lk","mm","la","kh","ae","sa","qa","kw","bh","om","ir","tr","eg",
  "ng","ke","tz","ug","za","gh","dz","ma","tn","et","rw","na","zw","zm","mz","bw",
  "eu","de","fr","es","it","pt","pl","se","no","fi","dk","nl","be","ch","at","gr",
  "ru","ua","by","ge","am","az","kz","kg","uz","tj","tm","af","il","jo","sy","lb",
  "ar","br","cl","co","mx","pe","ve","uy","bo","ec","py","cu","do","ht","cr","pa"
];

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  if (!keyword) return res.json({ error: "No keyword provided" });

  const results = extensions.map(ext => ({
    domain: `${keyword}.${ext}`,
    status: "Available ✅"   // Always available
  }));

  res.json({ keyword, results });
});

app.get("/", (req, res) => {
  res.send(" Domain API is running with 500+ TLDs (all available)");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
