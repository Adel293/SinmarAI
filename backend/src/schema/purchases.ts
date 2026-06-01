export const purchasesSchema = `
Tables:

UPurch = Purchase Header
DPurch = Purchase Details

==================================================
UPurch Columns
==================================================

Acc_Des	اسم المورد
Doc_Tot	اجمالي الفاتوره قبل الضريبه
Doc_Paid	اجمالي المدفوع من الفاتوره
Doc_Net	اجمالي المتبقي من الفاتوره
AutoPaid	اجمالي المدفوع
VAT	اجمالي الضريبه بالريال
Total_WVAT	اجمالي الفاتوره بعد الضريبه
SupVatNo	الرقم الضريبي للمورد 
Cust_Num	رقم المورد
SalesmanCode	رقم مندوب المبيعات
Status	حاله الفاتوره اذا كانت مفتوحه قابله للتعديل = 0 واذا كانت مقفوله = 1
Vouch_No	رقم القيد ف برنامج المحاسبه اذا كان برنامج المبيعات مربوط ببرنامج الحسابات
Printed	عدد مرات الطباعه
ApplyVat	اذا كانت الضريبه مطبقه = 1 واذا كانت فاتوره خارجيه غير مطبق ضريبه = 0
VatPer	قيمه الضريب 15 ف الميه
UserID	اسم المستخدم الذي قام بادخال الفاتوره


==================================================
DPurch Columns
==================================================

Doc_Num=	رقم السند او الفاتوره
Doc_Kind=	نوع السند اذا اجل = 1 واذا نقدي = 
Doc_Ser=	ترتيب الصنف او السطر ف الفاتوره
Part_Cod=	رقم او كود الصنف
Orderno=	رقم الطلبيه اذا كانت الفاتوره مرتبطه بالطلبيات
StoreNo=	رقم المستوده والافتراضي 1
Quantity=	كميه الصنف ف الفاتوره
ret_qty=	كميه الصنف المردود او المرتجع من الفاتوره
Cost=	تكلفه الصنف
Total=	اجمالي تكلفه الصنف
VATPer=	قيمه الضريبه ثابته 15 ف الميه
VAT=	قيمه الضريبه بالريال للصنف
Total_WVAT=	اجمالي الصنف مع الضريبه
SalePrice=	سعر البيع المدخل من المسخدم اثناء ادخال فاتوره المشتريات
Part_code_name=	اسم الصنف
Loc=	موقع الصنف


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