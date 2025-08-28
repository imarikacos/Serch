import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// ✅ Allow only your Netlify frontend
app.use(cors({
  origin: "https://deluxe-bavarois-a0530a.netlify.app"
}));

// 🔹 Enhanced TLD list with pricing categories and individual prices (KSH)
const extensions = [
  // Premium TLDs (high demand, premium pricing)
  { ext: "com", price: 1690, category: "Premium", description: "Most popular choice worldwide" },
  { ext: "net", price: 1559, category: "Premium", description: "Great for networks and tech" },
  { ext: "org", price: 1429, category: "Premium", description: "Perfect for organizations" },
  { ext: "io", price: 6499, category: "Premium", description: "Tech startup favorite" },
  { ext: "ai", price: 11699, category: "Premium", description: "AI and machine learning" },
  
  // Standard TLDs (moderate pricing)
  { ext: "info", price: 1949, category: "Standard", description: "Information websites" },
  { ext: "biz", price: 1559, category: "Standard", description: "Professional business" },
  { ext: "pro", price: 1819, category: "Standard", description: "Professional services" },
  { ext: "name", price: 1689, category: "Standard", description: "Personal websites" },
  { ext: "mobi", price: 1429, category: "Standard", description: "Mobile optimized sites" },
  
  // Budget TLDs (affordable options)
  { ext: "xyz", price: 1169, category: "Budget", description: "Modern and affordable" },
  { ext: "online", price: 1039, category: "Budget", description: "Online presence" },
  { ext: "site", price: 909, category: "Budget", description: "Website builder friendly" },
  { ext: "store", price: 1169, category: "Budget", description: "E-commerce stores" },
  { ext: "club", price: 779, category: "Budget", description: "Communities and clubs" },
  { ext: "space", price: 1039, category: "Budget", description: "Creative spaces" },
  { ext: "website", price: 1299, category: "Budget", description: "General websites" },
  { ext: "top", price: 909, category: "Budget", description: "Top level domains" },
  { ext: "world", price: 1169, category: "Budget", description: "Global presence" },
  { ext: "live", price: 1039, category: "Budget", description: "Live streaming content" },
  
  // Tech TLDs (technology focused)
  { ext: "tech", price: 2079, category: "Tech", description: "Modern tech companies" },
  { ext: "dev", price: 2599, category: "Tech", description: "Developers and development" },
  { ext: "app", price: 2339, category: "Tech", description: "Mobile and web apps" },
  { ext: "cloud", price: 2209, category: "Tech", description: "Cloud services" },
  { ext: "digital", price: 2079, category: "Tech", description: "Digital transformation" },
  { ext: "software", price: 2469, category: "Tech", description: "Software companies" },
  { ext: "code", price: 2209, category: "Tech", description: "Programming and coding" },
  { ext: "data", price: 2339, category: "Tech", description: "Data science and analytics" },
  { ext: "systems", price: 2079, category: "Tech", description: "System integrators" },
  { ext: "network", price: 1949, category: "Tech", description: "Networking solutions" },
  
  // Business TLDs (business focused)
  { ext: "business", price: 1819, category: "Business", description: "General business use" },
  { ext: "company", price: 1949, category: "Business", description: "Corporate entities" },
  { ext: "corp", price: 2209, category: "Business", description: "Large corporations" },
  { ext: "inc", price: 2469, category: "Business", description: "Incorporated businesses" },
  { ext: "ltd", price: 2079, category: "Business", description: "Limited companies" },
  { ext: "llc", price: 2339, category: "Business", description: "Limited liability companies" },
  { ext: "ventures", price: 2209, category: "Business", description: "Venture capital firms" },
  { ext: "capital", price: 2599, category: "Business", description: "Investment firms" },
  { ext: "finance", price: 2469, category: "Business", description: "Financial services" },
  { ext: "consulting", price: 2079, category: "Business", description: "Consulting firms" },
  
  // Country TLDs (country-specific)
  { ext: "us", price: 1299, category: "Country", description: "United States" },
  { ext: "uk", price: 1559, category: "Country", description: "United Kingdom" },
  { ext: "ca", price: 1429, category: "Country", description: "Canada" },
  { ext: "au", price: 1689, category: "Country", description: "Australia" },
  { ext: "de", price: 1169, category: "Country", description: "Germany" },
  { ext: "fr", price: 1299, category: "Country", description: "France" },
  { ext: "es", price: 1169, category: "Country", description: "Spain" },
  { ext: "it", price: 1429, category: "Country", description: "Italy" },
  { ext: "nl", price: 1559, category: "Country", description: "Netherlands" },
  { ext: "in", price: 1039, category: "Country", description: "India" },
  { ext: "jp", price: 1819, category: "Country", description: "Japan" },
  { ext: "cn", price: 2079, category: "Country", description: "China" },
  { ext: "br", price: 1689, category: "Country", description: "Brazil" },
  { ext: "mx", price: 1559, category: "Country", description: "Mexico" },
  { ext: "sg", price: 1949, category: "Country", description: "Singapore" },
  
  // Additional popular extensions
  { ext: "blog", price: 2079, category: "Tech", description: "Blogging platforms" },
  { ext: "news", price: 2339, category: "Tech", description: "News websites" },
  { ext: "media", price: 2209, category: "Tech", description: "Media companies" },
  { ext: "tv", price: 3249, category: "Tech", description: "Television and streaming" },
  { ext: "video", price: 2469, category: "Tech", description: "Video content" },
  { ext: "music", price: 2599, category: "Tech", description: "Music industry" },
  { ext: "art", price: 2079, category: "Business", description: "Artists and galleries" },
  { ext: "design", price: 2209, category: "Business", description: "Design agencies" },
  { ext: "photography", price: 2339, category: "Business", description: "Photography services" },
  { ext: "agency", price: 1949, category: "Business", description: "Creative agencies" },
  { ext: "studio", price: 2079, category: "Business", description: "Design studios" },
  { ext: "marketing", price: 2079, category: "Business", description: "Marketing companies" },
  { ext: "restaurant", price: 2209, category: "Business", description: "Restaurants and food" },
  { ext: "food", price: 2079, category: "Business", description: "Food industry" },
  { ext: "health", price: 2469, category: "Business", description: "Healthcare providers" },
  { ext: "fitness", price: 2079, category: "Business", description: "Fitness centers" },
  { ext: "education", price: 1949, category: "Business", description: "Educational institutions" },
  { ext: "law", price: 2599, category: "Business", description: "Legal services" },
  { ext: "real", price: 2079, category: "Business", description: "Real estate" },
  { ext: "auto", price: 2209, category: "Business", description: "Automotive industry" },
  
  // More budget options
  { ext: "global", price: 1169, category: "Budget", description: "Global businesses" },
  { ext: "today", price: 1039, category: "Budget", description: "Current and trending" },
  { ext: "zone", price: 909, category: "Budget", description: "Special interest zones" },
  { ext: "fun", price: 779, category: "Budget", description: "Entertainment and games" },
  { ext: "cool", price: 909, category: "Budget", description: "Cool and trendy projects" },
  { ext: "rocks", price: 1039, category: "Budget", description: "Rock solid websites" },
  { ext: "buzz", price: 1169, category: "Budget", description: "Trending and viral content" },
  { ext: "click", price: 909, category: "Budget", description: "Click-through websites" },
  { ext: "link", price: 1039, category: "Budget", description: "Link sharing platforms" },
  { ext: "community", price: 1169, category: "Budget", description: "Online communities" }
];

// Enhanced search endpoint with pricing and categories
app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  const category = req.query.category?.trim();
  const sortBy = req.query.sort?.trim();
  
  if (!keyword) {
    return res.json({ 
      error: "No keyword provided",
      message: "Please provide a domain keyword to search"
    });
  }

  let results = extensions.map(ext => ({
    domain: `${keyword}.${ext.ext}`,
    extension: ext.ext,
    price: ext.price,
    category: ext.category,
    description: ext.description,
    status: "Available ✅",
    priceText: `KSH ${ext.price}/year`,
    savings: ext.category === "Budget" ? `Save KSH ${(1690 - ext.price)}` : null
  }));

  // Filter by category if specified
  if (category && category !== "All") {
    results = results.filter(result => result.category === category);
  }

  // Sort results
  if (sortBy) {
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "extension":
        results.sort((a, b) => a.extension.localeCompare(b.extension));
        break;
      case "category":
        results.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }
  } else {
    // Default sort by price (low to high)
    results.sort((a, b) => a.price - b.price);
  }

  const response = {
    keyword,
    totalResults: results.length,
    categories: ["All", "Premium", "Standard", "Budget", "Tech", "Business", "Country"],
    priceRange: {
      min: Math.min(...results.map(r => r.price)),
      max: Math.max(...results.map(r => r.price))
    },
    results
  };

  res.json(response);
});

// Get pricing categories
app.get("/categories", (req, res) => {
  const categories = [
    {
      name: "Premium",
      description: "Most popular and trusted extensions",
      priceRange: "KSH 1,429 - KSH 11,699",
      count: extensions.filter(e => e.category === "Premium").length
    },
    {
      name: "Standard", 
      description: "Professional extensions with good recognition",
      priceRange: "KSH 1,429 - KSH 1,949",
      count: extensions.filter(e => e.category === "Standard").length
    },
    {
      name: "Budget",
      description: "Affordable options for personal projects", 
      priceRange: "KSH 779 - KSH 1,299",
      count: extensions.filter(e => e.category === "Budget").length
    },
    {
      name: "Tech",
      description: "Modern extensions for tech companies",
      priceRange: "KSH 1,949 - KSH 3,249", 
      count: extensions.filter(e => e.category === "Tech").length
    },
    {
      name: "Business",
      description: "Professional business-focused extensions",
      priceRange: "KSH 1,819 - KSH 2,599",
      count: extensions.filter(e => e.category === "Business").length
    },
    {
      name: "Country",
      description: "Country-specific domain extensions",
      priceRange: "KSH 1,039 - KSH 2,079",
      count: extensions.filter(e => e.category === "Country").length
    }
  ];
  
  res.json({ categories });
});

// Get extension details
app.get("/extension/:ext", (req, res) => {
  const ext = req.params.ext;
  const extension = extensions.find(e => e.ext === ext);
  
  if (!extension) {
    return res.status(404).json({ 
      error: "Extension not found",
      message: `Domain extension .${ext} is not in our database`
    });
  }
  
  res.json({
    extension: extension.ext,
    price: extension.price,
    category: extension.category,
    description: extension.description,
    priceText: `KSH ${extension.price}/year`,
    available: true
  });
});

// Main route
app.get("/", (req, res) => {
  const stats = {
    totalExtensions: extensions.length,
    categories: 6,
    priceRange: {
      min: Math.min(...extensions.map(e => e.price)),
      max: Math.max(...extensions.map(e => e.price))
    }
  };
  
  res.send(`
    <h1>🌐 Advanced Domain Search API</h1>
    <p><strong>✅ Enhanced with individual pricing for ${stats.totalExtensions}+ TLDs</strong></p>
    
    <h3>📊 API Statistics:</h3>
    <ul>
      <li>Total Extensions: ${stats.totalExtensions}</li>
      <li>Categories: ${stats.categories}</li>
      <li>Price Range: KSH ${stats.priceRange.min} - KSH ${stats.priceRange.max}</li>
    </ul>
    
    <h3>🔍 API Endpoints:</h3>
    <ul>
      <li><code>GET /search?keyword=example&category=Budget&sort=price-low</code> - Search domains with pricing</li>
      <li><code>GET /categories</code> - Get all pricing categories</li>
      <li><code>GET /extension/com</code> - Get specific extension details</li>
    </ul>
    
    <h3>💰 Pricing Categories:</h3>
    <ul>
      <li><strong>Premium (KSH 1,429-11,699):</strong> .com, .net, .org, .io, .ai</li>
      <li><strong>Standard (KSH 1,429-1,949):</strong> .info, .biz, .pro, .name</li>
      <li><strong>Budget (KSH 779-1,299):</strong> .xyz, .online, .site, .club</li>
      <li><strong>Tech (KSH 1,949-3,249):</strong> .tech, .dev, .app, .cloud</li>
      <li><strong>Business (KSH 1,819-2,599):</strong> .business, .company, .inc</li>
      <li><strong>Country (KSH 1,039-2,079):</strong> .us, .uk, .ca, .de, .fr</li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`🚀 Advanced Domain API running on port ${port}`);
  console.log(`📊 Loaded ${extensions.length} domain extensions with individual pricing`);
  console.log(`💰 Price range: KSH ${Math.min(...extensions.map(e => e.price))} - KSH ${Math.max(...extensions.map(e => e.price))}`);
});
