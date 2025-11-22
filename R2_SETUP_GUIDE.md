# Cloudflare R2 Setup Guide

## Quick Setup Steps

### 1. Enable Public Access on R2 Bucket

1. **Go to Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com
   - Click on **R2** in the left sidebar

2. **Select Your Bucket**
   - Click on your bucket: `monkdb-website`

3. **Enable Public Access**
   - Click on **Settings** tab
   - Scroll to **Public Access** section
   - Click **Connect Domain** or **Allow Access**
   - Copy the public URL (should be something like: `https://pub-xxx.r2.dev`)

4. **Update .env.local**
   - Replace `R2_PUBLIC_URL` with the actual R2.dev URL you got from step 3
   - Example: `R2_PUBLIC_URL=https://pub-4b26d580c4ea99502ba88c71c283eaad.r2.dev`

### 2. Configure CORS (if needed)

If you get CORS errors, add this CORS policy in R2 Bucket Settings:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://monkdb.com"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

### 3. Restart Your Server

After making changes to `.env.local`, always restart:

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

## Testing Upload

1. **Login to Admin Panel**
   - Go to: http://localhost:3000/admin/login
   - Email: admin@monkdb.com
   - Password: admin123

2. **Create New Blog**
   - Go to: http://localhost:3000/admin/dashboard/blogs/new
   - Select Content Type: **PDF Document** or **YouTube Video**
   - Click **"Upload PDF file instead"** or **"Upload video file instead"**
   - Upload a test file (max 50MB for PDF, 500MB for video)

3. **Verify Upload**
   - After upload, you should see: "File uploaded successfully"
   - The URL should look like: `https://pub-xxx.r2.dev/documents/123456-filename.pdf`
   - Save the blog and check if it displays on `/blog`

## Troubleshooting

### Error: "InvalidArgument" or "Authorization"

**Solution:**
- Make sure public access is enabled on the R2 bucket
- Verify the access keys are correct in `.env.local`
- Check that `R2_PUBLIC_URL` matches the actual R2.dev URL

### Error: "AccessDenied"

**Solution:**
- Double-check `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`
- Make sure the API token has R2 read/write permissions

### Files Upload but Don't Display

**Solution:**
- The bucket might not be publicly accessible
- Enable public access or set up a custom domain
- Make sure `R2_PUBLIC_URL` is correct

### Files Not Deleted When Blog is Deleted

**Solution:**
- Check the console logs for deletion errors
- Files are only deleted if they contain 'r2.dev' in the URL
- Local files or Google Drive links won't be deleted

## What Happens When You Delete a Blog?

✅ **Automatically deleted from R2:**
- Uploaded PDF files (`documentFile`)
- Uploaded video files (`videoFile`)
- Uploaded cover images (`coverImage`)

❌ **NOT deleted (external resources):**
- YouTube video links
- Google Drive PDF links
- External image URLs

## File Storage Structure

```
monkdb-website (R2 Bucket)
├── documents/
│   ├── 1234567890-my-document.pdf
│   └── 1234567891-another-doc.pdf
└── videos/
    ├── 1234567892-my-video.mp4
    └── 1234567893-another-video.mp4
```

Each file is prefixed with a timestamp to ensure uniqueness.

## Production Deployment

When deploying to production:

1. Add environment variables to your hosting platform
2. Update `R2_PUBLIC_URL` to use a custom domain for better branding
3. Set up proper CORS policies for your production domain
4. Consider setting up CDN caching for better performance
