import Image from "next/image";
import "./TrustedBrands.css";

// Add your public-folder image paths here.
// Example: public/brands/logo.png -> src: "/brands/logo.png"
// Empty src values show placeholders until you add your logos.
export const brandImages = [
  { src: "/brands/COZYCABS1.jpg", alt: "Cozy Cabs" },
  { src: "/brands/cupid.webp", alt: "Cupid" },
  { src: "/brands/donmiller1.png", alt: "Donmiller" },
  { src: "/brands/DRONACHARYA1.png", alt: "Dronacharya" },
  { src: "/brands/e-travel.avif", alt: "E-Travel" },
  { src: "/brands/empire1.png", alt: "Empire" },
  { src: "/brands/hardoll.png", alt: "Hardoll" },
  { src: "/brands/hub1.png", alt: "Hub" },
  { src: "/brands/isu1.png", alt: "ISU" },
  { src: "/brands/kapurthala.png", alt: "Kapurthala" },
  { src: "/brands/madverse.png", alt: "Madverse" },
  { src: "/brands/nira.png", alt: "Nira" },
  { src: "/brands/nira (1).png", alt: "Nira" },
  { src: "/brands/NUVOICE.png", alt: "Nuvoice" },
  { src: "/brands/opine_stores1.png", alt: "Opine Stores" },
  { src: "/brands/polki1.png", alt: "Polki" },
  { src: "/brands/smart_saver.png", alt: "Smart Saver" },
  { src: "/brands/the_binge_town.png", alt: "The Binge Town" },
  { src: "/brands/the_core1.png", alt: "The Core" },
  { src: "/brands/uberlyfe1.png", alt: "Uberlyfe" },
  { src: "/brands/Woila-silver.jpeg", alt: "Woila Silver" },
  { src: "/brands/woolen_house1.png", alt: "Woolen House" },
];

export default function TrustedBrands({ children }) {
  if (!brandImages.length) return null;
  const scrollingBrands = Array.from(
    { length: Math.max(10, brandImages.length) },
    (_, index) => brandImages[index % brandImages.length],
  );

  return (
    <section className="trusted-brands-section" aria-labelledby="trusted-brands-heading">
      <p className="trusted-brands-eyebrow">Partnerships built on trust</p>
      <h2 id="trusted-brands-heading" className="trusted-brands-heading">Trusted by brands</h2>
      {children}
      <div className="trusted-brands-scroller" tabIndex={0} role="region" aria-label="Trusted brands. Hover or focus to pause scrolling.">
        <div className="trusted-brands-track">
          {[0, 1].map((copy) => (
            <div className="trusted-brands-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {scrollingBrands.map((brand, index) => (
                <div className="trusted-brands-logo" key={index}>
                  {brand.src ? (
                    <Image src={brand.src} alt={copy === 1 ? "" : brand.alt} width={140} height={44} className="trusted-brands-image" />
                  ) : (
                    <span className="trusted-brands-placeholder">{brand.alt}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
