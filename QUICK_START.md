# 🚀 MonkDB Blog System - Quick Start

## 🎯 Get Started in 3 Steps

### Step 1: Start the Dev Server
```bash
npm run dev
```

### Step 2: Login to Admin Panel
- URL: http://localhost:3000/admin/login
- Email: `admin@monkdb.com`
- Password: `admin123`

### Step 3: Create Your First Blog Post
1. Click "Create New Blog" in the dashboard
2. Fill in the form (title, content, etc.)
3. Check "Publish immediately"
4. Click "Create Blog"
5. View it at http://localhost:3000/blogs

---

## 📍 Important URLs

| Page | URL |
|------|-----|
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Manage Blogs | http://localhost:3000/admin/dashboard/blogs |
| Create Blog | http://localhost:3000/admin/dashboard/blogs/new |
| Public Blogs | http://localhost:3000/blogs |

---

## 🔧 Useful Commands

```bash
# Start development server
npm run dev

# Create admin user (if needed)
npm run create-admin

# Build for production
npm run build

# Start production server
npm start

# Check MongoDB status
brew services list | grep mongodb

# Start MongoDB (if not running)
brew services start mongodb-community
```

---

## 💡 Tips

### Creating a Blog Post
- **Title** → Auto-generates slug (you can edit it)
- **Excerpt** → Short description (max 500 chars)
- **Content** → Use the rich text editor
- **Tags** → Separate with commas: `database, tutorial, mongodb`
- **Cover Image** → Paste image URL
- **Publish** → Check to make it public immediately
- **Featured** → Check to show in featured section

### Rich Text Editor Shortcuts
- **Bold:** Ctrl/Cmd + B
- **Italic:** Ctrl/Cmd + I
- **Links:** Click link icon, paste URL
- **Images:** Click image icon, paste URL
- **Headings:** Click H1, H2, or H3 buttons

### Managing Blogs
- **Edit:** Click pencil icon on any blog
- **Delete:** Click trash icon (confirms before deleting)
- **Filter:** Use tabs to view All/Published/Drafts
- **Search by Tag:** Click any tag to filter

---

## ⚠️ Important Notes

1. **MongoDB Must Be Running**
   - Check: `brew services list | grep mongodb`
   - Should show: `started`

2. **Change Default Password**
   - Login with default credentials
   - Create a new admin user with secure password
   - Delete default admin (future feature)

3. **Environment Variables**
   - Already configured in `.env.local`
   - Change `NEXTAUTH_SECRET` in production

---

## 📚 Documentation

- **Full Setup Guide:** `ADMIN_SETUP.md`
- **Complete Summary:** `BLOG_SYSTEM_SUMMARY.md`
- **This Quick Start:** `QUICK_START.md`

---

## 🆘 Troubleshooting

**Problem:** Can't login
- ✅ Check MongoDB is running
- ✅ Verify credentials are correct
- ✅ Try running `npm run create-admin` again

**Problem:** Blog not showing on public page
- ✅ Make sure "Publish immediately" is checked
- ✅ Refresh the page
- ✅ Check browser console for errors

**Problem:** Rich text editor not working
- ✅ Clear browser cache
- ✅ Restart dev server
- ✅ Check console for JavaScript errors

---

## ✅ Quick Checklist

Before you start:
- [ ] MongoDB is running
- [ ] Node modules installed (`npm install`)
- [ ] Admin user created (`npm run create-admin`)
- [ ] Dev server started (`npm run dev`)
- [ ] Can access http://localhost:3000

---

**You're all set! Start creating amazing content! 🎉**
