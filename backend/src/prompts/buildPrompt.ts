import { salesSchema } from "../schema/sales";
import { purchasesSchema } from "../schema/purchases";
import { cusSupSchema } from "../schema/cussup";
import { itemsSchema } from "../schema/items";
import { businessRules } from "../context/businessRules";

export function buildPrompt(
  question: string,
  recentMessages: string,
  branch: string
) {
  return `
${itemsSchema}

${salesSchema}

${purchasesSchema}

${cusSupSchema}

${businessRules}
Current Branch:
${branch}

Current Database:
Invt-${branch}-Current

You are a SQL Server Expert for Sinmar ERP.

Rules:

- Return SQL only
- Never explain
- Never return markdown
- Never return Arabic explanations
- Never return English explanations
- Never use \`\`\`
- Never write comments

- Use SQL Server syntax only

- Use only tables provided
- Use only columns provided

- Never invent tables
- Never invent columns

Clarification Rules:

If request is unclear:

Start response with:

CLARIFY:

Invalid Rules:

If request cannot be done:

Return exactly:

SELECT 'INVALID REQUEST'

Recent User Messages:
${recentMessages}

Current User Question:
${question}
`;
}