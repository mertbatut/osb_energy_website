import { CONTACT } from "../../constants/content.js";
import SectionHeading from "../ui/SectionHeading.jsx";
import InheritButton from "../ui/InheritButton.jsx";

/** Contact section: sentence form + contact info sidebar. */
export default function Contact() {
  const f = CONTACT.formLabels;

  return (
    <section id="iletisim" style={{ background: "var(--bg-alt)", padding: "var(--section-pad) 0" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "64px 96px",
          alignItems: "flex-start",
        }}
      >
        {/* Left: heading + info */}
        <div
          style={{
            flex: "1 1 360px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <SectionHeading kicker={CONTACT.kicker} headline={CONTACT.headline} />
          <p className="lead up">{CONTACT.lead}</p>

          <dl
            className="up"
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid var(--line)",
            }}
          >
            {CONTACT.infoItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <dt style={{ color: "var(--muted)" }}>{item.label}</dt>
                <dd style={{ textAlign: "right" }}>
                  {item.values.map((v, i) =>
                    v.href ? (
                      <span key={i}>
                        {i > 0 && <br />}
                        <a
                          href={v.href}
                          {...(v.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          style={{
                            color: "var(--ink)",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          {v.text}
                        </a>
                      </span>
                    ) : (
                      <span key={i} style={{ color: "var(--ink)", fontWeight: 700 }}>
                        {v.text}
                      </span>
                    ),
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: sentence form */}
        <form
          className="up form-card"
          style={{
            flex: "1.3 1 520px",
            minWidth: 0,
            background: "var(--card)",
            borderRadius: "var(--r-card)",
            padding: "clamp(28px, 4vw, 56px)",
            boxShadow: "0 30px 80px rgba(20,22,30,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            // TODO(debt): implement submitLead(formData) — Faz 5
          }}
        >
          <p
            className="mont"
            style={{
              fontWeight: 600,
              fontSize: "clamp(1.25rem, 2.1vw, 1.75rem)",
              lineHeight: 1.85,
              color: "var(--ink)",
            }}
          >
            {f.greeting}{" "}
            <label className="sr-only" htmlFor="f-ad">
              Adınız
            </label>
            <input
              className="lib"
              id="f-ad"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={f.namePlaceholder}
              style={{ width: "8ch" }}
            />
            {f.namePostfix}{" "}
            <label className="sr-only" htmlFor="f-firma">
              Firma ve OSB
            </label>
            <input
              className="lib"
              id="f-firma"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={f.companyPlaceholder}
              style={{ width: "11ch" }}
            />{" "}
            {f.companyPostfix}{" "}
            <label className="sr-only" htmlFor="f-tel">
              Telefon numaranız
            </label>
            <input
              className="lib"
              id="f-tel"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={f.phonePlaceholder}
              style={{ width: "9ch" }}
              required
            />{" "}
            {f.phonePostfix}
          </p>

          {/* File upload */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: 20,
              background: "var(--bg-alt)",
              borderRadius: "var(--r-card)",
            }}
          >
            <label htmlFor="f-fatura" style={{ fontWeight: 700, color: "var(--ink)" }}>
              {f.fileLabel}{" "}
              <span style={{ fontWeight: 500, color: "var(--muted)" }}>{f.fileOptional}</span>
            </label>
            <input
              id="f-fatura"
              name="invoice"
              type="file"
              multiple
              accept=".pdf,image/*"
              style={{ font: "inherit", fontSize: 15, color: "var(--text)" }}
            />
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{f.fileHint}</span>
          </div>

          {/* Submit */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px 28px",
            }}
          >
            <InheritButton type="submit" magnet>
              {f.submit}
            </InheritButton>
            <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: "36ch" }}>
              {CONTACT.privacyNote}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
