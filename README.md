## Wedding invitation microsite

Single-page, minimalist wedding invitation built with **Next.js App Router + Tailwind CSS** (soft pastel palette, cinematic hero, scroll reveals, gallery lightbox, and RSVP).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Add your invitation images

Place your images in:

- `public/invites/first.jpeg`
- `public/invites/2nd.jpeg`
- `public/invites/3rd.jpeg`
- `public/invites/4th.jpeg`

These are used by the Hero background and the Gallery.

## RSVP API

- **Endpoint**: `POST /api/rsvp`
- **Payload**: `{ name, attendance, guests, message }`
- **Storage**: forwarded to **Google Apps Script** (which appends to a Google Sheet).

### Configure Google Apps Script (Google Sheet backend)

1. Create a Google Sheet (example columns):

   `timestamp | name | attendance | guests | message`

2. In the sheet: **Extensions → Apps Script**
3. Paste this script:

```js
// Apps Script (Code.gs)
const SHEET_NAME = "Sheet1"; // change if needed

function doPost(e) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents || "{}");

  const timestamp = new Date();
  const name = data.name || "";
  const attendance = data.attendance || "";
  const guests = Number(data.guests || 0);
  const message = data.message || "";

  sheet.appendRow([timestamp, name, attendance, guests, message]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. **Deploy → New deployment**
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the **Web app URL**

### Configure your Next.js environment variable

Create `.env.local`:

```bash
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/XXXX/exec"
```

Deploying on Vercel: add the same env var in Project Settings → Environment Variables.

## Alternative: Submit directly to Google Forms (no backend)

This project’s RSVP form can submit **directly to Google Forms** using a prefill link to extract field IDs (`entry.xxxxx`).

### 1) Get the field IDs

In Google Forms:

- Click **⋮ → Get pre-filled link**
- Fill example values and click **Get link**
- Extract the `entry.xxxxx` keys from the URL

Example:

`...&entry.111111=Test+Name&entry.222222=test@email.com&entry.333333=Yes`

### 2) Set env vars

Create `.env.local`:

```bash
# Your Google Forms POST endpoint
NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/FORM_ID/formResponse"

# Field entry IDs (use the exact entry.xxxxx from the prefill URL)
NEXT_PUBLIC_GOOGLE_FORM_FIELD_NAME="entry.111111"
NEXT_PUBLIC_GOOGLE_FORM_FIELD_EMAIL="entry.222222"
NEXT_PUBLIC_GOOGLE_FORM_FIELD_ATTENDANCE="entry.333333"

# Required for your current form (based on the questions shown)
NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_NAME="entry.444444"
NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_CONTACT="entry.555555"
NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_ROLE="entry.666666"
NEXT_PUBLIC_GOOGLE_FORM_FIELD_EXCITEMENT="entry.777777"

# Optional (only if your form has a message field)
NEXT_PUBLIC_GOOGLE_FORM_FIELD_MESSAGE="entry.888888"
```

### 3) Important notes

- The browser request uses `mode: "no-cors"`, so **you will not receive a readable response**.
- Treat “no crash” as success (and verify in the Form responses / linked Sheet).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
