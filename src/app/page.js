import HeroVisual from "./components/HeroVisual";
import { site } from "./site";
import HeroServiceScroller from "./components/HeroServiceScroller";
import { ArrowUpRight } from "lucide-react";
import GatewayExperience from "./components/services/GatewayExperience";
import Services from "./components/services/Services";
import MetroJourney from "./components/metro/MetroJourney";
import TrustedBrands from "./components/TrustedBrands";
import AgencyStats from "./components/AgencyStats";
import ResultsShowcase from "./components/ResultsShowcase";

// Placeholder content: replace with your final headline, description and CTA.
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            description: site.description,
            ...(site.url
              ? { url: site.url, "@id": `${site.url}/#organization` }
              : {}),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <GatewayExperience services={<Services />}>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">
              Unnity Media · Digital Marketing · Development House
            </p>
            <h1 id="hero-heading">
              Building Digital Brands.
              <br />
              That Drive Growth.
            </h1>
            <p className="hero-description">
              At Unnity, we build brands through creative design, digital
              solutions, and strategic marketing that drive growth.
            </p>
            <a
              href="https://calendly.com/sayam-unnity/30min"
              className="primary-cta"
              type="button"
            >
              Work With Us <ArrowUpRight size={22} />
            </a>
            <button className="primary-cta" type="button">
              View Portfolio <ArrowUpRight size={22} />
            </button>
            <ul className="hero-services" aria-label="Our expertise">
              <li>Brand strategy</li>
              <li>Paid media</li>
              <li>Content & creative</li>
            </ul>
          </div>
          <HeroVisual />
          <HeroServiceScroller />
        </section>
      </GatewayExperience>
      <TrustedBrands />
      <AgencyStats />
      <MetroJourney />
      <ResultsShowcase />
      {/* <section className="project-invitation" aria-labelledby="project-heading">
        <div>
          <p>Your ambition. Our next conversation.</p>
          <h2 id="project-heading">
            Let’s make your
            <br />
            next chapter count.
          </h2>
        </div>
        <a href="https://calendly.com/sayam-unnity/30min">
          Start a conversation <ArrowUpRight size={22} />
        </a>
      </section> */}
    </main>
  );
}
