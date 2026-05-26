"use client";

import { useMemo, useState } from "react";

type Language = "en" | "zh";
type Category = "ATV" | "UTV" | "SSV";

type Product = {
  id: number;
  brand: "Polaris" | "Can-Am" | "Honda" | "Kawasaki" | "CFMOTO" | "Segway";
  model: string;
  category: Category;
  segment: string;
  price: number;
  power: number;
  displacement: number;
  towing: number;
  payload: number;
  marketScore: number;
  launchYear: number;
  region: string;
};

const brands = ["Polaris", "Can-Am", "Honda", "Kawasaki", "CFMOTO", "Segway"] as const;
const categories: Category[] = ["ATV", "UTV", "SSV"];

const products: Product[] = [
  { id: 1, brand: "Polaris", model: "RZR Pro R Ultimate", category: "SSV", segment: "Performance", price: 39999, power: 225, displacement: 1997, towing: 740, payload: 740, marketScore: 92, launchYear: 2025, region: "North America" },
  { id: 2, brand: "Polaris", model: "Ranger XP 1000 Premium", category: "UTV", segment: "Utility", price: 20999, power: 82, displacement: 999, towing: 2500, payload: 1000, marketScore: 88, launchYear: 2025, region: "North America" },
  { id: 3, brand: "Polaris", model: "Sportsman 850 Ultimate Trail", category: "ATV", segment: "Trail", price: 13999, power: 78, displacement: 850, towing: 1500, payload: 575, marketScore: 84, launchYear: 2025, region: "Global" },
  { id: 4, brand: "Can-Am", model: "Maverick R X rs", category: "SSV", segment: "Performance", price: 44999, power: 240, displacement: 999, towing: 1500, payload: 740, marketScore: 94, launchYear: 2025, region: "North America" },
  { id: 5, brand: "Can-Am", model: "Defender Limited HD10", category: "UTV", segment: "Utility", price: 31999, power: 82, displacement: 976, towing: 2500, payload: 1700, marketScore: 89, launchYear: 2025, region: "Global" },
  { id: 6, brand: "Can-Am", model: "Outlander X mr 1000R", category: "ATV", segment: "Mud", price: 17499, power: 91, displacement: 976, towing: 1650, payload: 590, marketScore: 87, launchYear: 2025, region: "Global" },
  { id: 7, brand: "Honda", model: "Pioneer 1000-5 Trail", category: "UTV", segment: "Recreation", price: 24199, power: 72, displacement: 999, towing: 2500, payload: 1000, marketScore: 82, launchYear: 2025, region: "North America" },
  { id: 8, brand: "Honda", model: "FourTrax Foreman Rubicon", category: "ATV", segment: "Utility", price: 9899, power: 48, displacement: 518, towing: 1322, payload: 485, marketScore: 79, launchYear: 2025, region: "Global" },
  { id: 9, brand: "Kawasaki", model: "Teryx KRX 1000 eS", category: "SSV", segment: "Trail", price: 28199, power: 112, displacement: 999, towing: 1300, payload: 781, marketScore: 80, launchYear: 2025, region: "North America" },
  { id: 10, brand: "Kawasaki", model: "MULE PRO-FXT 1000 LE", category: "UTV", segment: "Utility", price: 19999, power: 66, displacement: 999, towing: 2000, payload: 1616, marketScore: 81, launchYear: 2025, region: "Global" },
  { id: 11, brand: "CFMOTO", model: "ZFORCE 950 Sport", category: "SSV", segment: "Value Performance", price: 14999, power: 85, displacement: 963, towing: 1500, payload: 683, marketScore: 76, launchYear: 2025, region: "Global" },
  { id: 12, brand: "CFMOTO", model: "UFORCE 1000 XL", category: "UTV", segment: "Value Utility", price: 14999, power: 79, displacement: 963, towing: 2000, payload: 1000, marketScore: 78, launchYear: 2025, region: "Global" },
  { id: 13, brand: "CFMOTO", model: "CFORCE 1000 Overland", category: "ATV", segment: "Adventure", price: 10699, power: 75, displacement: 963, towing: 1000, payload: 350, marketScore: 75, launchYear: 2025, region: "Global" },
  { id: 14, brand: "Segway", model: "Super Villain SX20T", category: "SSV", segment: "Performance", price: 29999, power: 235, displacement: 1960, towing: 1500, payload: 770, marketScore: 77, launchYear: 2025, region: "Global" },
  { id: 15, brand: "Segway", model: "Fugleman UT10 Crew", category: "UTV", segment: "Utility", price: 17699, power: 105, displacement: 1000, towing: 2500, payload: 1500, marketScore: 73, launchYear: 2025, region: "Global" }
];

const copy = {
  en: {
    title: "Powersports Competitive Dashboard",
    subtitle: "ATV, UTV and SSV market intelligence across six core brands",
    search: "Search model, brand, segment",
    all: "All",
    brand: "Brand",
    category: "Category",
    compare: "Compare",
    clear: "Clear",
    products: "Products",
    avgPrice: "Avg. MSRP",
    avgPower: "Avg. Power",
    topScore: "Top Score",
    pricePower: "Price vs Power",
    brandScore: "Brand Score",
    portfolio: "Portfolio Mix",
    model: "Model",
    price: "MSRP",
    power: "Power",
    towing: "Towing",
    payload: "Payload",
    score: "Score",
    year: "Year",
    selected: "selected",
    noData: "No matching products"
  },
  zh: {
    title: "Powersports 竞品仪表盘",
    subtitle: "覆盖六大品牌的 ATV、UTV、SSV 市场竞争情报",
    search: "搜索车型、品牌、细分市场",
    all: "全部",
    brand: "品牌",
    category: "分类",
    compare: "对比",
    clear: "清空",
    products: "车型数",
    avgPrice: "平均 MSRP",
    avgPower: "平均马力",
    topScore: "最高评分",
    pricePower: "价格 / 动力",
    brandScore: "品牌评分",
    portfolio: "产品组合",
    model: "车型",
    price: "MSRP",
    power: "马力",
    towing: "拖拽",
    payload: "载重",
    score: "评分",
    year: "年份",
    selected: "已选",
    noData: "没有匹配车型"
  }
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function avg(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

export default function Page() {
  const [language, setLanguage] = useState<Language>("zh");
  const [brandFilter, setBrandFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [compareIds, setCompareIds] = useState<number[]>([1, 4, 14]);
  const t = copy[language];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const brandMatch = brandFilter === "All" || product.brand === brandFilter;
      const categoryMatch = categoryFilter === "All" || product.category === categoryFilter;
      const searchMatch =
        !term ||
        [product.brand, product.model, product.category, product.segment, product.region]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return brandMatch && categoryMatch && searchMatch;
    });
  }, [brandFilter, categoryFilter, query]);

  const compared = products.filter((product) => compareIds.includes(product.id));
  const kpis = [
    { label: t.products, value: filtered.length.toString(), note: `${products.length} total` },
    { label: t.avgPrice, value: formatCurrency(avg(filtered.map((item) => item.price))), note: "filtered set" },
    { label: t.avgPower, value: `${Math.round(avg(filtered.map((item) => item.power)))} hp`, note: "engine output" },
    { label: t.topScore, value: `${Math.max(0, ...filtered.map((item) => item.marketScore))}`, note: "competitive index" }
  ];

  const brandScores = brands.map((brand) => ({
    brand,
    score: Math.round(avg(filtered.filter((item) => item.brand === brand).map((item) => item.marketScore)))
  }));

  const categoryMix = categories.map((category) => ({
    category,
    count: filtered.filter((item) => item.category === category).length
  }));

  function toggleCompare(id: number) {
    setCompareIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      return current.length >= 4 ? [...current.slice(1), id] : [...current, id];
    });
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-steel">Competitive Intel</p>
              <h1 className="mt-2 text-xl font-bold leading-tight">{t.title}</h1>
            </div>
            <button
              className="h-9 rounded-md border border-slate-300 px-3 text-sm font-semibold text-ink hover:bg-mist"
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            >
              {language === "zh" ? "EN" : "中文"}
            </button>
          </div>

          <label className="block text-sm font-semibold text-steel" htmlFor="search">
            {t.search}
          </label>
          <input
            id="search"
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search}
          />

          <div className="mt-6">
            <p className="text-sm font-semibold text-steel">{t.brand}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {["All", ...brands].map((brand) => (
                <button
                  key={brand}
                  className={`h-10 rounded-md border px-2 text-sm font-semibold ${
                    brandFilter === brand ? "border-ink bg-ink text-white" : "border-slate-300 bg-white hover:bg-mist"
                  }`}
                  onClick={() => setBrandFilter(brand)}
                >
                  {brand === "All" ? t.all : brand}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-steel">{t.category}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["All", ...categories].map((category) => (
                <button
                  key={category}
                  className={`h-10 rounded-md border px-2 text-sm font-semibold ${
                    categoryFilter === category ? "border-ocean bg-ocean text-white" : "border-slate-300 bg-white hover:bg-mist"
                  }`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category === "All" ? t.all : category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-mist p-3">
            <div className="flex items-center justify-between">
              <p className="font-bold">{t.compare}</p>
              <button className="text-sm font-semibold text-ocean" onClick={() => setCompareIds([])}>
                {t.clear}
              </button>
            </div>
            <p className="mt-1 text-sm text-steel">
              {compareIds.length} {t.selected}
            </p>
            <div className="mt-3 space-y-2">
              {compared.map((item) => (
                <div key={item.id} className="rounded-md bg-white px-3 py-2 text-sm font-semibold">
                  {item.brand} · {item.model}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="space-y-5">
          <header className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-panel">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">MY2025 Powersports</p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">{t.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-steel">{t.subtitle}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-steel">
                {categories.map((category) => (
                  <div key={category} className="rounded-md border border-slate-200 px-4 py-3">
                    <span className="block text-lg text-ink">{categoryMix.find((item) => item.category === category)?.count ?? 0}</span>
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </header>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
                <p className="text-sm font-semibold text-steel">{kpi.label}</p>
                <p className="mt-2 text-2xl font-bold">{kpi.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{kpi.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold">{t.pricePower}</h3>
                <span className="text-sm font-semibold text-steel">{filtered.length} items</span>
              </div>
              <svg className="h-[300px] w-full" viewBox="0 0 760 300" role="img" aria-label={t.pricePower}>
                <line x1="52" y1="246" x2="728" y2="246" stroke="#d4dde3" />
                <line x1="52" y1="24" x2="52" y2="246" stroke="#d4dde3" />
                {filtered.map((item) => {
                  const x = 52 + (item.price / 46000) * 660;
                  const y = 246 - (item.power / 250) * 210;
                  const color = item.category === "ATV" ? "#2d6a4f" : item.category === "UTV" ? "#287c9f" : "#dd5c35";
                  return (
                    <g key={item.id}>
                      <circle cx={x} cy={y} r={compareIds.includes(item.id) ? 9 : 6} fill={color} opacity="0.9" />
                      <title>{`${item.brand} ${item.model}: ${formatCurrency(item.price)}, ${item.power} hp`}</title>
                    </g>
                  );
                })}
                <text x="52" y="282" fill="#5f6f7a" fontSize="12">MSRP</text>
                <text x="8" y="30" fill="#5f6f7a" fontSize="12">HP</text>
              </svg>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <h3 className="font-bold">{t.brandScore}</h3>
              <div className="mt-5 space-y-4">
                {brandScores.map((item) => (
                  <div key={item.brand}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">{item.brand}</span>
                      <span className="text-steel">{item.score || 0}</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-mist">
                      <div
                        className="h-3 rounded-full bg-forest"
                        style={{ width: `${Math.max(0, item.score)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h3 className="font-bold">{t.portfolio}</h3>
              <span className="text-sm font-semibold text-steel">{t.compare}: {compareIds.length}/4</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                <thead className="bg-mist text-xs uppercase tracking-[0.12em] text-steel">
                  <tr>
                    <th className="px-4 py-3">{t.compare}</th>
                    <th className="px-4 py-3">{t.brand}</th>
                    <th className="px-4 py-3">{t.model}</th>
                    <th className="px-4 py-3">{t.category}</th>
                    <th className="px-4 py-3">{t.price}</th>
                    <th className="px-4 py-3">{t.power}</th>
                    <th className="px-4 py-3">{t.towing}</th>
                    <th className="px-4 py-3">{t.payload}</th>
                    <th className="px-4 py-3">{t.score}</th>
                    <th className="px-4 py-3">{t.year}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <input
                          aria-label={`${t.compare} ${item.model}`}
                          checked={compareIds.includes(item.id)}
                          type="checkbox"
                          onChange={() => toggleCompare(item.id)}
                          className="h-4 w-4 accent-ocean"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold">{item.brand}</td>
                      <td className="px-4 py-3">{item.model}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-mist px-2 py-1 text-xs font-bold">{item.category}</span>
                      </td>
                      <td className="px-4 py-3">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-3">{item.power} hp</td>
                      <td className="px-4 py-3">{item.towing} lb</td>
                      <td className="px-4 py-3">{item.payload} lb</td>
                      <td className="px-4 py-3 font-bold text-forest">{item.marketScore}</td>
                      <td className="px-4 py-3">{item.launchYear}</td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td className="px-4 py-10 text-center font-semibold text-steel" colSpan={10}>
                        {t.noData}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {compared.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <h3 className="font-bold">{t.compare}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {compared.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-steel">{item.brand} · {item.category}</p>
                    <h4 className="mt-2 min-h-12 text-base font-bold">{item.model}</h4>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <span className="text-steel">{t.price}</span><strong>{formatCurrency(item.price)}</strong>
                      <span className="text-steel">{t.power}</span><strong>{item.power} hp</strong>
                      <span className="text-steel">{t.towing}</span><strong>{item.towing} lb</strong>
                      <span className="text-steel">{t.score}</span><strong>{item.marketScore}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
