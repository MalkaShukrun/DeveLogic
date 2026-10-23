# DeveLogic - אתר תדמית

דף נחיתה בעברית (RTL) ל-DeveLogic, בנוי עם Astro, לפי עיצוב ה-Figma Make "Landing Page Design for Dvelogic".
טופס יצירת הקשר שולח מייל באמצעות Resend.

## מבנה

```
src/
  layouts/Layout.astro        # html lang="he" dir="rtl", מטא-תגיות, פונטים Heebo + DM Mono
  components/                 # Hero (כולל ניווט), Services, Engineering, About, Contact, Footer, Icon, Brand
  pages/index.astro           # הדף הראשי (סטטי - SSG)
  pages/api/contact.ts        # POST /api/contact - ולידציה + שליחה ב-Resend
  styles/global.css           # כל העיצוב (CSS רגיל)
render.yaml                   # הגדרות פריסה ב-Render
```

האתר נבנה סטטית (`output: 'static'`); רק נתיב ה-API רץ בשרת (`prerender = false`) דרך מתאם Node.

## הרצה מקומית

דרישות: Node.js 20 ומעלה.

```bash
npm install
cp .env.example .env     # ב-Windows PowerShell: Copy-Item .env.example .env
# ערכו את .env והוסיפו RESEND_API_KEY ו-CONTACT_TO_EMAIL
npm run dev
```

האתר יעלה בכתובת http://localhost:4321

בדיקת build ופרודקשן מקומית:

```bash
npm run build
npm start
```

## משתני סביבה

| משתנה | תיאור |
| --- | --- |
| `RESEND_API_KEY` | מפתח API של Resend |
| `CONTACT_TO_EMAIL` | הכתובת שמקבלת את הפניות מהטופס |
| `CONTACT_FROM_EMAIL` | כתובת השולח (ברירת מחדל: `onboarding@resend.dev`) |

