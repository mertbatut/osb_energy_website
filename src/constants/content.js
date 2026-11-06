// All text content — single source of truth for copy.
// Source: sayfa-metinleri.txt (birebir)

export const HERO = Object.freeze({
  kicker: "Öz tüketimli fabrikalar için",
  h1Lines: ["Enerji depolama", "yatırımı"],
  lead: "Elektriği ucuz saatlerde depolayın, pahalı saatlerde kullanın. Fabrikanıza özel batarya sistemini projelendirir, kurar ve yıllarca işletiriz.",
  cta: "Ücretsiz ön değerlendirme",
  ctaSecondary: "Nasıl çalışır?",
  scrollLabel: "Aşağı kaydırın",
  backword: "OSB ENERGY",
  productAlt: "OSB ENERGY logolu beyaz batarya enerji depolama konteyneri",
  batteryStages: Object.freeze([
    { label: "Gece şarjı", hours: [0, 6] },
    { label: "Sabah depolama", hours: [6, 12] },
    { label: "Puant kullanım", hours: [12, 18] },
    { label: "Akşam dengesi", hours: [18, 24] },
  ]),
});

export const TRUST_STRIP = Object.freeze({
  stats: Object.freeze([
    { value: "2018", label: "yılından beri sahada", dataCount: 2018, dataFrom: 1990, isYear: true },
    { value: "100", suffix: "+", label: "tamamlanan proje", dataCount: 100, dataFrom: 0 },
    { value: "%20–30", label: "faturada ortalama tasarruf potansiyeli" },
    { value: "7/24", label: "uzaktan izleme ve teknik destek" },
  ]),
});

export const SOLUTIONS = Object.freeze({
  kicker: "Depolama sistemi",
  headline: "Neyi çözer?",
  lead: "Enerji artık yalnızca tüketilen bir kalem değil; yönetilen bir varlık. Tesisinizde bu dört durumdan biri varsa batarya kendini öder.",
  imageAlt: "Kapağı açık batarya kabini, raflarda batarya modülleri",
  items: Object.freeze([
    {
      title: "Puant saatlerinde yüksek fatura",
      text: "Batarya enerjiyi ucuzken depolar, pahalıyken kullanır. Faturada ortalama %20–30 oranında tasarruf sağlanabilir.",
      iconKey: "chart-bar",
      chartKey: "peak-pricing",
    },
    {
      title: "Pik talep ve güç aşımı cezaları",
      text: "Talep belirli saatlerde sıçrar. Batarya bu pikleri karşılar; ceza ödemezsiniz, trafo büyütmeyi erteleyebilirsiniz.",
      iconKey: "chart-spike",
      chartKey: "peak-shaving",
    },
    {
      title: "Elektrik kesintileri ve üretim duruşları",
      text: "Her saniye bir kesinti bir kayıptır. Sistem arızayı otomatik algılar, milisaniyeler içinde devreye girer; kritik prosesler durmaz.",
      iconKey: "lightning",
      chartKey: "backup-power",
    },
    {
      title: "GES ve RES fazlası boşa gidiyor",
      text: "Güneş ve rüzgârın üretim fazlası depolanır, ihtiyaç anında kullanılır. Öz tüketim oranınız ve yatırım getiriniz artar.",
      iconKey: "sun",
      chartKey: "solar-surplus",
    },
  ]),
});

export const STAGE = Object.freeze({
  kicker: "BESS nasıl çalışır?",
  headline: "Elektriğin yolunu izleyin.",
  lead: "Şebeke, batarya ve fabrikanız arasındaki enerji akışı. Bir aşama seçin; sahadaki ışık ve sistemin davranışı değişsin.",
  labels: Object.freeze({
    grid: "Şebeke",
    bess: "OSB ENERGY BESS",
    factory: "Fabrika",
  }),
  phases: Object.freeze([
    {
      num: "01",
      title: "Gece şarjı",
      text: "Ucuz tarifede şebekeden bataryaya enerji akışı.",
      time: "00:00 – 06:00",
      flow: "Şebeke → Batarya",
    },
    {
      num: "02",
      title: "Gündüz dengesi",
      text: "Fabrika şebekeden beslenirken batarya beklemede.",
      time: "06:00 – 17:00",
      flow: "Şebeke → Fabrika",
    },
    {
      num: "03",
      title: "Puant boşaltma",
      text: "Pahalı saatlerde batarya devreye girer, şebeke yükü düşer.",
      time: "17:00 – 22:00",
      flow: "Batarya → Fabrika",
    },
    {
      num: "04",
      title: "Acil yedek",
      text: "Kesinti algılandığında batarya milisaniyeler içinde devreye girer.",
      time: "Kesinti anı",
      flow: "Batarya → Fabrika (acil)",
    },
  ]),
});

export const FINANCIAL = Object.freeze({
  kicker: "Enerji depolamanın",
  headline: "Finansal etkisi",
  lead: "Örnek hesaplama: orta ölçekli bir fabrika. Uygun projelendirme ve doğru enerji yönetimiyle yatırım kısa sürede geri döner.",
  metrics: Object.freeze([
    { label: "Yıllık elektrik tüketimi", value: "10.000.000", unit: "kWh", dataCount: 10000000 },
    { label: "Depolama kapasitesi", value: "2.500", unit: "kWh / 1.000 kW", dataCount: 2500 },
    {
      label: "Yıllık tahmini tasarruf potansiyeli",
      value: "1,5–2",
      unit: "milyon TL",
      highlighted: true,
    },
    { label: "Tahmini geri dönüş süresi", value: "3–5", unit: "yıl", highlighted: true },
  ]),
  disclaimer:
    "Hesaplamalar örnektir; gerçek değerler tesisin tüketim profili ve şartlarına göre değişir.",
  cta: "Kendi rakamlarınızı hesaplatın",
});

export const JOURNEY = Object.freeze({
  captions: Object.freeze([
    {
      kicker: "Kaydırın, içeri girelim",
      headline: "Dışarıdan bir konteyner.",
    },
    {
      kicker: "İçeride",
      headline: "Fabrikanızın yedek enerjisi.",
      body: "Raf raf batarya modülleri, sıvı soğutma ve 7/24 uzaktan izleme. Kesinti anında milisaniyeler içinde devreye girer.",
    },
    {
      kicker: "Üretim sürekliliği ve",
      headline: "operasyonel güvenlik.",
      body: "Makineleriniz durmaz, ürününüz fireye gitmez, veriniz kaybolmaz.",
    },
  ]),
  outerAlt: "Gün batımında fabrika yanında OSB ENERGY batarya konteyneri",
  innerAlt: "Konteynerin içinde sıralı batarya rafları",
});

export const PROCESS = Object.freeze({
  kicker: "Uçtan uca",
  headline: "Proje sürecimiz",
  lead: "İhtiyaç analizinden işletmeye kadar tek ekip, tek muhatap.",
  steps: Object.freeze([
    {
      num: "01",
      title: "İhtiyaç analizi ve keşif",
      text: "Faturanız ve tüketim profilinizle başlarız.",
    },
    {
      num: "02",
      title: "Fizibilite ve sistem tasarımı",
      text: "Kapasite, tasarruf ve geri dönüş hesabı.",
    },
    {
      num: "03",
      title: "Projelendirme ve mühendislik",
      text: "Tesisinize özel çözüm ve izin süreçleri.",
    },
    {
      num: "04",
      title: "Tedarik ve kurulum",
      text: "Dünya standartlarında ekipman ve saha kurulumu.",
    },
    { num: "05", title: "Test, devreye alma ve eğitim", text: "Ekibinize sistemi teslim ederiz." },
    {
      num: "06",
      title: "Sürekli destek ve izleme",
      text: "7/24 uzaktan izleme, bakım ve raporlama.",
    },
  ]),
});

export const SECTORS = Object.freeze({
  kicker: "Kullanım alanlarımız",
  row1: Object.freeze([
    { text: "Demir-çelik", variant: "s" },
    { text: "Otomotiv", variant: "o" },
    { text: "Tekstil", variant: "s" },
    { text: "Çimento", variant: "o" },
    { text: "Kimya", variant: "s" },
    { text: "Demir-çelik", variant: "o" },
    { text: "Otomotiv", variant: "s" },
  ]),
  row2: Object.freeze([
    { text: "Gıda", variant: "o" },
    { text: "Lojistik", variant: "s" },
    { text: "Soğuk hava depoları", variant: "o" },
    { text: "Veri merkezleri", variant: "s" },
    { text: "Elektronik", variant: "o" },
    { text: "Gıda", variant: "s" },
  ]),
});

export const CONTACT = Object.freeze({
  kicker: "Bizimle",
  headline: "iletişime geçin",
  lead: "Uzman ekibimiz, fabrikanız için en uygun enerji depolama çözümünü sunmaya hazır.",
  infoItems: Object.freeze([
    {
      label: "Telefon",
      values: [
        { text: "0534 949 92 52", href: "tel:+905349499252" },
        { text: "0533 721 16 13", href: "tel:+905337211613" },
      ],
    },
    {
      label: "E-posta",
      values: [
        { text: "contact@osbinternational.com", href: "mailto:contact@osbinternational.com" },
      ],
    },
    {
      label: "Web",
      values: [{ text: "osbenergy.com.tr", href: "https://www.osbenergy.com.tr" }],
    },
    {
      label: "Adres",
      values: [{ text: "Central Balat" }],
    },
  ]),
  formLabels: Object.freeze({
    greeting: "Merhaba, ben",
    namePlaceholder: "adınız",
    namePostfix: ".",
    companyPrefix: "",
    companyPlaceholder: "firma ve OSB",
    companyPostfix: "için enerji depolama değerlendirmesi istiyorum. Beni",
    phonePlaceholder: "telefon",
    phonePostfix: "numarasından arayabilirsiniz.",
    fileLabel: "Elektrik faturanız",
    fileOptional: "(isteğe bağlı)",
    fileHint: "Son 12 ayın faturası değerlendirmeyi hızlandırır. Fotoğraf da olur.",
    submit: "Ön değerlendirme isteyin",
  }),
  privacyNote: "Bilgileriniz yalnızca bu değerlendirme için kullanılır.",
});

export const FOOTER = Object.freeze({
  taglineKicker: "Doğru enerji yönetimi,",
  taglineHeadline: "geleceğinizi güçlendirir.",
  cta: "Teklif alın",
  logoHint: "İmleci logonun üzerinde gezdirin",
  links: Object.freeze([
    { text: "0534 949 92 52", href: "tel:+905349499252" },
    { text: "contact@osbinternational.com", href: "mailto:contact@osbinternational.com" },
    { text: "osbenergy.com.tr", href: "https://www.osbenergy.com.tr" },
  ]),
  legal: "\u00A9 2026 OSB ENERGY",
});
