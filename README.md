# TradePass Academy Website

Official website for TradePass Academy, publisher of premium Red Seal exam prep study guides for Canadian apprentices.

## Structure

```
├── index.html              The complete website (HTML, CSS and JavaScript in one file)
├── assets/
│   ├── logo-shield.png     TradePass Academy shield mark (transparent background)
│   ├── cover-403a.jpg      Red Seal Carpenter 403A book cover
│   └── inside-403a.jpg     Interior spread photo used in the "Inside Every Guide" section
└── README.md
```

## Publish on GitHub Pages

1. Create a new repository, for example `tradepass-academy`.
2. Upload `index.html`, the `assets` folder and this `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch", choose the `main` branch and the `/ (root)` folder, then click **Save**.
5. After a minute the site is live at `https://YOUR-USERNAME.github.io/tradepass-academy/`.

## Publish on Vercel (alternative)

Import the GitHub repository in Vercel, keep the framework preset as **Other**, and deploy. No build step is needed.

## Content notes

- **Available book**: Red Seal Carpenter 403A. The "Buy on Amazon" button links to https://a.co/d/04fGw0Fz
- **Coming soon**: Construction Electrician 309A, Industrial Electrician 442A, Heavy Equipment Technician 421A and Automotive Service Technician 310S. Each has an email notify form.
- **Launching a new book**: replace its coming soon card with a featured card like the 403A one, swap the CSS-rendered cover for a real cover photo (`<img src="assets/cover-XXXX.jpg">`), and add the Amazon link.
- **Forms**: the notify and newsletter forms currently show an on-page confirmation only. To collect real emails, connect a provider such as Formspree, Mailchimp or ConvertKit by pointing each `<form>` action at your endpoint.
- **Placeholder links**: the free resource links, update articles, social icons, Privacy Policy and Terms links point to `#` until those pages exist.
