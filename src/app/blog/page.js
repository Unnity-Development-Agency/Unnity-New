import PlaceholderPage, { placeholderMetadata } from "../components/PlaceholderPage";

export const metadata = placeholderMetadata("Blog", "/blog");

export default function Page() {
  return <PlaceholderPage title="Blog" />;
}
