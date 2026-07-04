# 🎬 Kapak Avcısı

Herhangi bir YouTube video bağlantısını yapıştır, videonun tüm çözünürlüklerdeki kapak fotoğrafını (thumbnail) tek tıkla indir.

## Özellikler

- 🔗 Tüm YouTube bağlantı biçimlerini tanır: `youtube.com/watch?v=...`, `youtu.be/...`, `/shorts/...`, `/embed/...` veya sadece 11 karakterlik video kimliği
- 🖼️ 5 farklı çözünürlüğü otomatik kontrol eder: `maxresdefault` (1280×720), `sddefault`, `hqdefault`, `mqdefault`, `default`
- ⬇️ Tek tıkla indirme, bağlantı kopyalama
- 🚫 Sunucu yok, API anahtarı yok, hiçbir veri saklanmaz — tamamen tarayıcıda çalışır
- 📱 Duyarlı (responsive) tasarım, klavye erişilebilirliği

## Nasıl çalışır?

YouTube, her videonun kapak fotoğrafını herkese açık bir CDN üzerinden (`i.ytimg.com`) sunar. Bu araç yalnızca video kimliğini bağlantıdan ayıklayıp bu genel görsel adreslerini oluşturur — video indirme, kazıma (scraping) ya da yetkisiz bir API kullanımı söz konusu değildir.

## Kullanım

Tek bir statik dosyadır, kurulum gerektirmez:

```bash
git clone https://github.com/kullanici-adin/kapak-avcisi.git
cd kapak-avcisi
# index.html dosyasını tarayıcıda aç, sonra ise youtube video linkini yapıştır çıkan video kapağını istediğin kalitede indir.

## Proje yapısı

```
kapak-avcisi/
├── index.html   # Tüm site: HTML + CSS + JS tek dosyada
├── README.md
└── LICENSE
```

## Katkıda bulunma

Pull request'ler ve öneriler memnuniyetle karşılanır. Fikirler:

- WebP formatı desteği (`i.ytimg.com/vi_webp/...`)
- Oynatma listesi (playlist) bağlantılarından toplu kapak çekme
- Kapak fotoğrafını doğrudan görüntüleyen bir tarayıcı uzantısı

## Lisans

MIT — ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.
