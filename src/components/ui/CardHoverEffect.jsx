import { HoverEffect } from "./HoverEffect";

export function CardHoverEffect() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={features} />
    </div>
  );
}
export const features = [
  {
    id: 1,
    title: "Advanced Search System",
    description:
      "Allows users to easily search for lost or found items by entering keywords or specific criteria such as item name, location, or date.",
  },
  {
    id: 2,
    title: "Categorized Listings",
    description:
      "Segregates lost and found listings for convenient browsing. Users can quickly filter and view listings based on their preference.",
  },
  {
    id: 3,
    title: "Interactive Map",
    description:
      "Provides an interactive map interface for users to visualize the location of lost or found items. Users can zoom in, zoom out, and pan the map to explore more details.",
  },
  {
    id: 4,
    title: "Security and Privacy",
    description:
      "Implements encryption and follows strict privacy policies to ensure the security of user data. Users can trust the platform with their personal information.",
  },
  {
    id: 5,
    title: "Commenting and Communication",
    description:
      "Enables users to leave comments and communicate directly with the poster of a listing. This facilitates smooth communication and exchange of information.",
  },
  {
    id: 6,
    title: "PWA Support for Cross-Device Accessibility",
    description:
      "Enables users to access the web app seamlessly across all devices, including desktop computers, laptops, tablets, and smartphones.",
  },
];
