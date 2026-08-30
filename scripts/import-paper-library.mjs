import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const defaultLibrary = path.resolve(
  projectRoot,
  "../..",
  "CAIE_Library_Downloader_v3_XtraPapers/CAIE_Library_Downloader_v3_XtraPapers/library",
);
const libraryRoot = path.resolve(process.argv[2] ?? defaultLibrary);
const outputPath = path.join(projectRoot, "src/data/papers/papers.json");
const manifestPath = path.join(libraryRoot, "papers.json");

const subjects = {
  "9609": { slug: "business-9609" },
  "9618": { slug: "computer-science-9618" },
  "9701": { slug: "chemistry-9701" },
  "9709": { slug: "mathematics-9709" },
};
const sessions = {
  m: { title: "February-March", slug: "march", order: 1 },
  s: { title: "May-June", slug: "may-june", order: 2 },
  w: { title: "October-November", slug: "october-november", order: 3 },
};
const subjectOrder = ["9709", "9618", "9609", "9701"];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return nested.flat();
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const sourceByFilename = new Map(
  manifest
    .filter((item) => item?.filename && item?.source)
    .map((item) => [item.filename, item.source]),
);

const grouped = new Map();
for (const filePath of await walk(libraryRoot)) {
  if (path.extname(filePath).toLowerCase() !== ".pdf") continue;
  const filename = path.basename(filePath);
  const match = /^(\d{4})_([msw])(\d{2})_(qp|ms)_(\d{2})\.pdf$/i.exec(filename);
  if (!match) continue;

  const [, subject, sessionCode, shortYear, type, paper] = match;
  if (!subjects[subject] || !sessions[sessionCode]) continue;
  const year = 2000 + Number(shortYear);
  const session = sessions[sessionCode];
  const fallbackUrl = `https://xtrapapers.co/papers/caie/as-and-a-level/${subjects[subject].slug}/${year}-${session.slug}/${filename}/download`;
  const key = `${subject}:${year}:${sessionCode}:${paper}`;
  const record = grouped.get(key) ?? {
    subject,
    year,
    session: session.title,
    sessionCode,
    sessionOrder: session.order,
    paper,
    qp: null,
    ms: null,
    er: null,
    source: "downloader",
  };
  record[type] = sourceByFilename.get(filename) ?? fallbackUrl;
  grouped.set(key, record);
}

const records = [...grouped.values()]
  .filter((record) => record.qp && record.ms)
  .sort((a, b) =>
    subjectOrder.indexOf(a.subject) - subjectOrder.indexOf(b.subject) ||
    b.year - a.year ||
    b.sessionOrder - a.sessionOrder ||
    Number(a.paper) - Number(b.paper),
  )
  .map((record) => ({
    subject: record.subject,
    year: record.year,
    session: record.session,
    paper: record.paper,
    qp: record.qp,
    ms: record.ms,
    er: record.er,
    source: record.source,
  }));

await writeFile(outputPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
console.log(`Imported ${records.length} complete QP/MS pairs into ${outputPath}`);
