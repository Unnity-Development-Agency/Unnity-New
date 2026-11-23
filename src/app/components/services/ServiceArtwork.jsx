// Photo-backed illustrative interfaces; not live client screenshots or performance claims.
const leather = "/images/services/donmiller-leather.webp";
const fashion = "/images/services/cupid-plus-size.webp";
function Photo({src, x, y, width, height}) {
  return <image href={src} x={x} y={y} width={width} height={height} preserveAspectRatio={src === fashion ? "xMidYMin slice" : "xMidYMid slice"} />;
}
function BrowserBar({width=550, label="unnity.com"}) {
  return <g><rect width={width} height="28" rx="5" fill="#f1f1f3"/><circle cx="13" cy="14" r="3" fill="#ff5f57"/><circle cx="24" cy="14" r="3" fill="#febc2e"/><circle cx="35" cy="14" r="3" fill="#28c840"/><rect x="100" y="6" width={width-200} height="17" rx="4" fill="#fff"/><text x={width/2} y="18" textAnchor="middle" fontSize="8" fill="#777">{label}</text></g>;
}
function Development() {
  return <>
    <defs><linearGradient id="macbook-base" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f1f1f3"/><stop offset=".5" stopColor="#b9bbc1"/><stop offset="1" stopColor="#8c8e96"/></linearGradient><linearGradient id="iphone-edge"><stop stopColor="#85818a"/><stop offset=".2" stopColor="#29272d"/><stop offset=".8" stopColor="#151419"/><stop offset="1" stopColor="#8d8991"/></linearGradient></defs>
    <rect width="640" height="460" fill="#e9e6ef"/>
    <g transform="translate(35 56)">
      <rect width="520" height="314" rx="12" fill="#b7b8be"/>
      <rect x="2" y="2" width="516" height="309" rx="10" fill="#202126"/>
      <circle cx="260" cy="8" r="2" fill="#414955"/>
      <svg x="9" y="16" width="502" height="280" viewBox="0 0 502 280" overflow="hidden">
        <g className="preview-build"><image href="/images/services/unnity-hero-desktop.webp" width="502" height="280" preserveAspectRatio="xMidYMin meet" /></g>
      </svg>
      <text x="260" y="307" textAnchor="middle" fontSize="6" fill="#b2b2b8">MacBook Pro</text>
      <path d="M-25 314h570v7q-12 10-35 10H10q-23 0-35-10Z" fill="url(#macbook-base)" stroke="#a7a7af" strokeWidth=".5"/>
      <path d="M217 314h86l-4 5h-78Z" fill="#9a9ba3"/>
    </g>
    <g transform="translate(458 132)">
      <rect x="-2" y="53" width="3" height="21" rx="1" fill="#66616c"/><rect x="-2" y="83" width="3" height="31" rx="1" fill="#66616c"/><rect x="155" y="77" width="3" height="39" rx="1" fill="#66616c"/>
      <rect width="156" height="307" rx="25" fill="url(#iphone-edge)"/>
      <rect x="3" y="3" width="150" height="301" rx="23" fill="#111115"/>
      <rect x="7" y="7" width="142" height="293" rx="19" fill="#fdfcfe"/>
      <svg x="9" y="27" width="138" height="260" viewBox="0 0 138 260" overflow="hidden"><image href="/images/services/unnity-hero-mobile.webp" width="138" height="280" preserveAspectRatio="xMidYMin meet" /></svg>
      <rect x="54" y="12" width="48" height="13" rx="7" fill="#111115"/><circle cx="94" cy="18" r="2.4" fill="#263144"/>
      <path d="M59 294h38" stroke="#26212d" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <text x="35" y="421" fontSize="10" fill="#766681">Unnity / Designed for every screen.</text>
  </>;
}
function Meta() {
  return <>
    <rect width="640" height="460" fill="#f0eded"/>
    <g transform="translate(24 20)">
      <rect width="323" height="420" rx="8" fill="#fff" stroke="#dedddd"/>
      <text x="15" y="28" fontSize="19" fontWeight="600" letterSpacing="-.7" fill="#202020">Instagram</text><path d="M275 17h14v13h-14Zm6-3v19m-9-10h20" stroke="#333" fill="none"/>
      <path d="M0 40h323" stroke="#eee"/>
      <circle cx="25" cy="64" r="14" fill="#35241c"/><text x="16" y="68" fontSize="9" fill="#f6e5cf">DM</text>
      <text x="48" y="60" fontSize="11" fontWeight="600" fill="#222">Donmiller</text><text x="48" y="75" fontSize="8" fill="#777">Sponsored</text><text x="292" y="63" fontSize="15" fill="#444">...</text>
      <Photo src={leather} x={0} y={87} width={323} height={226}/>
      <rect y="87" width="323" height="44" fill="#f5ead5" fillOpacity=".85"/>
      <text x="18" y="115" fontSize="22" letterSpacing="-.6" fill="#3a241a">Carry quality. Every day.</text>
      <rect y="313" width="323" height="29" fill="#edf5ff"/><text x="15" y="332" fontSize="10" fontWeight="600" fill="#0866cc">Shop now</text><path d="m302 323 5 5-5 5" fill="none" stroke="#0866cc" strokeWidth="1.5"/>
      <g stroke="#262626" strokeWidth="1.5" fill="none"><path d="M17 355c-7-8-16 5 0 14 16-9 7-22 0-14Z"/><path d="M41 353h14v12H45l-4 4Z"/><path d="m69 353 16 0-7 17-3-10-6-7 16 0-10 7"/><path d="M297 352h10v17l-5-4-5 4Z"/></g>
      <text x="14" y="389" fontSize="9" fontWeight="600" fill="#333">Donmiller</text><text x="70" y="389" fontSize="9" fill="#555">Belts &amp; wallets, made for your everyday.</text><text x="14" y="406" fontSize="8" fill="#888">Discover the leather collection.</text>
    </g>
    <g transform="translate(367 20)">
      <rect width="249" height="420" rx="15" fill="#211b18"/>
      <Photo src={leather} x={7} y={72} width={235} height={276}/>
      <path d="M14 13h221" stroke="#75665b" strokeWidth="2"/><path className="preview-story" d="M14 13h221" pathLength="1" stroke="#fff" strokeWidth="2"/>
      <circle cx="25" cy="38" r="12" fill="#6c4e3b"/><text x="17" y="42" fontSize="8" fill="#fff">DM</text><text x="45" y="36" fontSize="10" fill="#fff">Donmiller</text><text x="45" y="49" fontSize="7" fill="#d4c7bd">Sponsored</text><path d="m222 32 9 9m0-9-9 9" stroke="#fff"/>
      <text x="22" y="106" fontSize="25" letterSpacing="-1" fill="#3e281c">The finishing touch.</text>
      <text x="23" y="126" fontSize="8" letterSpacing="1" fill="#72513c">BELTS / WALLETS / EVERYDAY ESSENTIALS</text>
      <rect x="41" y="358" width="167" height="31" rx="16" fill="#fff"/><text x="87" y="378" fontSize="10" fontWeight="500" fill="#35241c">Shop collection</text>
      <text className="preview-checkout" x="80" y="406" fontSize="8" fill="#cdbfb4">Publishing campaign...</text><text className="preview-confirm" x="92" y="406" fontSize="8" fill="#cdbfb4">Campaign is live</text>
    </g>
  </>;
}
function Google() {
  return <>
    <rect width="640" height="460" fill="#eef0f3"/>
    <g transform="translate(20 22)">
      <rect width="600" height="416" rx="7" fill="#fff" stroke="#dadce0"/><BrowserBar width={600} label="google.com/search"/>
      <text x="22" y="67" fontSize="22" fontWeight="500"><tspan fill="#4285f4">G</tspan><tspan fill="#ea4335">o</tspan><tspan fill="#fbbc05">o</tspan><tspan fill="#4285f4">g</tspan><tspan fill="#34a853">l</tspan><tspan fill="#ea4335">e</tspan></text>
      <rect x="111" y="42" width="464" height="37" rx="18" fill="#f1f3f4"/><text className="preview-query" x="129" y="65" fontSize="12" fill="#202124">digital marketing agency near me</text><circle cx="551" cy="58" r="6" stroke="#4285f4" fill="none"/><path d="m555 63 5 5" stroke="#4285f4"/>
      <text x="115" y="103" fontSize="10" fill="#1a73e8">All</text><text x="155" y="103" fontSize="10" fill="#5f6368">Shopping</text><text x="230" y="103" fontSize="10" fill="#5f6368">Images</text><text x="294" y="103" fontSize="10" fill="#5f6368">Videos</text><path d="M0 116h600" stroke="#ebebeb"/>
      <g className="preview-result">
        <text x="28" y="143" fontSize="9" fontWeight="600" fill="#202124">Sponsored</text><circle cx="40" cy="163" r="10" fill="#2a1650"/><text x="33" y="166" fontSize="7" fill="#fff">u.</text><text x="57" y="160" fontSize="11" fill="#202124">Unnity</text><text x="57" y="174" fontSize="8" fill="#5f6368">Unnity / Digital marketing &amp; development</text>
        <text x="28" y="202" fontSize="20" fill="#1a0dab">Unnity | Digital Marketing That Drives Growth</text>
        <text x="28" y="224" fontSize="10" fill="#4d5156">Grow your brand with Meta ads, Google Ads, websites and apps.</text><text x="28" y="240" fontSize="10" fill="#4d5156">Strategy, design and performance. Book a discovery call with Unnity.</text>
        <text x="28" y="267" fontSize="12" fill="#1a0dab">Our Services</text><text x="165" y="267" fontSize="12" fill="#1a0dab">Web &amp; App Development</text><text x="365" y="267" fontSize="12" fill="#1a0dab">Contact Us</text>
      </g>
      <path d="M28 285h544" stroke="#eee"/>
      <image href="/images/services/unnity-hero-desktop.webp" x="28" y="298" width="145" height="89" preserveAspectRatio="xMidYMid meet"/><text x="190" y="316" fontSize="13" fill="#202124">Unnity - Build your next chapter</text><text x="190" y="338" fontSize="10" fill="#70757a">Brand strategy. Paid media. Web &amp; app development.</text><text x="190" y="362" fontSize="10" fill="#1a0dab">Explore our work</text><text x="190" y="385" fontSize="8" fill="#70757a">Creative thinking, built around your business.</text>
    </g>
  </>;
}
function Identity() {
  return <>
    <rect width="640" height="460" fill="#ece5dc"/>
    <g transform="translate(20 26)">
      <rect width="600" height="396" rx="5" fill="#fbf8f3" stroke="#d5ccc0"/><BrowserBar width={600} label="Cupid Clothing / The new collection"/>
      <rect y="28" width="600" height="18" fill="#542635"/><text x="300" y="40" textAnchor="middle" fontSize="7" letterSpacing="1" fill="#f8ede4">STYLE HAS NO SIZE / XL TO 7XL</text>
      <image href="/images/services/cupid-official-logo.svg" x="20" y="51" width="100" height="40" preserveAspectRatio="xMinYMid meet" />
      <text x="217" y="73" fontSize="9" fill="#63474c">Women</text><text x="278" y="73" fontSize="9" fill="#63474c">Men</text><text x="325" y="73" fontSize="9" fill="#63474c">New arrivals</text><text x="412" y="73" fontSize="9" fill="#63474c">Our fit</text><text x="528" y="73" fontSize="9" fill="#63474c">Bag (0)</text>
      <Photo src={fashion} x={263} y={103} width={320} height={277}/>
      <text x="24" y="139" fontSize="8" letterSpacing="1.4" fill="#916d70">CONFIDENCE, IN EVERY SIZE.</text>
      <text x="22" y="184" fontSize="33" letterSpacing="-1.2" fill="#542635">Made for you.</text><text x="22" y="220" fontSize="33" letterSpacing="-1.2" fill="#542635">All of you.</text>
      <text x="25" y="249" fontSize="9" fill="#8c6b6d">Plus-size clothing that fits your life.</text><text x="25" y="264" fontSize="9" fill="#8c6b6d">Easy silhouettes. A little more you.</text>
      <rect x="24" y="284" width="153" height="30" fill="#542635"/><text x="45" y="303" fontSize="9" fill="#fff">Find your everyday fit</text>
      <text x="25" y="341" fontSize="8" fill="#8c6b6d">YOUR SIZE. YOUR STYLE.</text>
      {['XL','2XL','3XL','4XL','5XL','6XL','7XL'].map((size,i)=><g key={size}><rect x={24+i*32} y="352" width="28" height="23" fill={i===2 ? '#542635' : '#f3ece4'} stroke="#dbcac4"/><text x={38+i*32} y="367" textAnchor="middle" fontSize="8" fill={i===2 ? '#fff' : '#74545c'}>{size}</text></g>)}
    </g>
    <text x="26" y="444" fontSize="9" letterSpacing=".8" fill="#84676b">CUPID CLOTHING / A BRAND THAT MAKES ROOM FOR EVERYONE.</text>
  </>;
}

function LinkedIn() {
  return <>
    <rect width="640" height="460" fill="#f3f2ef"/>
    <rect width="640" height="45" fill="#fff"/>
    <rect x="24" y="10" width="26" height="26" rx="3" fill="#0a66c2"/>
    <text x="28" y="30" fontSize="22" fontWeight="700" fill="#fff">in</text>
    <rect x="61" y="10" width="190" height="26" rx="3" fill="#edf3f8"/>
    <circle cx="76" cy="22" r="5" fill="none" stroke="#536471"/><path d="m80 26 4 4" stroke="#536471"/>
    <text x="94" y="27" fontSize="10" fill="#536471">Search</text>
    <text x="325" y="28" fontSize="10" fill="#68737a">Home</text><text x="389" y="28" fontSize="10" fill="#68737a">My Network</text><text x="480" y="28" fontSize="10" fill="#68737a">Jobs</text><text x="532" y="28" fontSize="10" fill="#68737a">Messaging</text>
    <g transform="translate(24 61)">
      <rect width="378" height="380" rx="7" fill="#fff" stroke="#deddda"/>
      <rect x="14" y="14" width="38" height="38" rx="2" fill="#2a1650"/>
      <text x="20" y="41" fontSize="29" fontWeight="600" fill="#fff">u.</text>
      <text x="63" y="27" fontSize="13" fontWeight="600" fill="#202124">Unnity</text>
      <text x="63" y="41" fontSize="8" fill="#666">Digital marketing &amp; development</text>
      <text x="63" y="53" fontSize="8" fill="#777">Promoted</text>
      <text x="306" y="29" fontSize="10" fill="#0a66c2">+ Follow</text>
      <text x="15" y="76" fontSize="10" fill="#353535">Your next customer is already online.</text>
      <text x="15" y="92" fontSize="10" fill="#353535">Build a brand they notice. And a website that converts.</text>
      <rect y="106" width="378" height="174" fill="#2a1650"/>
      <text x="19" y="132" fontSize="10" fill="#ccbce3">UNNITY / BUILT FOR YOUR NEXT CHAPTER</text>
      <text x="19" y="174" fontSize="31" letterSpacing="-1" fill="#fff">Good strategy.</text>
      <text x="19" y="209" fontSize="31" letterSpacing="-1" fill="#d9c5ee">Real growth.</text>
      <path d="M24 250h104m-14-10 14 10-14 10" stroke="#bda2df" fill="none" strokeWidth="2"/>
      <text x="165" y="254" fontSize="9" fill="#ddcdec">Design. Development. Performance.</text>
      <rect y="280" width="378" height="42" fill="#eef3f8"/>
      <text x="14" y="297" fontSize="8" fill="#68737a">UNNITY / DIGITAL GROWTH</text>
      <text x="14" y="312" fontSize="11" fontWeight="500" fill="#202124">Let&apos;s build what comes next.</text>
      <rect x="277" y="289" width="86" height="25" rx="12" fill="none" stroke="#0a66c2"/>
      <text x="291" y="305" fontSize="9" fontWeight="600" fill="#0a66c2">Learn more</text>
      <circle cx="20" cy="337" r="6" fill="#0a66c2"/><text x="17" y="340" fontSize="7" fill="#fff">+</text>
      <text x="33" y="340" fontSize="8" fill="#707070">Be the first to react</text>
      <path d="M14 350h350" stroke="#e4e4e4"/>
      <text x="25" y="369" fontSize="10" fill="#666">Like</text><text x="106" y="369" fontSize="10" fill="#666">Comment</text><text x="222" y="369" fontSize="10" fill="#666">Repost</text><text x="313" y="369" fontSize="10" fill="#666">Send</text>
    </g>
    <g transform="translate(418 61)">
      <rect width="198" height="249" rx="7" fill="#fff" stroke="#deddda"/>
      <text x="15" y="26" fontSize="11" fontWeight="600" fill="#252525">Connect with Unnity</text>
      <text x="15" y="45" fontSize="8" fill="#777">Let&apos;s talk about your next project.</text>
      <g className="preview-form-fields">
        <text x="15" y="72" fontSize="8" fill="#555">Work email</text><rect x="15" y="80" width="168" height="26" rx="3" fill="#fafafa" stroke="#bdbdbd"/>
        <text x="23" y="97" fontSize="9" fill="#777">you@company.com</text>
        <text x="15" y="125" fontSize="8" fill="#555">Company name</text><rect x="15" y="133" width="168" height="26" rx="3" fill="#fafafa" stroke="#bdbdbd"/>
        <text x="23" y="150" fontSize="9" fill="#777">Your company</text>
      </g>
      <rect x="15" y="177" width="168" height="31" rx="15" fill="#0a66c2"/>
      <text className="preview-checkout" x="66" y="197" fontSize="10" fill="#fff">Get in touch</text>
      <text className="preview-confirm" x="56" y="197" fontSize="10" fill="#fff">Request received</text>
      <text x="15" y="231" fontSize="7" fill="#888">Your details stay private.</text>
      <text x="15" y="282" fontSize="9" fill="#777">About / Privacy / Community</text>
      <text x="15" y="300" fontSize="9" fill="#0a66c2">LinkedIn</text>
    </g>
  </>;
}

const artwork = {
  development: Development,
  meta: Meta,
  google: Google,
  identity: Identity,
  linkedin: LinkedIn,
};

export default function ServiceArtwork({ id }) {
  const Artwork = artwork[id];
  return (
    <svg
      className="service-artwork"
      viewBox="0 0 640 460"
      aria-hidden="true"
      focusable="false"
    >
      <Artwork />
    </svg>
  );
}
