import "./SectionHeading.css";

export default function SectionHeading({ id, eyebrow, title, accent, children }) {
  return <header className="section-heading">
    <p className="section-heading-eyebrow">{eyebrow}</p>
    <h2 className="section-heading-title" id={id} tabIndex={-1}>{title}<br /><span>{accent}</span></h2>
    <p className="section-heading-description">{children}</p>
  </header>;
}
