// All text content extracted from Stitch design reference.
// Single source of truth for copy — keeps components data-free.

export const HERO = Object.freeze({
  headline: "ENERJİNİN ÖTESİNDE.",
  description:
    "Rüzgâr, güneş ve depolama sistemlerini entegre ederek Türkiye'nin enerji altyapısını yeniden tanımlıyoruz. Sanayi için kesintisiz, sürdürülebilir ve maliyet-etkin enerji çözümleri.",
  ctaPrimary: "Fizibilite Talebi",
  ctaSecondary: "Çözümlerimiz",
  secondaryHeadline: "Doğa ile Teknoloji, Bir Arada.",
  secondaryDescription: "Türkiye'nin enerji geleceğini şekillendiren projeler.",
  telemetry: [
    { label: "Aktif Kapasite", value: "1.2 GW" },
    { label: "Çalışma Süresi", value: "%99.7" },
    { label: "CO₂ Azaltım", value: "840K ton" },
  ],
});

export const STORYBOARD = Object.freeze({
  frames: [
    {
      id: "01",
      title: "Saha Analizi",
      description: "Rüzgâr ve güneş potansiyeli ölçümü, arazi değerlendirmesi",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
    },
    {
      id: "02",
      title: "Mühendislik",
      description: "Hibrit sistem tasarımı ve optimizasyon",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    },
    {
      id: "03",
      title: "Kurulum",
      description: "Anahtar teslim proje yönetimi ve devreye alma",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    },
    {
      id: "04",
      title: "İşletme",
      description: "7/24 uzaktan izleme ve bakım hizmetleri",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    },
  ],
});

export const CORPORATE = Object.freeze({
  sectionLabel: "Kurumsal",
  headline: "Sanayi için enerji dönüşümü.",
  description:
    "2018'den bu yana Türkiye'nin önde gelen sanayi bölgelerinde yenilenebilir enerji ve depolama çözümleri sunuyoruz. Mühendislikten işletmeye, uçtan uca entegre hizmet anlayışımızla sektörün güvenilir iş ortağıyız.",
  kpis: [
    { value: "2018", label: "Kuruluş Yılı", suffix: "" },
    { value: "100", label: "Tamamlanan Proje", suffix: "+" },
    { value: "100", label: "Yerli Mühendislik", suffix: "%" },
    { value: "10", label: "Yanıt Süresi", suffix: "ms", prefix: "<" },
  ],
});

export const SERVICES = Object.freeze({
  sectionLabel: "Hizmetler",
  items: [
    {
      id: "res",
      title: "Yenilenebilir Enerji Santralleri",
      subtitle: "RES & GES",
      description:
        "Rüzgâr ve güneş enerjisi santrallerinin fizibilite, tasarım, kurulum ve işletme süreçlerini uçtan uca yönetiyoruz.",
      features: [
        "Saha analizi ve rüzgâr/güneş ölçümü",
        "Türbin ve panel seçimi optimizasyonu",
        "Şebeke bağlantı mühendisliği",
        "SCADA entegrasyonu ve uzaktan izleme",
      ],
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
    },
    {
      id: "bess",
      title: "Enerji Depolama Sistemleri",
      subtitle: "BESS",
      description:
        "Lityum-iyon batarya teknolojisi ile şebeke dengesi, pik yönetimi ve kesintisiz enerji sağlıyoruz.",
      features: [
        "Pik tıraşlama ve yük kaydırma",
        "Frekans regülasyonu desteği",
        "Kısıntı telafisi ve gelir optimizasyonu",
        "Modüler ve ölçeklenebilir mimari",
      ],
      image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80",
    },
  ],
});

export const MARQUEE_IMAGES = Object.freeze([
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
  "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80",
]);

export const BESS_TECH = Object.freeze({
  sectionLabel: "TEKNOLOJİ",
  headline: "Yüksek kapasiteli\nenerji depolama\nsistemleri.",
  description:
    "Endüstriyel ölçekte güvenli, verimli ve uzun ömürlü BESS çözümleriyle şebeke dengesini destekliyor, enerjinin her an kullanılabilir olmasını sağlıyoruz.",
  cta: "Teknolojimizi keşfedin",
  features: [
    { title: "Yüksek Kapasite", description: "MW ölçeğinde esnek konfigürasyonlar", icon: "Zap" },
    {
      title: "Üst Düzey Güvenlik",
      description: "Çok katmanlı BMS ve yangın koruma sistemi",
      icon: "ShieldCheck",
    },
    { title: "Akıllı Yönetim", description: "Gerçek zamanlı izleme ve optimizasyon", icon: "Cpu" },
    {
      title: "Sürdürülebilir Gelecek",
      description: "Yenilenebilir enerji entegrasyonuna tam uyum",
      icon: "Layers",
    },
  ],
});

export const FINANCIAL = Object.freeze({
  sectionLabel: "Kazanımlar",
  headline: "Somut finansal etki.",
  benefits: [
    {
      value: "%20-30",
      title: "Enerji Maliyeti Düşüşü",
      description: "Pik tıraşlama ve optimizasyon ile doğrudan maliyet tasarrufu.",
    },
    {
      value: "0 TL",
      title: "Kısıntı Cezası",
      description: "Depolama ile kısıntı telafisi, sıfır ceza riski.",
    },
    {
      value: "0",
      title: "Plansız Duruş",
      description: "Kesintisiz enerji ile üretim sürekliliği garantisi.",
    },
  ],
  roi: {
    title: "Yatırım Fizibilitesi",
    metrics: [
      { label: "Geri Ödeme", value: "4-6 Yıl" },
      { label: "IRR", value: "%18-24" },
      { label: "NPV Pozitif", value: "3. Yıl" },
      { label: "Ekonomik Ömür", value: "15+ Yıl" },
    ],
  },
});

export const HYBRID = Object.freeze({
  sectionLabel: "Hibrit Sinerji",
  headline: "Rüzgâr + Depolama:\nKesintisiz güç.",
  description:
    "Rüzgâr enerjisi üretimi ile BESS'i entegre ederek kısıntı kayıplarını sıfırlar, şebeke dengesini sağlar ve yatırım getirisini maksimize ederiz.",
  features: [
    {
      title: "Kısıntı Sıfırlama",
      description: "Üretim fazlasını depolayarak kısıntı kayıplarını ortadan kaldırır.",
      icon: "ShieldCheck",
    },
    {
      title: "Frekans Desteği",
      description: "Anlık şebeke frekans regülasyonu ile ek gelir kaynağı oluşturur.",
      icon: "Activity",
    },
  ],
  image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=900&q=80",
});

export const SECTORS = Object.freeze({
  sectionLabel: "Sektörler",
  headline: "Her sektöre özel enerji çözümü.",
  items: [
    {
      title: "Organize Sanayi",
      icon: "Factory",
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&q=80",
    },
    {
      title: "Otomotiv",
      icon: "Car",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=80",
    },
    {
      title: "Gıda & İçecek",
      icon: "UtensilsCrossed",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
    },
    {
      title: "Tekstil",
      icon: "Shirt",
      image: "https://images.unsplash.com/photo-1558171813-01342dfc331a?w=400&q=80",
    },
    {
      title: "Kimya",
      icon: "FlaskConical",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
    },
    {
      title: "Madencilik",
      icon: "Mountain",
      image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&q=80",
    },
    {
      title: "Lojistik",
      icon: "Truck",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80",
    },
    {
      title: "Tarım",
      icon: "Wheat",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80",
    },
  ],
});

export const PROCESS = Object.freeze({
  sectionLabel: "Süreç",
  headline: "Uçtan uca mühendislik süreci.",
  steps: [
    {
      id: "01",
      title: "Keşif & Analiz",
      description: "Saha ziyareti, enerji tüketim analizi ve potansiyel değerlendirmesi.",
    },
    {
      id: "02",
      title: "Fizibilite",
      description: "Teknik ve finansal fizibilite raporu, yatırım modeli.",
    },
    {
      id: "03",
      title: "Tasarım",
      description: "Detaylı mühendislik tasarımı, ekipman seçimi ve tedarik.",
    },
    { id: "04", title: "Kurulum", description: "Anahtar teslim inşaat, montaj ve devreye alma." },
    {
      id: "05",
      title: "Entegrasyon",
      description: "Şebeke bağlantısı, SCADA ve otomasyon entegrasyonu.",
    },
    {
      id: "06",
      title: "İşletme & Bakım",
      description: "7/24 uzaktan izleme, periyodik bakım ve performans optimizasyonu.",
    },
  ],
});

export const PROJECTS = Object.freeze({
  sectionLabel: "Projeler",
  headline: "Referans projelerimiz.",
  items: [
    {
      title: "Manisa OSB RES",
      capacity: "50 MW",
      type: "Rüzgâr Enerji Santrali",
      status: "Tamamlandı",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
    },
    {
      title: "Kayseri OSB BESS",
      capacity: "25 MW / 100 MWh",
      type: "Enerji Depolama",
      status: "Devam Ediyor",
      image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80",
    },
    {
      title: "Bursa OSB Hibrit",
      capacity: "30 MW RES + 15 MW BESS",
      type: "Hibrit Sistem",
      status: "Planlama",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    },
  ],
  sustainability: {
    title: "Sürdürülebilirlik Taahhüdü",
    description:
      "Projelerimiz toplam 840.000 ton CO₂ emisyon azaltımı sağlamış, 12.000'den fazla haneye eşdeğer temiz enerji üretmiştir.",
    stats: [
      { value: "840K", label: "Ton CO₂ Azaltım" },
      { value: "12K+", label: "Hane Eşdeğeri" },
    ],
  },
});

export const CTA = Object.freeze({
  headline: "Enerji dönüşümüne\nbugün başlayın.",
  description:
    "Tesisiniz için ücretsiz fizibilite raporu talep edin. Mühendislik ekibimiz 48 saat içinde size özel analiz sunacaktır.",
  ctaPrimary: "Fizibilite Talebi",
  ctaSecondary: "info@osbenergy.com",
  phone: "+90 (312) 000 00 00",
  address: "OSB ENERGY Merkez Ofis, Ankara Sanayi Odası, Türkiye",
});

export const FOOTER = Object.freeze({
  brand: "OSB ENERGY",
  tagline: "Enerjinin Ötesinde.",
  columns: [
    {
      title: "Hizmetler",
      links: [
        { label: "Rüzgâr Enerjisi", href: "#hizmetler" },
        { label: "Güneş Enerjisi", href: "#hizmetler" },
        { label: "Enerji Depolama", href: "#hizmetler" },
        { label: "Hibrit Sistemler", href: "#hizmetler" },
      ],
    },
    {
      title: "Kurumsal",
      links: [
        { label: "Hakkımızda", href: "#hakkimizda" },
        { label: "Projeler", href: "#projeler" },
        { label: "Sürdürülebilirlik", href: "#projeler" },
        { label: "Kariyer", href: "#iletisim" },
      ],
    },
    {
      title: "İletişim",
      links: [
        { label: "info@osbenergy.com", href: "mailto:info@osbenergy.com" },
        { label: "+90 (312) 000 00 00", href: "tel:+903120000000" },
        { label: "LinkedIn", href: "#" },
        { label: "Twitter", href: "#" },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} OSB ENERGY. Tüm hakları saklıdır.`,
  badges: ["ISO 9001", "ISO 14001", "ISO 45001"],
});
