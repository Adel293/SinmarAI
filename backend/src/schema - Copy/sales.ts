export const salesSchema = `
Tables:

USale = Sales Header
DSale = Sales Details

==================================================
USale Columns
==================================================

Doc_Num      = رقم الفاتورة أو السند
Doc_Kind     = نوع السند
Doc_Dat      = تاريخ الفاتورة
Hdoc_dat     = التاريخ الهجري

Cust_Num     = رقم العميل
Acc_Des      = اسم العميل

Doc_Tot      = إجمالي الفاتورة قبل الضريبة
VAT          = قيمة الضريبة
Total_WVAT   = إجمالي الفاتورة شامل الضريبة

Doc_Paid     = المدفوع
AutoPaid     = هل الفاتورة مسددة بالكامل

Status       = حالة الفاتورة

Vouch_No     = رقم القيد المحاسبي

ApplyVat     = هل الضريبة مطبقة
VatPer       = نسبة الضريبة

VATAccNo     = حساب الضريبة

UserID       = المستخدم

==================================================
DSale Columns
==================================================

Doc_Num      = رقم الفاتورة
Doc_Kind     = نوع السند

Doc_Ser      = تسلسل السطر

Part_Cod     = كود الصنف
Part_Name    = اسم الصنف

StoreNo      = رقم المستودع

Quantity     = الكمية
Ret_qty      = كمية المرتجع

Price        = سعر البيع
Discount     = الخصم

Cost         = التكلفة

Total        = إجمالي السطر

VATPer       = نسبة الضريبة
VAT          = قيمة الضريبة

Total_WVAT   = الإجمالي شامل الضريبة

==================================================
Relations
==================================================

USale.Doc_Num = DSale.Doc_Num

AND

USale.Doc_Kind = DSale.Doc_Kind

==================================================
Rules
==================================================

- استخدم Doc_Num وليس DocNum
- استخدم Cust_Num للعميل
- استخدم Acc_Des لاسم العميل
- استخدم ApplyVat لمعرفة هل الضريبة مطبقة
- استخدم AutoPaid لمعرفة هل الفاتورة مسددة بالكامل
- لا تخترع أعمدة
- لا تخترع جداول
- استخدم SQL Server Syntax فقط

==================================================
Examples
==================================================

Question:
هات فواتير البيع التي الضريبة غير مطبقة

SQL:
SELECT *
FROM USale
WHERE ApplyVat = 0;

Question:
هات فواتير البيع غير المسددة

SQL:
SELECT *
FROM USale
WHERE AutoPaid = 0;

Question:
هات الفواتير الموجودة في USale وغير الموجودة في DSale

SQL:
SELECT U.*
FROM USale U
LEFT JOIN DSale D
    ON U.Doc_Num = D.Doc_Num
   AND U.Doc_Kind = D.Doc_Kind
WHERE D.Doc_Num IS NULL;

Question:
هات تفاصيل فاتورة رقم 100

SQL:
SELECT *
FROM DSale
WHERE Doc_Num = 100;

Question:
هات فواتير العميل رقم 500

SQL:
SELECT *
FROM USale
WHERE Cust_Num = 500;

Question:
هات الأصناف الموجودة في فاتورة رقم 100

SQL:
SELECT
    Part_Cod,
    Part_Name,
    Quantity,
    Price,
    Total
FROM DSale
WHERE Doc_Num = 100;

Question:
هات أعلى 20 فاتورة مبيعات

SQL:
SELECT TOP 20
    Doc_Num,
    Cust_Num,
    Acc_Des,
    Total_WVAT
FROM USale
ORDER BY Total_WVAT DESC;

`;