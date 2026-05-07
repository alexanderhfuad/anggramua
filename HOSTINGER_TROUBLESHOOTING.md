# 🔧 Troubleshooting Deployment Hostinger - Panduan Lengkap

**Status**: Deployment gagal dengan error browser
**Tujuan**: Mengatasi error setelah upload ke Hostinger

---

## 📋 Quick Checklist (Jalankan Berurutan)

### **1. Verifikasi File di public_html**

Akses cPanel → File Manager, navigasi ke `public_html`:

**✅ Harus Ada:**
- [ ] `index.html` (file utama)
- [ ] Folder `assets/` (berisi JS dan CSS)
- [ ] File `.htaccess`
- [ ] Folder `images/` (jika ada)

**❌ Tidak Boleh Ada:**
- [ ] Folder `dist/` (hanya isinya yang diminta)
- [ ] Folder `node_modules/`
- [ ] Folder `src/`
- [ ] File `package.json`, `vite.config.js`
- [ ] Folder `public/` (sudah di-merge ke root)

**Jika salah?** → Re-upload dengan benar
```
dist/index.html        → public_html/index.html
dist/assets/           → public_html/assets/
dist/.htaccess         → public_html/.htaccess
dist/robots.txt        → public_html/robots.txt
dist/sitemap.xml       → public_html/sitemap.xml
```

---

### **2. Upload Frontend Build**

**Sebelum upload, build dulu:**
```bash
cd frontend
npm install
npm run build
```

**Kemudian upload:**
- **Gunakan FTP Client** (FileZilla, WinSCP):
  1. Connect ke server Hostinger
  2. Navigate ke `public_html`
  3. Delete semua file lama (optional, tapi lebih aman)
  4. **Upload isi folder `dist/` ke `public_html`**
     - Jangan upload folder `dist` sendiri, tapi isinya saja!
  
- **Atau gunakan cPanel File Manager:**
  1. Navigasi ke `public_html`
  2. Upload → Extract file `.zip` dari `dist/`
  3. Delete file `.zip`

---

### **3. Set Permission File (755 & 644)**

**Via SSH (recommended):**
```bash
# Login SSH ke Hostinger
ssh username@yourdomain.com

# Set folder permissions ke 755
find ~/public_html -type d -exec chmod 755 {} \;

# Set file permissions ke 644
find ~/public_html -type f -exec chmod 644 {} \;

# Verifikasi
ls -la ~/public_html/ | head -10
```

**Via cPanel File Manager:**
1. Right-click setiap folder → Change Permissions → 755
2. Right-click setiap file → Change Permissions → 644

---

### **4. Verifikasi .htaccess**

```bash
# SSH: Cek apakah .htaccess ada dan readable
ls -la ~/public_html/.htaccess

# Lihat isi
cat ~/public_html/.htaccess | head -20
```

**Jika .htaccess tidak ada**, copy dari `frontend/public/.htaccess` ke `public_html/`:

```bash
# Content yang harus ada:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/index\.html$
  RewriteRule ^ /index.html [QSA,L]
</IfModule>
```

---

### **5. Rename .htaccess untuk Testing**

**Jika masih error 403/404:**

```bash
# SSH: Backup terlebih dahulu
cp ~/public_html/.htaccess ~/public_html/.htaccess.bak

# Disable sementara untuk test
mv ~/public_html/.htaccess ~/public_html/.htaccess.disabled

# Test: Buka browser → https://yourdomain.com/
# - Jika berhasil: Problem di .htaccess (enable kembali & edit)
# - Jika masih error: Problem di file permissions atau mod_rewrite tidak support
```

**Jika berhasil setelah disable .htaccess**, coba .htaccess yang lebih sederhana:

```bash
# Buat .htaccess baru yang lebih minimal
cat > ~/public_html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  Options -MultiViews
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
EOF
```

---

## 🚨 Error & Solusi

### **Error 403 Forbidden**
**Penyebab**: Permission file/folder salah
**Solusi**:
```bash
chmod 755 ~/public_html/*
chmod 644 ~/public_html/*.html
chmod 644 ~/public_html/.htaccess
```

### **Error 404 Not Found (semua halaman)**
**Penyebab**: 
- File tidak di-upload ke `public_html`
- Ada folder `dist/` yang tidak seharusnya ada
- `.htaccess` tidak berfungsi

**Solusi**: 
1. Verifikasi file ada di `public_html` → `ls ~/public_html/index.html`
2. Hapus folder `dist/` jika ada → `rm -rf ~/public_html/dist/`
3. Enable `.htaccess` kembali

### **Blank Page / JS Error**
**Penyebab**: 
- File `assets/` tidak ter-upload
- MIME type salah untuk JS/CSS
- CSP (Content Security Policy) issue

**Solusi**:
```bash
# Cek assets folder
ls -la ~/public_html/assets/

# Set MIME type di .htaccess
AddType text/javascript js
AddType text/css css
```

### **API Error / Backend tidak terhubung**
**Penyebab**: Backend URL salah di `VITE_API_URL`
**Solusi**: 
```bash
# Set .env.production dengan backend URL yang benar
cat > frontend/.env.production << 'EOF'
VITE_API_URL=https://your-backend-api.com
EOF

# Re-build dan re-upload
cd frontend
npm run build
# Upload isi dist/ ke public_html
```

---

## 🎯 Advanced: Check Server Config

**SSH ke Hostinger, jalankan:**

```bash
# Cek apakah mod_rewrite enabled
apache2ctl -M | grep rewrite
# Output harus: rewrite_module (shared)

# Cek error log
tail -50 ~/public_html/error.log
# atau
tail -50 /var/log/apache2/error.log

# Cek .htaccess syntax
apache2ctl configtest
```

---

## 📦 Pre-Deployment Verification

**Sebelum upload, jalankan ini lokal:**

```bash
# 1. Build
cd frontend
npm run build

# 2. Verifikasi struktur build
ls -la dist/
# Output:
# - index.html
# - assets/ (folder)
# - .htaccess (jika ada)
# - robots.txt
# - sitemap.xml

# 3. Verifikasi .env production
cat .env.production
# Pastikan VITE_API_URL sudah benar
```

---

## ✅ Testing Setelah Deployment

1. **Home page** → `https://yourdomain.com/`
2. **Route lain** → `https://yourdomain.com/about`, `/products`, dll
3. **Refresh page** → Pastikan tidak 404
4. **Console browser** → Buka DevTools (F12) → Console tab
   - Tidak boleh ada error merah
5. **Network tab** → Cek status file:
   - `index.html` → 200
   - `assets/*.js` → 200
   - `assets/*.css` → 200

---

## 🔗 Useful Commands SSH

```bash
# Check file size
du -sh ~/public_html/

# List files dengan size
ls -lhS ~/public_html/ | head -20

# Find largest files
find ~/public_html -type f -exec ls -lh {} + | sort -k5 -h | tail -10

# Delete old files
rm -rf ~/public_html/*

# Create tar backup
tar -czf ~/backup-public_html.tar.gz ~/public_html/

# Extract tar
tar -xzf ~/backup-public_html.tar.gz -C ~/
```

---

## 📞 Escalation (Jika masih error)

1. **Contact Hostinger Support** dengan info:
   - Error message yang tepat (dari console browser)
   - Screenshot error
   - SSH access logs: `tail -100 /var/log/apache2/error.log`
   
2. **Minta support verify**:
   - `mod_rewrite` module enabled?
   - `AllowOverride All` di vhost config?
   - PHP/Node version?

---

## 📋 Deployment Checklist Final

- [ ] Build: `npm run build`
- [ ] Upload: isi `dist/` ke `public_html` (bukan `dist/` folder)
- [ ] Delete: file lama jika ada
- [ ] Permissions: 755 folders, 644 files
- [ ] .htaccess: ada dan readable
- [ ] Backend URL: correct di `.env.production`
- [ ] Test: homepage + multiple routes
- [ ] Check: console (F12) tidak ada error
- [ ] Cache: clear browser cache (Ctrl+Shift+R)

