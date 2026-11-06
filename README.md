# A little date invitation for Anusara 💗

A small, mobile-friendly, static website made with plain HTML, CSS and JavaScript. No backend, database, build step, or paid hosting required.

## Preview locally

1. Unzip the project.
2. Open `index.html` in a browser.

For a local web server (optional), run this from the project folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish free with GitHub Pages

1. Sign in to GitHub and create a **public** repository, for example `date-invitation`.
2. Upload `index.html`, `style.css`, `script.js`, and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait a minute or two. GitHub will show the published URL, usually:
   `https://YOUR-USERNAME.github.io/date-invitation/`
7. Open that URL on your phone to test it, then send it to Anusara.

## WhatsApp setup

The site currently sends the date suggestion to the WhatsApp number configured in `script.js`:

```js
const WHATSAPP_NUMBER = "94775491306";
```

The number must be in international format with digits only: country code + number, without a leading `+`, spaces, or the local leading zero.

**Important:** The date-selection form is completed by the person visiting the page. The WhatsApp message opens on her device and she must tap Send. It does not silently send a message.

## Personalise

- Edit the wording in `index.html`.
- Change colors and layout in `style.css`.
- Change the WhatsApp destination in `script.js`.
- The elephant and cat artwork use emoji and CSS animation, so no external GIF files are required.

## Privacy note

GitHub Pages sites in public repositories are publicly accessible. Anyone with the link can view the invitation. Do not put private information in the source files.
