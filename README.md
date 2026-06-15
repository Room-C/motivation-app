# Motivation Official Site

Static official website for Motivation.

## Deploy to GitHub Pages

Use this when publishing to the default project Pages URL:

`https://room-c.github.io/motivation-app/`

1. Make the repository public, or enable private GitHub Pages through an eligible plan.
2. In GitHub, open Settings > Pages.
3. Source: Deploy from a branch.
4. Branch: `main`; folder: `/ (root)`.
5. Save and wait for the Pages deployment to finish.

The site uses relative URLs so assets and navigation work under the `/motivation-app/` project path.

Logo assets now use the refreshed Motivation artwork while keeping the existing legacy filename for site compatibility.

## Deploy to Vercel

1. Import this repository in Vercel.
2. Use the static site defaults:
   - Framework preset: Other
   - Build command: none
   - Output directory: `.`
3. Configure the production domain when ready.

`vercel.json` enables clean URLs, so `/privacy` maps to `privacy.html` and `/eula` maps to `eula.html`.

## Launch checklist

- Confirm the final production domain.
- Confirm `contact@dailylift.app` or replace it everywhere.
- Review `privacy.html` and `eula.html` with product/legal before public launch.
- Add the real Google Play link when the listing is live. (iOS App Store link is live.)
