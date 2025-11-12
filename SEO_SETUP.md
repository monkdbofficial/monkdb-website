# SEO & Google Analytics Setup Guide

## Google Analytics Configuration

### Measurement IDs
- **GA Measurement ID**: G-MBWPWC14X1
- **Google Tag ID**: GT-P84MF3BT
- **Stream URL**: https://monkdb.com
- **Stream Name**: MonkDB
- **Stream ID**: 12308644478

### Implementation Details

The Google Analytics tracking has been implemented in the following files:

1. **`components/GoogleAnalytics.tsx`**
   - Implements Google Analytics using Next.js Script component
   - Uses environment variables for configuration
   - Only loads in production environment
   - Includes both GA4 and Google Tag configurations

2. **`app/(site)/layout.tsx`**
   - GoogleAnalytics component is included in the root layout
   - Preconnect links for performance optimization
   - DNS prefetch for Google Analytics domains

### Environment Variables

Add the following to your `.env.local` file (already configured):

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-MBWPWC14X1
NEXT_PUBLIC_SITE_URL=https://monkdb.com
```

## SEO Implementation

### 1. Metadata Configuration

**Homepage** (`app/(site)/page.tsx`)
- Comprehensive title and description
- OpenGraph tags for social media sharing
- Twitter Card metadata
- Keywords for search engines
- Robots directives
- Canonical URL

### 2. Structured Data

**Location**: `app/(site)/layout.tsx`

JSON-LD structured data for:
- SoftwareApplication schema
- Organization information
- Pricing information

### 3. Sitemap

**File**: `app/sitemap.ts`

Automatically generates sitemap including:
- Static pages (homepage, architecture, blog, documents)
- All blog posts with dynamic URLs
- Last modified dates
- Priority levels
- Change frequency

**Access**: https://monkdb.com/sitemap.xml

### 4. Robots.txt

**File**: `public/robots.txt`

Configuration:
- Allows all crawlers
- Points to sitemap location
- Ready for production use

### 5. Performance Optimization

Implemented in layout:
- Preconnect to Google fonts
- Preconnect to Google Analytics
- DNS prefetch for analytics
- Resource preloading
- Critical CSS optimization

## Verification Steps

### 1. Google Analytics Verification

After deployment, verify tracking is working:

1. Visit [Google Analytics](https://analytics.google.com)
2. Navigate to your property (MonkDB - G-MBWPWC14X1)
3. Check Real-time reports to see live traffic
4. Verify page views are being tracked

### 2. Google Search Console Setup

1. Visit [Google Search Console](https://search.google.com/search-console)
2. Add property for https://monkdb.com
3. Verify ownership using one of these methods:
   - HTML file upload
   - HTML meta tag (add to layout.tsx)
   - Google Analytics (already configured)
   - Domain name provider

4. Submit sitemap: https://monkdb.com/sitemap.xml

### 3. SEO Testing

Test your SEO implementation:

1. **Rich Results Test**: https://search.google.com/test/rich-results
   - Test URL: https://monkdb.com
   - Verify structured data is valid

2. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
   - Ensure responsive design passes

3. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Test performance scores
   - Address any recommendations

4. **Social Media Debuggers**:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

## Additional SEO Recommendations

### 1. Meta Images

Create the following images in `/public/images/`:

- `og-image.png` (1200x630px) - OpenGraph image
- `twitter-image.png` (1200x675px) - Twitter card image
- `favicon.ico` - Browser favicon
- `apple-touch-icon.png` (180x180px) - iOS icon

### 2. Google Site Verification

To add Google Search Console verification:

1. Get verification code from Search Console
2. Add to `app/(site)/layout.tsx`:
   ```tsx
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```

### 3. Content Optimization

- Use descriptive, keyword-rich headings (H1, H2, H3)
- Include alt text for all images
- Maintain consistent internal linking
- Regular content updates (blog posts)
- Optimize page load speed

### 4. Monitoring

Regularly check:
- Google Analytics for traffic data
- Google Search Console for indexing issues
- Core Web Vitals scores
- Crawl errors and coverage issues

## Deployment Checklist

Before deploying to production:

- [x] Google Analytics installed
- [x] Environment variables configured
- [x] Sitemap generated
- [x] Robots.txt configured
- [x] Meta tags optimized
- [x] Structured data added
- [x] Performance optimizations applied
- [ ] OG images created
- [ ] Favicon added
- [ ] Google Search Console verified
- [ ] Test in production environment

## Support

For issues or questions:
- Google Analytics: https://support.google.com/analytics
- Next.js SEO: https://nextjs.org/learn/seo/introduction-to-seo
- Vercel Deployment: https://vercel.com/docs
