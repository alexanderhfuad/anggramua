# Panduan Deployment Hostinger

## 📋 Persyaratan
- Hostinger Shared Hosting atau VPS dengan cPanel
- SSH access (opsional tapi direkomendasikan)
- Git (opsional)

## 🚀 Langkah Deployment

### 1. **Build Frontend**
```bash
cd frontend
npm install
npm run build
```

Folder `frontend/dist` berisi file production yang siap deploy.

### 2. **Upload Frontend ke Hostinger**

#### Opsi A: Menggunakan File Manager (cPanel)
1. Buka cPanel → File Manager
2. Navigasi ke folder **public_html** (untuk domain utama) atau subfolder untuk subdomain
3. Hapus file lama jika ada
4. Upload seluruh isi folder `dist` ke folder tersebut
   - Jangan upload folder `dist` sendiri. Upload file dan folder dari dalam `dist` langsung ke `public_html`.
5. **Penting**: Upload file `.htaccess` yang ada di `frontend/public/` atau pastikan file `.htaccess` ada di root `dist` setelah build.

#### Opsi B: Menggunakan FTP
1. Gunakan FTP client (FileZilla, WinSCP, dll)
2. Connect ke server Hostinger dengan credentials Anda
3. Navigate ke `public_html` atau folder subdomain
4. Upload seluruh isi folder `dist`
   - Jika Anda mengupload direktori `dist`, pastikan isinya berada di `public_html`, bukan `public_html/dist`.
5. Pastikan file `.htaccess` terupload

#### Opsi C: Menggunakan Git Deployment (Jika tersedia)
```bash
git clone https://github.com/alexanderhfuad/anggramua.git
cd anggramua/frontend
npm install
npm run build
# Copy dist contents ke public_html
```

### 3. **Konfigurasi Backend Node.js**

#### Opsi A: Hostinger dengan Node.js Support (VPS)
Jika Anda menggunakan Hostinger VPS dengan Node.js:

1. SSH ke server
2. Install dependencies:
```bash
cd backend
npm install
```

3. Jalankan dengan PM2 (process manager):
```bash
npm install -g pm2
pm2 start src/server.js --name "anggra-backend"
pm2 startup
pm2 save
```

4. Update API endpoint di frontend `.env`:
```bash
VITE_API_URL=https://yourdomain.com/api
```

#### Opsi B: Gunakan External Backend Service
Jika Shared Hosting tidak support Node.js, gunakan:
- **Vercel** (Free tier)
- **Railway** (Free tier)
- **Render** (Free tier)
- **Heroku** (Limited free)

Deployment ke Vercel (rekomendasi):
```bash
npm install -g vercel
vercel
```

Update VITE_API_URL di frontend ke URL Vercel deployment.

### 4. **Konfigurasi Environment Variable**

Buat file `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-api.com
```

### 5. **Fix Error 403**

Jika masih muncul error 403:

1. **Check permissions di cPanel**
   - File permissions: 644
   - Folder permissions: 755

2. **Verify .htaccess file**
   - Pastikan `.htaccess` sudah terupload di root folder
   - Cek bahwa mod_rewrite enabled di server

3. **Clear cache browser**
   - Ctrl+Shift+Delete (Ctrl+Cmd+Delete di Mac)
   - Clear cache dan cookies

4. **Check file structure**
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   ├── assets/
   │   ├── *.js
   │   └── *.css
   ├── public/
   │   ├── robots.txt
   │   └── sitemap.xml
   └── ... (file lainnya)
   ```

### 6. **Testing**

Akses URL domain Anda dan periksa:
- ✅ Page memuat tanpa error
- ✅ SPA routing bekerja (navigate tanpa refresh)
- ✅ API calls berjalan dengan benar

### 📝 Troubleshooting

**Error 403 masih muncul?**
- Gunakan SSH dan check file permissions:
  ```bash
  ls -la
  chmod 644 .htaccess
  chmod 755 .
  ```

**API endpoint tidak merespons?**
- Pastikan backend sudah di-deploy dan running
- Check VITE_API_URL di `.env.production` benar
- Verify CORS configuration di backend

**Page blank atau error saat routing?**
- Pastikan `.htaccess` ada di root folder
- Verify mod_rewrite enabled (hubungi support Hostinger)
- Check browser console untuk JavaScript errors

**Static assets (CSS, JS) tidak memuat?**
- Periksa path di dist folder
- Verify permissions: `chmod 644 assets/*`

## 📞 Support Hostinger
Jika perlu bantuan:
- Live chat: https://www.hostinger.co.id/
- Documentation: https://support.hostinger.co.id/
