export const cusSupSchema = `
Table:

CusSup

==================================================
Description
==================================================

Contains:

- Customers
- Suppliers

==================================================
Columns
==================================================

Code          = رقم العميل أو المورد (فريد وغير مكرر)

NameA         = الاسم العربي

NameE         = الاسم الإنجليزي

Type

0 = عميل
1 = مورد
2 = أخرى

Acc_num       = رقم الحساب المحاسبي

Kind

0 = نقدي
1 = آجل

Lmt           = الحد الائتماني

Discount      = نسبة الخصم

SalesmanCode  = المندوب

Balance       = الرصيد الحالي

Opn_Balan     = الرصيد الافتتاحي

Status

0 = فعال
1 = غير فعال

PriceNo       = سعر البيع

==================================================
Rules
==================================================

- العملاء Type = 0

- الموردين Type = 1

- استخدم Code كمفتاح أساسي

- لا تستخدم Cust_Num

- استخدم NameA للاسم العربي

- لا تخترع أعمدة

- لا تخترع جداول

==================================================
Examples
==================================================

Question:
هات جميع العملاء

SQL:

SELECT
    Code,
    NameA,
    Balance
FROM CusSup
WHERE Type = 0;

Question:
هات جميع الموردين

SQL:

SELECT
    Code,
    NameA,
    Balance
FROM CusSup
WHERE Type = 1;

Question:
هات العميل رقم 100

SQL:

SELECT *
FROM CusSup
WHERE Code = 100;

Question:
هات العملاء غير الفعالين

SQL:

SELECT
    Code,
    NameA
FROM CusSup
WHERE Status = 1;

Question:
هات العملاء الآجل

SQL:

SELECT
    Code,
    NameA
FROM CusSup
WHERE Kind = 1;

`;