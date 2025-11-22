# Production-Ready R2 Setup Guide

## Current Status ✅

Your R2 is configured with:
- **Bucket**: `monkdb-website`
- **Account ID**: `4b26d580c4ea99502ba88c71c283eaad`
- **Public URL**: `https://pub-cc3901daba764b61bc2141554b3d1652.r2.dev`

## How to Get Your R2 Public URL

### Method 1: Enable R2.dev Subdomain (Easiest)

1. **Go to Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com
   - Click **R2** → Select your bucket `monkdb-website`

2. **Enable Public Access**
   - Go to **Settings** tab
   - Scroll to **Public Access** section
   - Click **Allow Access**
   - Copy the **R2.dev subdomain** URL
   - Example: `https://pub-xxx.r2.dev`

3. **Update .env.local**
   ```env
   R2_PUBLIC_URL=https://pub-xxx.r2.dev
   ```

### Method 2: Custom Domain (Production Recommended)

1. **Connect Custom Domain in Cloudflare**
   - In R2 bucket settings, click **Connect Domain**
   - Enter your domain: e.g., `cdn.monkdb.com`
   - Follow DNS configuration steps

2. **Update .env.local**
   ```env
   R2_PUBLIC_URL=https://cdn.monkdb.com
   ```

## Environment Variables Explained

```env
# Required - Your R2 credentials
R2_ACCESS_KEY_ID=626d1c34bb6ef1320139fecc4fb39540
R2_SECRET_ACCESS_KEY=db12ac22129a0087e58f4d1a1569424daa2c6d9c80e3c9aa212ad200feed0778

# Required - R2 endpoint (do NOT change this)
R2_ENDPOINT=https://4b26d580c4ea99502ba88c71c283eaad.r2.cloudflarestorage.com

# Required - Your bucket name
R2_BUCKET_NAME=monkdb-website

# Required - Your account ID
R2_ACCOUNT_ID=4b26d580c4ea99502ba88c71c283eaad

# Required - Public URL (R2.dev or custom domain)
R2_PUBLIC_URL=https://pub-cc3901daba764b61bc2141554b3d1652.r2.dev
```

## Production Deployment Checklist

### 1. Security
- [ ] Rotate access keys after testing
- [ ] Use different buckets for dev/staging/production
- [ ] Enable versioning for file recovery
- [ ] Set up lifecycle rules for old files

### 2. Performance
- [ ] Enable Cloudflare CDN caching
- [ ] Set proper Cache-Control headers
- [ ] Use custom domain for better performance
- [ ] Enable gzip/brotli compression

### 3. Costs
- [ ] Set up usage alerts in Cloudflare
- [ ] Monitor storage and egress costs
- [ ] Clean up old/unused files regularly
- [ ] Use lifecycle policies for automatic cleanup

### 4. Monitoring
- [ ] Set up logging for R2 access
- [ ] Monitor upload/download errors
- [ ] Track storage usage trends
- [ ] Set up alerts for failures

## File Upload Flow

```
User uploads file
    ↓
/api/upload validates file
    ↓
Uploads to R2: documents/ or videos/
    ↓
Returns public URL: https://pub-xxx.r2.dev/documents/file.pdf
    ↓
URL saved to MongoDB
    ↓
Blog displays file using public URL
```

## Testing Upload

### Local Testing
```bash
# 1. Make sure environment variables are set
cat .env.local | grep R2_

# 2. Restart dev server
npm run dev

# 3. Login to admin
# http://localhost:3000/admin/login
# Email: admin@monkdb.com
# Password: admin123

# 4. Upload test file
# Go to: /admin/dashboard/blogs/new
# Select PDF or Video content type
# Upload a test file
```

### Verify Upload
```bash
# Check if file is accessible
curl -I https://pub-xxx.r2.dev/documents/your-file.pdf

# Should return 200 OK
```

## Troubleshooting

### ❌ Upload fails with "InvalidArgument"
**Solution**: Check that R2_ENDPOINT is correct and credentials are valid

### ❌ Upload succeeds but file not accessible
**Solution**: Enable public access on R2 bucket

### ❌ Wrong public URL in database
**Solution**: Update R2_PUBLIC_URL and re-upload files

### ❌ File shows in R2 but not on website
**Solution**: Check CORS settings in R2 bucket

## CORS Configuration (if needed)

Add this to R2 bucket settings → CORS:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://monkdb.com",
      "https://www.monkdb.com"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

## File Deletion

When you delete a blog:
- ✅ Files uploaded to R2 are automatically deleted
- ❌ External URLs (YouTube, Google Drive) are NOT deleted
- ✅ Check console logs to verify deletion

## Next Steps for Production

1. **Set up custom domain** for branded URLs
2. **Enable Cloudflare CDN** for faster delivery
3. **Set up monitoring** for upload failures
4. **Create backup strategy** for critical files
5. **Document file naming conventions** for your team

## Support

If you encounter issues:
1. Check Cloudflare R2 dashboard for errors
2. Verify environment variables are loaded (`console.log(process.env.R2_PUBLIC_URL)`)
3. Check browser console for CORS errors
4. Verify public access is enabled on bucket
