# 📱 APK'ya Dönüştürme Rehberi

Bu proje artık tam bir **PWA (Progressive Web App)** ve bir **Capacitor** iskeleti içeriyor. Aşağıdaki iki yoldan biriyle gerçek bir `.apk` dosyası üretebilirsin.

> Not: Bu ortamda internet bağlantısı ve Android SDK olmadığı için APK'yı senin adına burada derleyemiyorum — ama her iki yolu da tam olarak çalışacak şekilde hazırladım. Aşağıdaki adımları kendi bilgisayarında izlemen yeterli.

---

## Yol 1 — En hızlısı: PWABuilder (kod yazmadan, ~5 dakika)

Kurulum gerektirmez, tarayıcıdan yapılır.

1. Projeyi (özellikle `www/` klasörünün içeriğini) bir yere yayınla — en kolayı GitHub Pages:
   - Depoyu GitHub'a yükle, **Settings → Pages** üzerinden `www` klasörünü (veya kökü) yayınla.
   - Sitene bir URL alacaksın, örn: `https://kullanici-adin.github.io/kapak-avcisi/`
2. [pwabuilder.com](https://www.pwabuilder.com) adresine git, sitenin URL'sini yapıştır.
3. PWABuilder, `manifest.json` dosyasını otomatik algılayacak ve bir "Android paketi" oluşturmanı önerecek.
4. **Package for Stores → Android** seçeneğine tıkla, "Signing key" için "Yeni oluştur" seçeneğini işaretle.
5. İndirilen `.zip` içinden imzalı `.apk` (veya Play Store için `.aab`) dosyasını çıkar.

Bu yol Play Store'a yüklenebilecek kalitede bir "Trusted Web Activity" APK'sı üretir.

---

## Yol 2 — Tam kontrol: Capacitor ile native Android projesi

Bilgisayarında **Node.js** ve **Android Studio** kurulu olmalı.

```bash
# 1. Proje klasörüne gir
cd kapak-avcisi

# 2. Bağımlılıkları kur
npm install

# 3. Android platformunu ekle (bunu yalnızca ilk seferde yaparsın)
npx cap add android

# 4. Web dosyalarını (www/) native projeye senkronize et
npx cap sync android

# 5. Android Studio'da aç
npx cap open android
```

Android Studio açıldıktan sonra:

- Üstteki **Build → Build Bundle(s) / APK(s) → Build APK(s)** yolunu izle.
- Derleme bitince "locate" bağlantısına tıklayarak `app-debug.apk` dosyasını bul.
- Telefonuna USB ile bağlayıp **Run ▶** ile doğrudan da yükleyebilirsin.

### Yayına hazır (imzalı) APK için

```bash
cd android
./gradlew assembleRelease
```

Play Store'a yüklemeden önce kendi imzalama anahtarınla (`keytool` ile oluşturulan `.jks` dosyası) imzalaman gerekir — Android Studio'nun **Build → Generate Signed Bundle / APK** sihirbazı bunu adım adım yapar.

### İçerikte değişiklik yaptığında

Her `www/index.html` (veya CSS/JS) değişikliğinden sonra native projeye yeniden yansıtman gerekir:

```bash
npx cap sync android
```

---

## Proje yapısı (güncel)

```
kapak-avcisi/
├── www/                     ← Capacitor'ın paketlediği web içeriği
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   ├── favicon.ico
│   └── icons/
├── package.json             ← Capacitor bağımlılıkları
├── capacitor.config.json    ← Uygulama kimliği, adı, renkleri
├── android/                 ← `npx cap add android` sonrası oluşur (henüz yok)
├── README.md
├── LICENSE
└── APK-BUILD.md             ← bu dosya
```

## Uygulama kimliği

`capacitor.config.json` içindeki `appId` (`com.kapakavcisi.app`) Play Store'daki paket adın olur. Play Store'a yüklemeyi düşünüyorsan kendi ters-alan-adı formatına göre (örn. `com.seninadinn.kapakavcisi`) değiştirmen ve bir daha değiştirmemen önerilir — Play Store bu kimliği uygulamanın kalıcı kimliği olarak kullanır.

## İzinler

Uygulama internet erişimi dışında hiçbir Android izni istemez. Kapak fotoğrafı indirme işlemi, native dosya sistemine değil tarayıcının/WebView'ın kendi indirme mekanizmasına yazılır.
