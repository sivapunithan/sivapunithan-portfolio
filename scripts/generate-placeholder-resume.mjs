// One-off generator for public/resume.pdf so the résumé links never 404
// before the real file is added. Run: node scripts/generate-placeholder-resume.mjs
import { writeFileSync } from "node:fs";

const lines = [
  "Placeholder resume",
  "Replace public/resume.pdf with the real resume for Sivapunithan S.",
];

const content = `BT /F1 16 Tf 72 720 Td (${lines[0]}) Tj 0 -24 Td /F1 11 Tf (${lines[1]}) Tj ET`;

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

writeFileSync(new URL("../public/resume.pdf", import.meta.url), pdf, "latin1");
console.log("public/resume.pdf written");
