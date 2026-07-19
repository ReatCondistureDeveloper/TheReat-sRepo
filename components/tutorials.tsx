import { Clock, Tag, ArrowRight, BookOpen } from "lucide-react"

const articles = [
  {
    category: "Terminal",
    categoryColor: "#4ade80",
    title: "Bash Scripting: Otomasyon ile Hayatını Kolaylaştır",
    excerpt:
      "Tekrarlayan görevleri otomatize etmek için bash script yazma rehberi. Döngüler, koşullar ve fonksiyonlar.",
    time: "12 dk",
    tags: ["bash", "otomasyon", "script"],
    cmd: "chmod +x script.sh && ./script.sh",
    featured: true,
  },
  {
    category: "Sistem",
    categoryColor: "#facc15",
    title: "systemd ile Servis Yönetimi",
    excerpt:
      "Linux'ta servisler nasıl yönetilir? systemctl komutları, servis dosyaları ve otomatik başlatma.",
    time: "8 dk",
    tags: ["systemd", "servis", "init"],
    cmd: "systemctl enable --now myservice",
    featured: false,
  },
  {
    category: "Güvenlik",
    categoryColor: "#22d3ee",
    title: "SSH Güvenliği: En İyi Pratikler",
    excerpt:
      "SSH yapılandırması, anahtar bazlı kimlik doğrulama ve sunucunuzu brute-force saldırılarından koruma.",
    time: "10 dk",
    tags: ["ssh", "güvenlik", "sunucu"],
    cmd: "ssh-keygen -t ed25519 -C 'user@host'",
    featured: false,
  },
  {
    category: "Ağ",
    categoryColor: "#4ade80",
    title: "ip ve ss Komutlarıyla Ağ Yönetimi",
    excerpt:
      "Modern Linux ağ araçları: ip komutu ile arayüz yönetimi, ss ile soket izleme ve ağ sorunlarını giderme.",
    time: "7 dk",
    tags: ["ağ", "ip", "ss"],
    cmd: "ip addr show && ss -tulpn",
    featured: false,
  },
  {
    category: "Dosya Sistemi",
    categoryColor: "#facc15",
    title: "Linux Dosya Sistemi Hiyerarşisi Rehberi",
    excerpt:
      "FHS standardı nedir? /etc, /var, /usr, /proc dizinleri ne işe yarar? Her şeyi sıfırdan öğren.",
    time: "6 dk",
    tags: ["dosya sistemi", "FHS", "dizinler"],
    cmd: "man hier",
    featured: false,
  },
  {
    category: "Paket",
    categoryColor: "#22d3ee",
    title: "Flatpak, Snap ve AppImage Karşılaştırması",
    excerpt:
      "Evrensel Linux paket formatları arasındaki farklar, avantajlar ve dezavantajlar. Hangisini kullanmalısın?",
    time: "9 dk",
    tags: ["flatpak", "snap", "appimage"],
    cmd: "flatpak install flathub app.id",
    featured: false,
  },
]

export function Tutorials() {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <section id="egitimler" className="py-24 border-t border-[#1e2e1e]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#4ade80] mb-3">
              <span className="text-muted-foreground">$</span>
              <span>find /tutorials -name &quot;*.md&quot; | head -6</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground text-balance">
              Eğitimler &amp; Rehberler
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl leading-relaxed">
              Terminal komutlarından sistem yönetimine, ağ yapılandırmasından güvenliğe kadar her konu.
            </p>
          </div>
          <a
            href="#egitimler"
            className="flex items-center gap-1.5 text-sm font-mono text-muted-foreground hover:text-[#4ade80] transition-colors whitespace-nowrap"
          >
            <BookOpen size={14} />
            Tüm Eğitimler
            <ArrowRight size={12} />
          </a>
        </div>

        {/* Featured + grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Featured article (large) */}
          <div className="lg:col-span-2 border border-[#4ade80]/30 rounded-lg bg-[#0f140f] overflow-hidden group cursor-pointer hover:border-[#4ade80]/60 transition-all duration-300">
            <div className="p-6 flex flex-col h-full gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    color: featured.categoryColor,
                    border: `1px solid ${featured.categoryColor}40`,
                    background: `${featured.categoryColor}10`,
                  }}
                >
                  {featured.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground bg-[#162016] px-2 py-0.5 rounded">
                  Öne Çıkan
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-mono font-bold text-foreground leading-snug text-balance group-hover:text-[#4ade80] transition-colors">
                {featured.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{featured.excerpt}</p>

              {/* Code snippet */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#080c08] rounded border border-[#1e2e1e] font-mono text-sm">
                <span className="text-[#4ade80]">$</span>
                <span className="text-foreground text-xs md:text-sm">{featured.cmd}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                    <Clock size={11} />
                    {featured.time} okuma
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono text-muted-foreground border border-[#1e2e1e] px-1.5 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs font-mono text-[#4ade80] group-hover:underline flex items-center gap-1">
                  Oku <ArrowRight size={11} />
                </span>
              </div>
            </div>
          </div>

          {/* Right column: small cards */}
          <div className="space-y-4">
            {rest.slice(0, 3).map((article) => (
              <div
                key={article.title}
                className="border border-[#1e2e1e] rounded-lg bg-[#0f140f] p-4 group cursor-pointer hover:border-[#1e2e1e]/70 hover:bg-[#111811] transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{
                      color: article.categoryColor,
                      border: `1px solid ${article.categoryColor}40`,
                      background: `${article.categoryColor}10`,
                    }}
                  >
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground ml-auto">
                    <Clock size={10} />
                    {article.time}
                  </div>
                </div>
                <h3 className="text-sm font-mono font-bold text-foreground leading-snug group-hover:text-[#4ade80] transition-colors text-balance">
                  {article.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          {rest.slice(3).map((article) => (
            <div
              key={article.title}
              className="border border-[#1e2e1e] rounded-lg bg-[#0f140f] p-5 group cursor-pointer hover:border-[#1e2e1e]/70 hover:bg-[#111811] transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{
                    color: article.categoryColor,
                    border: `1px solid ${article.categoryColor}40`,
                    background: `${article.categoryColor}10`,
                  }}
                >
                  {article.category}
                </span>
              </div>
              <h3 className="text-sm font-mono font-bold text-foreground leading-snug mb-2 group-hover:text-[#4ade80] transition-colors text-balance">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <Clock size={10} />
                  {article.time}
                </div>
                <span className="text-xs font-mono text-[#4ade80] group-hover:underline flex items-center gap-1">
                  Oku <ArrowRight size={10} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
