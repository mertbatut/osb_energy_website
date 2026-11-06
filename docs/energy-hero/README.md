# Tek sahneli enerji dönüşümü hero

Mevcut çalışma: **Aşama A / gündüz görseliyle akşam atmosferi prototipi**. Gerçek gece dönüşümü veya kesintisiz enerji garantisi olarak değerlendirilmemelidir.

## Kaynaklar

`src/assets/images/osb-energy-day.png` kullanıcı görselinin kopyası, `public/images/hero/osb-energy-day.png` uygulamanın yapılandırılmış kaynak yoludur. Gerçek çözünürlük 1672 × 941 px. Yapay keskinleştirme ve 4K büyütme uygulanmadı. Aynı kaynaktan 640/960/1280/1672 px AVIF ve WebP dosyaları üretildi.

## Eksik varlıklar

- `/images/hero/osb-energy-night.webp`
- `/images/hero/osb-energy-mobile.webp`
- `/images/hero/osb-energy-night-mobile.webp`
- İsteğe bağlı, tam kare kayıtlı ışık katmanları: `osb-energy-lights.png`, `osb-energy-lights-mobile.png`

Dosyaları ekledikten sonra geliştirme sunucusunu yeniden başlatın veya yeniden build alın. Vite `energy-hero-assets` eklentisi yalnızca gerçek dosyaları manifest'e dahil eder; eksik dosyalara HTTP isteği yapılmaz. Her bir kaynak için `osb-energy-night-640.avif` / `osb-energy-night-640.webp` gibi genişlik sonekli dosyalar eklenebilir. Mobil karşılıklar `osb-energy-mobile-640.*`, `osb-energy-night-mobile-640.*` biçimindedir.

Gece görselleri **aynı kamera, aynı nesne konumları ve aynı oran** ile üretilmelidir. Kod oran farkı %2'yi aşarsa gece katmanını göstermez; kamera eşleşmesinin görsel kontrolü yine gereklidir. Mobil gündüz ayrı kadrajdaysa mobil gece karşılığı olmadan masaüstü gece görseli karıştırılmaz.

## Işık kaydı

Rastgele ekran koordinatlarında LED eklenmedi. Mevcut gündüz görselindeki sıcak armatürler, belirlenmiş durum LED'leri olarak kabul edilmedi. `ENERGY_HERO.lightPassRegistered` varsayılan olarak `false`. Doğru kamera ile aynı boyutta, arka planı şeffaf ve gerçek armatürlere piksel düzeyinde hizalı tam kare ışık katmanı sağlanıp kontrol edilmeden açılmamalı. Aktifleştiğinde gündüz/geceyle aynı `object-fit`, `object-position` ve ortak parallax katmanında gösterilir.

## Hareket

Tek ScrollTrigger ID: `energy-transition-hero`. Tek timeline. Hero 100dvh; pin sadece hero'ya uygulanır. Scroll mesafesi masaüstü 1.35 × viewport, mobil 0.9 × viewport. Scrub 0.6 / 0.25. %0–35 serin renk katmanı, %35–70 varsa gece crossfade'i, %70–100 tamamlanma. Gece yoksa yalnızca kontrollü serin ton/kararma prototipi devam eder. `filter` ve `backdrop-filter` animasyonu yok. İleri/geri scroll timeline'ı tersine oynatır.

Gece/ışık katmanları mevcutsa %8 scroll ilerlemesinden sonra yüklenir. Scroll sırasında React state döngüsü yok. `prefers-reduced-motion` durumunda pin ve hareket yok, yalnızca gündüz görseli var. Mobil özel görsel gelene kadar BESS'in bulunduğu sağ alan korunacak biçimde gündüz dosyası kırpılır.

Kurumsal ve mühendislik video alanlarının onaylı tam ekran düzenleri korunur; hero pin'inden sonra normal akışla gelirler. Header animasyon timeline'ına dahil değildir.


## Gerçek tarayıcı testleri

Chrome DevTools Protocol ile 1440×900, 1024×900, 768×900, 390×844 ve 375×568 ekranları kontrol edildi. Her ekranda %0, %35, %70, %100 ve geri %0 progress ölçüldü. Tek hero görseli ve tek ScrollTrigger korundu; header üst konumu 0 kaldı. CTA alanı viewport içinde. Pin sonrası bölüm arası boşluk 0 px. Gece varlığına HTTP isteği, hero asset 404'ü ve JavaScript exception'ı: 0. Reduced motion'da pin/hero trigger sayısı 0 ve gündüz görseli görünür. Fiziksel cihaz testi veya Lighthouse üretim skoru alınmadı.

Ham sonuçlar: `browser-tests.json`, `navigation-tests.json`. Ekran görüntüleri: `screenshots/1440-day.png`, `1440-dusk.png`, `390-day.png`, `390-dusk.png`. Mevcut gece varlığı bulunmadığından gerçek gece crossfade'inin görsel doğrulaması ve gerçek ışık pass hizalama testi sonraki asset tesliminden sonra yapılmalıdır.

`npm run build`, `npm run lint` ve `git diff --check`: başarılı.
