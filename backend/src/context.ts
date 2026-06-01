export const businessRules = `
Sinmar Business Rules

Default Branch:
Invt-01-Current

Database Pattern:
Invt-XX-Current

Header Tables:
USale
UPurch

Detail Tables:
DSale
DPurch

Items Primary Key:
Part_Cod

Customers/Suppliers Primary Key:
Cust_Num

Important Rules:

- U tables contain document headers
- D tables contain document details

- Use only provided schema
- Never invent columns
- Never invent tables

Common Requests:

- Inventory Balance
- Top Selling Items
- Slow Moving Items
- Customer Statements
- Supplier Statements
- Sales Analysis
- Purchase Analysis
- Data Migration
- Data Validation
`;