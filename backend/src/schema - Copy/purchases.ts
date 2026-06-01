export const purchasesSchema = `
Tables:

UPurch = Purchase Header
DPurch = Purchase Details

==================================================
UPurch Columns
==================================================

Doc_Num      = رقم فاتورة الشراء
Doc_Kind     = نوع السند

Cust_Num     = رقم المورد
Acc_Des      = اسم المورد

Doc_Tot      = إجمالي الفاتورة قبل الضريبة

VAT          = قيمة الضريبة

Total_WVAT   = إجمالي الفاتورة شامل الضريبة

Doc_Paid     = المدفوع

Doc_Net      = المتبقي

AutoPaid     = هل الفاتورة مسددة بالكامل

Status       = حالة الفاتورة

Vouch_No     = رقم القيد المحاسبي

ApplyVat     = هل الضريبة مطبقة

VatPer       = نسبة الضريبة

SupVatNo     = الرقم الضريبي للمورد

UserID       = المستخدم

==================================================
DPurch Columns
==================================================

Doc_Num      = رقم الفاتورة

Doc_Kind     = نوع السند

Part_Cod     = كود الصنف

StoreNo      = رقم المستودع

Quantity     = الكمية

Cost         = التكلفة

SalePrice    = سعر البيع

VAT          = قيمة الضريبة

VATPer       = نسبة الضريبة

Total_WVAT   = الإجمالي شامل الضريبة

==================================================
Relations
==================================================

UPurch.Doc_Num = DPurch.Doc_Num

AND

UPurch.Doc_Kind = DPurch.Doc_Kind

==================================================
Rules
==================================================

- استخدم Cust_Num للمورد
- استخدم Acc_Des لاسم المورد
- استخدم ApplyVat لمعرفة هل الضريبة مطبقة
- استخدم AutoPaid لمعرفة هل الفاتورة مسددة بالكامل
- لا تخترع أعمدة
- لا تخترع جداول
- استخدم SQL Server Syntax فقط

==================================================
Examples
==================================================

Question:
هات فواتير الشراء التي الضريبة غير مطبقة

SQL:
SELECT *
FROM UPurch
WHERE ApplyVat = 0;

Question:
هات فواتير الشراء غير المسددة

SQL:
SELECT *
FROM UPurch
WHERE AutoPaid = 0;

Question:
هات الفواتير الموجودة في UPurch وغير الموجودة في DPurch

SQL:
SELECT U.*
FROM UPurch U
LEFT JOIN DPurch D
    ON U.Doc_Num = D.Doc_Num
   AND U.Doc_Kind = D.Doc_Kind
WHERE D.Doc_Num IS NULL;

Question:
هات تفاصيل فاتورة شراء رقم 100

SQL:
SELECT *
FROM DPurch
WHERE Doc_Num = 100;

Question:
هات مشتريات المورد رقم 500

SQL:
SELECT *
FROM UPurch
WHERE Cust_Num = 500;

Question:
هات الأصناف الموجودة في فاتورة شراء رقم 100

SQL:
SELECT
    Part_Cod,
    Quantity,
    Cost,
    SalePrice
FROM DPurch
WHERE Doc_Num = 100;

`;