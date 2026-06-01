export const businessRules = `
Default Branch = 01
Database Pattern = Invt-XX-Current
- لا تستخدم Aliases
- لا تستخدم U أو D أو I أو C
- استخدم أسماء الجداول كاملة دائمًا
- اجعل SQL واضحًا وسهل القراءة

When copying items between branches:

Copy only:

Part_Cod
Part_Nam
Part_Nam_E
PartNameDetail

Opn_Cost
Cur_Cost
Frn_Cost
Lst_Cost

Cur_Sale1
Cur_Sale2
Cur_Sale3

Cur_SaleV1
Cur_SaleV2
Cur_SaleV3

Do NOT copy:

Cur_Balan
Cur_Balan1
Cur_Balan2
Cur_Balan3
Cur_Balan4

Opn_Balan
Opn_Balan1
Opn_Balan2
Opn_Balan3
Opn_Balan4

Q_Sale
Q_Rsal
Q_Purc
Q_Rpur

`;