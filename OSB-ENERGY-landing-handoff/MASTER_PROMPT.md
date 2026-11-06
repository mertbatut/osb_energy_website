# MASTER PROMPT — OSB ENERGY Landing Page'i Web'e Taşıma

> Bu dosyayı ajanına olduğu gibi ver. Dosyanın bulunduğu klasördeki `assets/` ve `reference/` klasörleri bu prompt'un parçasıdır; ajan onları okuyabilmeli.

---

## 0. Rolün ve görevin

Sen kıdemli bir **creative frontend mühendisisin**: React, TypeScript, Tailwind, GSAP/ScrollTrigger, Lenis ve WebGL (three.js) konularında uzmansın. Görevin, onaylanmış bir tasarımı (OSB ENERGY landing page'i) **birebir, üretim kalitesinde** web sitesine uygulamak.

Tasarım bitmiş ve onaylanmış durumda. **Yeniden tasarlama.** Renk, yazı, boşluk, metin, animasyon değerleri ve sahne sırası aşağıda ve `reference/` klasöründe tanımlı. Bir şey eksik ya da belirsizse **tahmin etme, sor** (bkz. §12).

Çalışma sırası: Önce §1'deki keşfi yap ve bana **bir uygulama planı sun**. Planı onaylamadan kod yazma. Sonra §11'deki fazlarla ilerle; her fazın sonunda dur, ekran görüntüsü ya da önizleme linkiyle göster.

---

## 1. Önce keşif (kod yazmadan)

1. Repo'yu incele. Beklenen repo `mertbatut/osb_energy_website`. Tasarım sistemi notlarına göre içinde şunlar olmalı:
   - React + Vite (doğrula)
   - Tailwind v4 (`src/index.css` içinde `@theme` bloğu)
   - `gsap` ^3.x ve `@gsap/react`
   - GSAP ticker'a bağlı `lenis`
   - `three` ve `@react-three/*`

   Hangileri gerçekten var, hangi sürümde? `package.json`'ı ve mevcut sayfa yapısını raporla.
2. Mevcut landing page'in hangi dosyalarda olduğunu, hangi bileşenlerin yeniden kullanılabileceğini ve hangilerinin bu tasarımla değişeceğini listele.
3. Mevcut `useReducedMotion`, Lenis kurulumu ve ScrollTrigger kayıtları varsa, onları **yeniden kurma, kullan**.
4. Çıktı olarak bana şunu ver: dosya ağacı önerisi, bileşen listesi, eklenecek veya kaldırılacak bağımlılıklar, riskler.

---

## 2. Referans dosyalar (bu klasörde)

| Dosya | Ne işe yarar |
|---|---|
| `reference/landing.reference.html` | **Tasarımın kaynak kodu.** Tüm stiller, metinler, GSAP zaman çizelgeleri, WebGL ve etkileşim kodu burada. Özel bir "Design Component" formatında yazılmış: `<x-dc>`, `<sc-if>`, `<sc-for>`, `{{değişken}}` ve `class Component extends DCLogic` kullanıyor. **Bu formatı kopyalama**; React bileşenlerine çevir. Değerleri (px, ease, süre, renk) birebir buradan al. |
| `reference/screenshots/` | Hedef görünüm: hero, sahne aşamaları, yolculuk kareleri, footer, buton hover ve paletler. |
| `reference/design-tokens.json` | Renk paletleri (A/B/C), yazı ölçeği, layout ve easing token'ları. |
| `reference/sayfa-metinleri.txt` | Sayfadaki bütün metinler, sırasıyla. **Metinleri değiştirme.** |
| `reference/code/stage-gl.js` | "Elektriğin yolunu izleyin" sahnesinin WebGL kodu (three.js; shader, LED ışığı, enerji parçacıkları). |
| `reference/code/liquid-engine.ts` (+ `.js`) | Footer'daki parçacıklı logo için WebGL2 sıvı-parçacık motoru (TypeScript kaynağı). |
| `reference/vendor/` | Referans HTML'in kullandığı kütüphane dosyaları. **Projede bunları değil, npm paketlerini kullan.** |
| `assets/` | Üretimde kullanılacak görseller (işlenmiş). `assets/originals/` ham hallerdir. |

---

## 3. Tasarım sistemi

### 3.1 Renkler: "ilk iki renk ana, üçüncü renk detay"

Varsayılan palet **A**'dır. B ve C ileride tema olarak açılabilsin diye CSS değişkenleri ve `data-palette="a|b|c"` ile kur. Değerler `reference/design-tokens.json` içinde.

**Palet A:**
```
--bg:#FFFFFF  --bg-alt:#F3F4F6  --card:#FFFFFF  --ink:#1C1F23  --text:#1C1F23  --muted:#545B66  --line:#DFE2E7
--brand:#2541B2 (kraliyet mavisi)  --brand-on-dark:#8EA2F5
--accent:#F28C28 (mandalina, YALNIZ DETAY)  --on-accent:#1C1F23
--dark:#1C1F23  --dark-2:#121417  --dark-3:#2A2E34  --dark-glow:#2C3340
--on-dark-muted:#C9CDD3  --chip:#E8ECFA  --charge:#8EA2F5  --rest:#E3E6EC
```

**Kural:** Mandalina (`--accent`) yalnızca detayda kullanılır:
- başlık sonundaki nokta
- "100**+**" işaretindeki artı
- aktif aşama çizgisi
- süreç noktaları
- puant/kesinti ışığı
- ilerleme çubuğu

Büyük yüzeylerde accent kullanma. Koyu zemin yalnızca 3 yerde var: "Elektriğin yolunu izleyin", "Konteynerin içine yolculuk" ve footer.

### 3.2 Yazı

- **Instrument Sans** (Google Fonts veya `@fontsource-variable/instrument-sans`). Eksenler `wdth 75–100`, `wght 400–700`. Türkçe karakterler için `latin-ext` alt kümesi zorunlu.
- Başlıklar **cümle düzeninde** (BÜYÜK HARF YOK), ağırlık 500, harf aralığı `-0.04em`.
- Ölçek:
  - H1: `clamp(3.4rem, 7vw, 7.2rem)`, satır yüksekliği 0.94
  - H2 (`.sh-b`): `clamp(2.5rem, 4.8vw, 4.75rem)`, satır yüksekliği 1.0, `text-wrap: balance`
  - Üst satır (`.sh-a`): `clamp(1rem, 1.25vw, 1.15rem)`, ağırlık 500, `--muted`
  - Lead: `clamp(1.05rem, 1.3vw, 1.2rem)` / 1.65
  - Gövde: 17px / 1.6
- Her bölüm başlığı iki satırdır: küçük `.sh-a` üst satır ve büyük `.sh-b` ana satır (ör. "Enerji depolamanın" / "Finansal etkisi").
- Rakamlarda `font-variant-numeric: tabular-nums` kullan.

### 3.3 Layout

- İçerik max genişliği 1440px, yan boşluk `clamp(20px, 5vw, 80px)`, bölüm dikey boşluğu `clamp(96px, 10vw, 150px)`.
- Köşe yarıçapı: butonlar 2px, görseller ve kartlar 4px, sahne 6px.
- **SVG ile çizilmiş dekoratif arka plan KULLANMA.** Bu müşterinin açık talebi. Bilgi taşıyan küçük grafikler (akordeondaki çizelgeler) ve ikonlar serbest.

### 3.4 Butonlar ("inherit" buton + hover'da blur)

Bu müşterinin özellikle istediği davranış. Birebir uygula:

- **Normal hal:** `background: transparent; color: inherit; border: 1px solid currentColor; border-radius: 2px; min-height: 58px; padding: 0 30px; font-weight: 700; font-size: 15px`. Arka plan dolgusu yok.
- **Hover:**
  - `background: color-mix(in srgb, currentColor 7%, transparent)`
  - `backdrop-filter: blur(14px) saturate(1.4)`
  - `box-shadow: 0 14px 34px rgba(0,0,0,.12)`
  - Çerçeve `currentColor %35`
  - Geçiş süresi 500ms.
- **Yazı geçişi:** Etiket iki kez basılır (`.bt > span + span`). Hover'da üstteki `translateY(-100%)` + `blur(6px)` + `opacity 0` ile çıkar, alttaki `translateY(100%) blur(6px)` halinden `none / blur(0) / opacity 1`'e gelir. 600ms, `cubic-bezier(0.65,0,0.35,1)`. İkinci kopyaya `aria-hidden="true"` ver.
- **Ok:** hover'da `translateX(5px)`.
- **Mıknatıs:** `.magnet` butonlar imleci takip eder. `gsap.quickTo` ile x = farkın 0.2 katı, y = 0.3 katı, `duration .6`, `power3`. Ayrılınca sıfıra döner. Yalnızca masaüstünde.
- **Koyu zemin varyantı** (`.light`): beyaz yazı ve beyaz %70 çerçeve. Hover'da `rgba(255,255,255,.1)`.

### 3.5 Menü

- `position: sticky; top: 0`. Arka plan `--bg %72` + `backdrop-filter: blur(18px) saturate(1.4)`.
- Arka plan tam genişliğe yayılır: `box-shadow: 0 0 0 100vmax …` + `clip-path: inset(0 -100vmax)`.
- Aşağı kaydırınca (`top -160`'tan sonra) `yPercent -110` ile saklanır, yukarı kaydırınca geri gelir (`quickTo`, .5s).
- **Dikkat:** Ata elemanlarda `overflow: hidden` sticky'yi bozar; `overflow-x: clip` kullan.
- İçerik: solda logo (`assets/logo-blue.png`); ortada Çözümler / Finansal etki / Proje süreci / İletişim (anchor'lar); sağda telefon ve "Teklif alın" butonu. 980px altında linkler ve telefon gizlenir.

---

## 4. Sayfa yapısı (sırası değişmez)

Metinlerin tamamı `reference/sayfa-metinleri.txt` içinde. Bölüm `id`'leri: `#top`, `#cozum`, `#gun`, `#finans`, `#yolculuk`, `#surec`, `#iletisim`.

1. **Hero (`#top`)**
   - Beyaz zemin. Solda üst satır "Öz tüketimli fabrikalar için" ve H1 "Enerji depolama / yatırımı" (sondaki nokta `--accent`). Altında lead, "Ücretsiz ön değerlendirme" butonu ve "Nasıl çalışır?" alt çizgili linki.
   - Sağda arka planı temizlenmiş konteyner (`assets/hero-container-cutout.png`), genişlik ≈ min(100%, 820px), sağa %5 taşar. Altında yumuşak elips gölge (`.prod-shadow`: radial-gradient + blur(4px)).
   - Arkada dev "OSB ENERGY" kelimesi: `font-size clamp(6rem,19vw,22rem)`, renk `--ink %5`, alttan yarısı taşar.
   - Sol altta "Aşağı kaydırın". Sağ altta bataryanın **o anki gerçek saate göre** durum listesi (Gece şarj / Gündüz bekleme / Puantta besleme / Kesintide devreye girme); aktif olanın yanında accent nokta var. Saat aralıkları: 22–06 şarj, 06–17 bekleme, 17–22 puant. Liste 30 sn'de bir güncellenir.
2. **Güven şeridi:** 4 sütun (2018 / 100+ / %20–30 / 7/24). Beyaz zemin, üstte ve altta ince çizgi, sütunlar arasında dikey çizgi.
3. **Çözümler (`#cozum`)**
   - Solda başlık, lead ve batarya kabini görseli.
   - Sağda 4 maddelik **akordeon** (tek seferde bir açık): ikon dairesi, başlık ve ±ikonu. Açık durumda ±ikonu 135° döner.
   - Her maddenin açıklaması ve çizelgesi referans HTML'deki SVG'lerin aynısı.
4. **Elektriğin yolunu izleyin (`#gun`)**
   - Koyu bölüm.
   - **Sahne:** yüksekliği `clamp(440px, 50vw, 720px)`, köşe 6px. Arkada gece ve gün batımı fotoğrafları, üstünde WebGL katmanı (§6.1).
   - **Sol üst cam kart:** saat aralığı, aşama adı ve akış (ör. "Şebeke → Batarya").
   - **Altta 4 adım butonu** (sekme rolü). Aktif adımın üstünde 5.2 sn'lik accent ilerleme çubuğu var; adımlar 5.2 sn'de bir otomatik ilerler. Kullanıcı tıklarsa otomatik oynatma durur.
5. **Finansal etki (`#finans`):** Açık gri zemin. 2×2 rakam ızgarası (10.000.000 kWh / 2.500 kWh / 1.000 kW / 1,5–2 milyon TL / 3–5 yıl), dipnot ve buton. Bu değerler müşterinin kendi örnek hesabıdır; **değiştirme**, dipnotu koru.
6. **Konteynerin içine yolculuk (`#yolculuk`):** Yükseklik 880px. Gün batımı ve raflar fotoğrafları üst üste, üzerinde 3 metin bloğu. Animasyon §5.
7. **Proje süreci (`#surec`):** 6 adım. Üstte gri çizgi, onun üstünde kaydırmayla çizilen accent/brand çizgi, her adımda accent halkalı nokta.
8. **Kullanım alanları:** İki sıra dev kayan sektör adı (`clamp(3rem,7vw,7rem)`, ağırlık 400). Dolu `--ink` ve soluk `--muted %55` dönüşümlü kullanılır.
9. **İletişim (`#iletisim`)**
   - Solda başlık ve iletişim listesi: 0534 949 92 52, 0533 721 16 13, contact@osbinternational.com, osbenergy.com.tr, Central Balat.
   - Sağda **cümle-form** kartı: "Merhaba, ben [adınız]. [firma ve OSB] için enerji depolama değerlendirmesi istiyorum. Beni [telefon] numarasından arayabilirsiniz." Satır içi input'lar alt çizgili. Ayrıca isteğe bağlı fatura yükleme ve "Ön değerlendirme isteyin" butonu var.
10. **Footer:** Üstte **parçacıklı logo** alanı (`clamp(240px,30vw,440px)` yükseklik, §6.2). Altında "Doğru enerji yönetimi, / geleceğinizi güçlendirir." ve "Teklif alın" (light buton). En altta logo ve iletişim satırı.

---

## 5. Animasyon spesifikasyonu (GSAP + ScrollTrigger + Lenis)

Tüm değerler `reference/landing.reference.html` → `initMotion()` içinde. Hepsini **tek bir `useGSAP` / `gsap.context` altında** topla ve unmount'ta `revert()` et.

**Genel kurallar:**
- **Lenis:** `lerp 0.085, wheelMultiplier 0.95`. `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t*1000))`, `lagSmoothing(0)`. Anchor linkler `lenis.scrollTo(target, {offset:-20, duration:1.6})` ile kayar.
- **Varsayılan easing:** `expo.out`. Kompozisyon değişimlerinde `power4.inOut` / `power3.inOut`. Scrub'lı animasyonlarda `ease:'none'`.
- **`prefers-reduced-motion: reduce`:** Hiçbir giriş, parallax, pin ya da WebGL animasyonu çalışmaz. İçerik son halinde, statik görünür.
- **Mobil (<900px):** Pin yok, ürün eğimi yok, mıknatıs yok. Parallax ve girişler hafifletilmiş haliyle kalır.

**Açılış zaman çizelgesi:**
| Hedef | Animasyon | Zaman |
|---|---|---|
| Menü | `y:-30, opacity 0` → 1.1s | 0 |
| H1 satırları (maskeli `.ln > span`) | `yPercent 115, rotate 2` → 1.4s, stagger .09 | 0.1 |
| Ürün (`.hero-prod`) | `x:160, opacity 0` → 2s | 0.15 |
| Ürün görseli | `rotationY -18` (`transformPerspective 1400`) → 2.2s | 0.15 |
| Gölge | `scaleX .3, opacity 0` → 2s | 0.5 |
| Dev arka yazı | `yPercent 40, opacity 0` → 2.2s | 0.2 |
| Lead ve butonlar | `y:30, opacity 0` → 1.1s, stagger .08 | 0.6 |
| Durum listesi | `x:30, opacity 0`, stagger .07 | 1.0 |

**Hero, kaydırmaya bağlı** (`start: top top`, `end: bottom top`, `scrub .6`):
- H1 ilk satır `yPercent -60`
- H1 ana blok `-18`
- Ürün `yPercent -22, scale .94`
- Gölge `opacity .2, scaleX .8`
- Dev yazı `xPercent -14`
- Lead ve butonlar `yPercent -30, opacity .2` (başlangıç `20% top`)

**Hero, sürekli ve imleç:**
- Ürün "nefes alır": `y:-12`, 3.2s, `sine.inOut`, yoyo, sonsuz.
- Masaüstünde imleç eğimi (`quickTo`, 1s, `power3`): `rotationY = nx*14`, `rotationX = -ny*8`, dev yazı `x = -nx*60`, gölge `x = nx*30`.

**Giriş animasyonları:**
- Bölüm başlıkları (`.reveal .ln > span`): `yPercent 115, rotate 1.5`, 1.3s, stagger .1, `top 88%`, bir kez.
- Bloklar (`.up`): `y:70, opacity 0`, 1.3s, `top 92%`, bir kez.
- Akordeon satırları: `x:60`, stagger .09.
- Rakamlar: 2.2s `power3.out` sayaç; 2018 1990'dan sayar; ≥1000 değerler `tr-TR` biçimli.
- Güven şeridi: `y:60`, stagger .1.
- Finans üst çizgisi: `scaleX 0→1`, 1.6s, `expo.inOut`.

**Görsel parallax** (`[data-parallax]`): kap `overflow:hidden`, görsel `top:-8%; height:116%`. `yPercent -amt → +amt` ve `scale 1.12 → 1`, `scrub`.

**Sahne (`#gun .stage`):**
- Giriş: `clipPath inset(14% 10% 14% 10% round 6px) → 0`, scrub (`top 95%` → `top 35%`).
- Yalnız masaüstü ve kaydırılabilir sayfada **pin:** `start 'center center'`, `end '+=2400'`, `pin:true`, **`pinSpacing:true` (zorunlu; flex ebeveynde varsayılan false olur)**, `anticipatePin 1`, `scrub`.
- Pin süresince `progress*4` → aşama 0..3. Otomatik oynatma bu sırada durur. Görsel zoom `1 → 1.14`.

**Yolculuk (`#yolculuk`)**, masaüstünde pin `end '+=2800'`, `scrub .8`, tek timeline:
| Hedef | Animasyon | Zaman |
|---|---|---|
| Gün batımı görseli | `scale 3.8` (`transform-origin 66% 62%`, kapı), `power2.in` | 0 → 1 |
| Metin 1 | `opacity 0, y -50` | 0.05 |
| Gün batımı görseli | `opacity 0` | 0.85 |
| Raflar | `opacity 0→1, scale 1.4→1.06` | 0.82 |
| Metin 2 | girer | 1.15 |
| Metin 2 | çıkar | 1.7 |
| Raflar | `scale 1.22, xPercent -4` | 1.3 |
| Metin 3 | girer | 2.0 |
| Alt ilerleme çubuğu | `scaleX 0→1` | 0 → 2.5 |

Mobilde pin yok, yalnızca yumuşak scale parallax var.

**Süreç:** Çizgi `scaleX` scrub (`top 80%` → `bottom 55%`). Maddeler `y:50` stagger .1. Noktalar `scale 0`, `back.out(2.4)`.

**Sektör şeridi:**
- Satırlar `xPercent 0 ↔ -22`, zıt yönlerde, `scrub .5`.
- Kaydırma hızına göre eğilme: `skewX = clamp(-10,10, velocity/-250)` (`quickTo` .6s), bölümden çıkınca 0.

**Form kartı:** `yPercent 10 → -6`, scrub.

---

## 6. WebGL

### 6.1 "Elektriğin yolunu izleyin" sahnesi: `reference/code/stage-gl.js`

Gerçek fotoğraf + three.js katmanı. 3D model **yok** (müşteri basit 3D modelleri reddetti; fotoğraf tabanlı kalacak).

- **Shader:** iki doku (gece / gün batımı), `cover` UV hesabı, `uZoom`.
  - Aşama geçişinde düz solma değil, gürültülü kenarlı **ışık süpürmesi** var: kenarda accent renkli parlak bant.
  - Gündüz aşaması: gün batımının desatüre ve parlatılmış hali.
  - Kesinti aşaması: gri ve kararmış görüntü + satır satır glitch kayması + RGB ayrışması.
  - Vinyet.
- **LED şeritleri:** Fotoğraftaki LED çizgileri boyunca additive glow noktaları. Koordinatlar fotoğraf pikseli cinsinden (836×470 tabanlı); gece ve gün batımı için ayrı tanımlı, geçişte ara değerleri alınıyor.
  - Gece: `--charge` rengi.
  - Puant ve kesinti: `--accent`.
  - Kesintide 22 Hz yanıp söner.
- **Enerji akışı:** Gece trafodan konteynere, puant ve kesintide konteynerden fabrikaya 420 parçacık + 14 parlak baş.
- **Kurallar:**
  - Dokular yüklenmeden canvas'ı gösterme (`opacity 0`). Yüklenirse göster; yüklenmezse altta CSS filtreli fotoğraflar kalır. CSS fallback sınıfları referansta: `.stage-imgs.toneN`, `.stage-tint.toneN`.
  - `IntersectionObserver` ile görünmezken render'ı durdur. `ResizeObserver` ile boyutla. Unmount'ta `dispose`.
  - `setColors` ile palet değişince renkleri güncelle.
- **Uygulama:** React'te `useRef` + `useEffect` ile vanilla three yeterli; R3F zorunlu değil.
  - Referans three r147 UMD kullanıyor. Projedeki `three` sürümüne uyarla: r152+ ile `outputEncoding`/`sRGBEncoding` yerine `outputColorSpace`/`SRGBColorSpace`, `ColorManagement` varsayılan açık.
  - **Renk yönetimine dikkat:** ShaderMaterial dokuları sRGB çözmeden okumalı, aksi halde görüntü fazla koyu çıkar.
  - three'yi **lazy-load** et (`import()` ile, sahne görünüme yaklaşınca).

### 6.2 Footer parçacıklı logo: `reference/code/liquid-engine.ts`

- 21st.dev "liquid sculpture" motoru (WebGL2 GPGPU). Kaynak TypeScript olarak verildi; React bileşenine sar.
- Görsel `assets/logo-white-hd.png` (şeffaf PNG). Motor şeffaflığı algılayıp **alpha mode** ile çalışır.
- Ayarlar: `radius 150, density 0.9, ambientIntensity 0.3, intro true, streaks true, restStyle 'image'`.
- Statik `<img>` altta durur, `onFirstFrame` gelince gizlenir. WebGL2 yoksa ya da hata olursa statik logo kalır.
- Pointer olayları kapsayıcıdan koordinat çevrilerek verilir. Görünmezken `setVisible(false)`.
- Mobilde `density` değerini 0.5'e düşür.
- **Bu efekti hero'ya KOYMA.** Müşteri hero'da reddetti, yalnızca footer'da kalacak.

---

## 7. Görseller

- `assets/` içindekileri kullan. `hero-container-cutout.png` arka planı temizlenmiş ürün görselidir (PNG + alpha).
- **AVIF/WebP + `srcset`** üret: 640, 960, 1440 ve 2000 genişlikler. Hero görseline `fetchpriority="high"` ver, diğerlerine `loading="lazy"` + `decoding="async"`. CLS olmaması için `width`/`height` ya da `aspect-ratio` ver.
- Kaynak görseller 836px'ten 2× büyütüldü. **Yüksek çözünürlüklü halleri gelince değiştirilecek** (§12). Dosya adlarını koru ki değişim kolay olsun.
- Görsellerdeki konteyner logosu (dolu lacivert altıgen, sans-serif yazı) resmi logodan (`logo-original.jpg`) farklı. Bunu bana bildir, görsel üretimi düzeltilecek.

---

## 8. Erişilebilirlik

- Tüm etkileşimler gerçek `<button>`/`<a>`. Akordeonda `aria-expanded`, adımlarda `role="tab"` + `aria-selected`.
- Canlı değişen metinlerde `aria-live="polite"` (sahne kartı, hero durumu).
- Dekoratif öğelerde `aria-hidden`: dev yazı, gölge, buton etiketinin ikinci kopyası, WebGL canvas'ları.
- Odak halkası: `outline: 2px solid var(--accent); outline-offset: 3–4px`.
- Kontrast AA. `--muted` küçük metinde ≥4.5:1 olmalı; kontrol et.
- `prefers-reduced-motion` tam desteklenmeli (§5).
- Form: her input'un görünmez `<label>`'ı var (cümle formda `sr-only`). Telefon `type="tel" inputmode="tel" autocomplete="tel" required`.

---

## 9. Performans hedefleri

- Lighthouse (mobil): Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- LCP < 2.5s (hero görseli), CLS < 0.05.
- three ve liquid motoru ayrı chunk'larda, lazy yüklenmeli.
- GSAP'tan yalnızca kullanılan eklentiler. Ölçülen bundle boyutunu raporla.
- WebGL sahneleri görünmezken durmalı. 60fps hedefle; düşük güçlü cihazda (`navigator.hardwareConcurrency <= 4` ya da `deviceMemory <= 4`) parçacık sayısını yarıya indir.

---

## 10. SEO ve meta

- `<html lang="tr">`.
- Title: "OSB ENERGY — Fabrikalar için enerji depolama (BESS)".
- Meta description: "Elektriği ucuz saatlerde depolayın, puantta kullanın. Organize sanayi bölgelerindeki fabrikalara özel batarya enerji depolama sistemleri: fizibilite, kurulum, 7/24 izleme."
- Open Graph görseli: hero kompozisyonundan 1200×630.
- `Organization` + `LocalBusiness` JSON-LD: ad, telefonlar, e-posta, web, adres "Central Balat" (tam adresi bana sor).
- Tek H1, sıralı H2'ler.

---

## 11. Fazlar ve kabul kriterleri

Her fazın sonunda dur, önizleme göster, onay al.

1. **Temel:** Token'lar (`@theme` ve CSS değişkenleri), font, layout iskeleti, menü, butonlar (§3.4 birebir), tüm bölümler statik ve metinler birebir.
   - **Kabul:** Ekran görüntüleri `reference/screenshots/` ile yan yana, 1440px ve 390px genişlikte.
2. **Hareket:** Lenis, açılış, parallax, girişler, sayaçlar, akordeon, sektör şeridi, mıknatıs ve menü saklanma.
   - **Kabul:** Reduced-motion'da hiçbir şey hareket etmiyor ve içerik eksiksiz görünüyor.
3. **Pin'li sahneler:** "Elektriğin yolunu izleyin" pin + aşamalar (önce CSS fallback ile), ardından Yolculuk pin'i.
   - **Kabul:** Pin sonrası bölümler üst üste binmiyor; sayfa yüksekliği doğru; anchor linkler doğru konuma gidiyor.
4. **WebGL:** Sahne shader'ı + LED + akış, ardından footer parçacık logo.
   - **Kabul:** Doku yüklenmezse fallback görünüyor; görünmezken GPU boşta; konsolda hata yok.
5. **Form ve son:** Form gönderimi (§12), SEO, görsel optimizasyonu, Lighthouse raporu ve tarayıcı testi (Chrome, Safari, Firefox; iOS Safari ve Android Chrome).

**Yapma listesi:**
- Metin uydurma.
- Renkleri "iyileştirme".
- Accent'i büyük yüzeylerde kullanma.
- Hero'ya parçacık efekti koyma.
- Dekoratif SVG arka plan ekleme.
- Büyük harfli başlık kullanma.
- Yeni bölüm ekleme.
- Onaysız bağımlılık ekleme.

---

## 12. Başlamadan önce bana sorman gerekenler

1. Form gönderimi nereye gidecek (e-posta servisi, CRM, kendi API'miz)? Fatura dosyası nereye yüklenecek, boyut sınırı ne?
2. Tam adres (Central Balat'ın açık adresi) ve KVKK metninin linki.
3. Yüksek çözünürlüklü görseller ve logoyla uyumlu yeni görseller ne zaman gelecek?
4. Analytics / etiket yönetimi (GA4, GTM, Meta Pixel) var mı? Varsa çerez onayı gerekecek.
5. Palet B ve C sitede tema seçeneği olarak sunulacak mı, yoksa yalnızca A mı yayına çıkacak?
6. Mevcut sitedeki diğer sayfalar bu tasarım diline taşınacak mı, yoksa yalnızca landing mi?
