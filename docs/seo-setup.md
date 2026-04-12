# SEO Setup Instructions

Follow these steps to verify your site with search engines and submit your sitemap.

## 1. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property** and enter `electrifyeverythingnow.com`
3. Choose the **HTML tag** verification method
4. Copy the `content` value from the meta tag they provide (just the code, not the full tag)
5. Open `src/app/layout.tsx` and replace `REPLACE_WITH_YOUR_GSC_VERIFICATION_CODE` with the code you copied
6. Commit and push to `main` to trigger a deploy
7. Go back to Google Search Console and click **Verify**

## 2. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Click **Add your site** and enter `electrifyeverythingnow.com`
3. Choose the **XML file** authentication method
4. Copy the verification code they provide
5. Open `public/BingSiteAuth.xml` and replace `REPLACE_WITH_YOUR_BING_VERIFICATION_CODE` with the code you copied
6. Commit and push to `main` to trigger a deploy
7. Go back to Bing Webmaster Tools and click **Verify**

## 3. Submit Sitemap

Once both tools are verified, submit your sitemap in each:

- **Google Search Console**: Go to Sitemaps in the left sidebar, enter `https://electrifyeverythingnow.com/sitemap.xml`, and click Submit
- **Bing Webmaster Tools**: Go to Sitemaps in the left sidebar, enter `https://electrifyeverythingnow.com/sitemap.xml`, and click Submit
