// Edit this list to change the services shown in the strip.
export const heroServices = [
  "Meta Ads",
  "Google Ads",
  "Web Development",
  "App Development",
  "Creative Design",
  "Graphic Design",
  "Social Media",
  "Content Creation",
  "SEO",
  "Brand Strategy",
  "Video Production",
  "And more",
];

export default function HeroServiceScroller() {
  return (
    <div className="hero-service-strip">
      <div className="hero-scroller" tabIndex={0} role="region" aria-label="Our services. Hover or focus to pause scrolling.">
        <div className="hero-scroller-track">
          {[0, 1].map((copy) => (
            <div className="hero-scroller-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {heroServices.map((service, index) => (
                <div className={`hero-scroller-service service-tone-${index % 3}`} key={service}>
                  <span>{service}</span>
                  <span className="service-divider" aria-hidden="true" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
