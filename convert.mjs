import fs from 'fs';

try {
  const text = fs.readFileSync('src/lib/tuvi_knowledge_mini.txt', 'utf8');
  // Escape backticks and dollar signs for TS template literal
  const escapedText = text.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const tsContent = `export const tuviKnowledgeMini = \`${escapedText}\`;\n`;
  fs.writeFileSync('src/lib/tuviKnowledgeMini.ts', tsContent, 'utf8');
  console.log("Successfully created src/lib/tuviKnowledgeMini.ts");
} catch (e) {
  console.error("Error writing TS file:", e);
}
