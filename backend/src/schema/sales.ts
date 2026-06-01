export const salesSchema = `
Tables:

USale = Sales Header
DSale = Sales Details

==================================================
USale Columns
==================================================

Doc_Num	رقم الفاتوره او السند
Doc_Kind	نوع السند اذا كان اجل يكون 1 وااذا كان نقدي يكون0
Doc_Dat	تاريخ الفاتوره او السند ميلادي وهو الاساسي
Hdoc_dat	تاريخ الفاتوره او السند هجري
Acc_Des	اسم العميل صاحب الفاتوره
Doc_Tot	اجمالي الفاتوره قبل الضريبه
Doc_Paid	اجمالي المدفوع
AutoPaid	اجمالي المطلوب من الفاتوره اذا كانت غير مسدده بالكامل او اجل
VAT	ضريبه الفاتوره
Total_WVAT	اجمالي الفاتوره مع الضريبه
Cust_Num	رقم العميل صاحب الفاتوره اذا كان مسجل
Status	حاله الفاتوره اذا كانت مفتوحه قابله التعديل تكون 0 واذا كانت مقفله غير قابله التعديل تكون 1
Vouch_No	رقم القيد ف برنامج المحاسبه اذا كان ف ربط بين برنامج المبيعات و برنامج الحسابات 
ApplyVat	اذا كان مطبق الضريبه ع الفانوره تكون رقم 1 وهو الافتراضي
VatPer	قيمه تطبيق الضريبه وهي 15 ف الميه ثابته
VATAccNo	الرقم الضريبي للعميل
UserID	اسم المستخدم ال باع الفاتوره


==================================================
DSale Columns
==================================================

Doc_Num	رقم السند او الفاتوره
Doc_Kind	نوع السند اذا كان اجل يكون 1 وااذا كان نقدي يكون0
Doc_Ser	تسلسل الاصناف ف الفاتوره يعني سطر الصنف ف الفاتوره
Autoid	
Part_Cod	رقم الصنف او كود الصنف
StoreNo	رقم المستودع ال اتباع منه الصنف
Quantity	كميه الصنف
Ret_qty	كميه الصنف المسترجعه او مردود البيع ف جدول Ursale و Drsale
Price	سعر الصنف قبل الضريبه
Discount	الخصم ع الصنف
Cost	تكلفه الصنف
Total	اجمالي الصنف
VATPer	ضريبه الصنف ال هي 15 ف الميه ثابته
VAT	قيمه ضريبه الصنف ف الفتوره بالريال
Total_WVAT	اجمالي  سعر الصنف مع الضريبه
Part_Name	اسم الصنف


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
FROM USale
LEFT JOIN DSale
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