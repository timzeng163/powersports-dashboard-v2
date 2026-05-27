const fs = require("fs")
const { crawlPolaris } = require("./crawler/polaris")
const { crawlCanAm } = require("./crawler/canam")

function normalize(item) {
  return {
    id: `${item.brand}-${item.name}-${item.modelYear}`,
    brand: item.brand,
    model: item.name,
    year: item.modelYear,
    source: item.sourceUrl,
    category: "off-road"
  }
}

async function run() {
  console.log("crawler started")

  const polaris = await crawlPolaris()
  const canam = await crawlCanAm()

  console.log("raw polaris:", polaris)
  console.log("raw canam:", canam)

  const all = [...polaris, ...canam].map(normalize)

  console.log("normalized:", all)

  const comparison = {}

  for (const item of all) {
    const key = item.model
    if (!comparison[key]) comparison[key] = {}
    if (!comparison[key][item.brand]) comparison[key][item.brand] = []
    comparison[key][item.brand].push(item)
  }

  fs.writeFileSync(
    "vehicles.json",
    JSON.stringify(comparison, null, 2)
  )

  console.log("done (comparison mode)")
}

run()
