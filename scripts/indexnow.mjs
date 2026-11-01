// Meldet alle URLs aus der Live-Sitemap per IndexNow an Bing (und damit an ChatGPT-Suche und Copilot)
// sowie an die anderen IndexNow-Suchmaschinen.
// Aufruf nach einem Deployment: npm run indexnow

const SITE_URL = "https://pottendorf.skinlux.at";
const KEY = "e92e7fa3c248732c5d2910aaa6b4d06a"; // Schlüsseldatei: public/<KEY>.txt

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((res) => {
    if (!res.ok) throw new Error(`Sitemap nicht erreichbar: ${res.status}`);
    return res.text();
});

const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urlList.length === 0) throw new Error("Keine URLs in der Sitemap gefunden");

const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: KEY,
        keyLocation: `${SITE_URL}/${KEY}.txt`,
        urlList,
    }),
});

console.log(`IndexNow: ${urlList.length} URLs gemeldet → HTTP ${res.status}`);
if (res.status >= 400) {
    console.error(await res.text());
    process.exit(1);
}
