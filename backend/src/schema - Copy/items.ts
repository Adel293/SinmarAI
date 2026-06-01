export const itemsSchema = `
Table: Items

Important Columns:

Part_Cod	كود الصنف او رقم الصنف
Part_Nam	اسم الصنف عربي
Part_Nam_E	اسم الصنف انجليزي
PartNameDetail	اسم الصنف تفصيليا
Cur_Balan	الرصيد الحالي
Cur_Balan1	رصيد الصنف الحالي ف  مستودع 1 وهو الافتراضي
Cur_Balan2	رصيد الصنف الحالي ف  مستودع 2
Cur_Balan3	رصيد الصنف الحالي ف  مستودع 3
Cur_Balan4	رصيد الصنف  الحاليف  مستودع 4
Opn_Balan	الرصيد الافتتاحي للصنف وهو الافتتاحي الافتراضي
Opn_Balan1	الرصيد الافتتاحي للصنف ف مستودع 1
Opn_Balan2	الرصيد الافتتاحي للصنف ف مستودع 2
Opn_Balan3	الرصيد الافتتاحي للصنف ف مستودع 3
Opn_Balan4	الرصيد الافتتاحي للصنف ف مستودع 4
PriceRule	ميزه استخدام قاعده التسعير الجدول العام = 2 و قاعده التسعير المستقل = 1 و الغاء قواعد التسعير = 0
Cur_Sale1	سعر االبيع  1 قبل الضريبة 
Cur_Sale2	سعر االبيع  2 قبل الضريبة 
Cur_Sale3	سعر االبيع  3 قبل الضريبة 
Opn_Cost	التكلفه الافتتاحيه للصنف 
Cur_Cost	التكلفه الحاليه للصنف
Frn_Cost	التكلفه الاجنبيه للصنف
Lst_Cost	التكلفه الاخيره او اخر تكلفه
Cur_SaleV1	سعر االبيع  1 شامل الضريبة 
Cur_SaleV2	سعر االبيع  2 شامل الضريبة 
Cur_SaleV3	سعر االبيع  3 شامل الضريبة 
Model	الموديل
Sizes	الحجم او المقاسات
Location	الموقع 1  وهو الافتراضي
Location2	الموقع 2
Location3	الموقع 3
Location4	الموقع 4
Mark	الماركة
Source	المصدر
Type	النوع
IDC	نسبة الخصم لاسعار الشركات
CompanyPrice1	سعر الشركة 1
CompanyPrice2	سعر الشركة 2
CompanyPrice3	سعر الشركة 3
Comp_cod	رقم الشركة
Q_Sale    إجمالي كمية بيع الصنف الفعلية ولا يحتاج جدول فواتير
Q_Rsal    إجمالي كمية مردود بيع الصنف الفعلية ولا يحتاج جدول فواتير
Q_Purc    إجمالي كمية مشتريات الصنف الفعلية ولا يحتاج جدول فواتير
Q_Rpur    إجمالي كمية مردود مشتريات الصنف الفعلية ولا يحتاج جدول فواتير



Rules:

- استخدم SELECT * في الاستعلامات العامة
- لا تكتب كل الأعمدة يدويًا إلا إذا طلب المستخدم أعمدة محددة
- عند طلب حركة أو بيانات كاملة للصنف استخدم SELECT *
- استخدم Part_Cod و Part_Nam افتراضيًا عند عرض الأصناف
- لا تخترع أعمدة
- لا تخترع جداول
- استخدم SQL Server Syntax فقط
- استخدم Q_Sale عند السؤال عن الأصناف الأكثر مبيعًا
- لا تستخدم أي جدول فواتير أو تفاصيل مبيعات غير موجود في الـ Schema
- Cur_Balan هو الرصيد الافتراضي للصنف
- Cur_Balan1 هو رصيد المستودع 1
- Cur_Balan2 هو رصيد المستودع 2
- Cur_Balan3 هو رصيد المستودع 3
- Cur_Balan4 هو رصيد المستودع 4

- عند السؤال عن الأصناف الراكدة استخدم Q_Sale = 0
- عند السؤال عن الأصناف التي عليها حركة استخدم Q_Sale > 0 OR Q_Purc > 0
- عند السؤال عن الأصناف الأكثر مبيعًا استخدم Q_Sale
- عند السؤال عن الأصناف الأكثر شراءً استخدم Q_Purc

Business Examples
Examples:

Question:
Question:
هات الاصناف اللي عليها حركة

SQL:
SELECT
    Part_Cod,
    Part_Nam,
    Q_Sale,
    Q_Purc
FROM Items
WHERE Q_Sale > 0
   OR Q_Purc > 0;

Question:
هات الاصناف اللي رصيدها اكبر من 100

SQL:
SELECT
    Part_Cod,
    Part_Nam,
    Cur_Balan
FROM Items
WHERE Cur_Balan > 100;
هات الاصناف اللي عليها حركة

SQL:
SELECT
    Part_Cod,
    Part_Nam,
    Q_Sale,
    Q_Purc
FROM Items
WHERE Q_Sale > 0
   OR Q_Purc > 0;

هات الاصناف الاكثر مبيعًا

SQL:
SELECT TOP 10
    Part_Cod,
    Part_Nam,
    Q_Sale
FROM Items
WHERE Q_Sale > 0
ORDER BY Q_Sale DESC;

Question:
هات الاصناف اللي رصيدها اقل من 5

SQL:
SELECT
    Part_Cod,
    Part_Nam,
    Cur_Balan
FROM Items
WHERE Cur_Balan < 5;
`;
