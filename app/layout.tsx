import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { LanguageProvider } from "@/components/AdminUtils/components/language-context";
import { Footer } from "@/components/Footer/Footer";
import { NavigationWrapper } from "../components/Navigation/NavigationWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBlog,
  FaShoppingCart,
  FaUser,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dual Theme Website",
  description: "Professional and Artistic dual-themed website",
  generator: "v0.dev",
};

const footerSections = [
  {
    title: "Navigation",
    icon: <FaHome />,
    links: [
      { label: "Home", href: "/", icon: <FaHome /> },
      { label: "About", href: "/about", icon: <FaInfoCircle /> },
      { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
      { label: "Blog", href: "/blog", icon: <FaBlog /> },
    ],
  },
  {
    title: "Shop",
    icon: <FaShoppingCart />,
    links: [
      { label: "Products", href: "/products", icon: <FaShoppingCart /> },
      { label: "Categories", href: "/categories", icon: <FaShoppingCart /> },
      {
        label: "New Arrivals",
        href: "/new-arrivals",
        icon: <FaShoppingCart />,
        badge: "New",
      },
      { label: "Sale", href: "/sale", icon: <FaShoppingCart />, badge: "Sale" },
    ],
  },
  {
    title: "Account",
    icon: <FaUser />,
    links: [
      { label: "My Account", href: "/account", icon: <FaUser /> },
      { label: "Orders", href: "/orders", icon: <FaShoppingCart /> },
      { label: "Wishlist", href: "/wishlist", icon: <FaUser /> },
      { label: "Settings", href: "/settings", icon: <FaCog /> },
    ],
  },
  {
    title: "Support",
    icon: <FaQuestionCircle />,
    links: [
      { label: "Help Center", href: "/help", icon: <FaQuestionCircle /> },
      { label: "FAQs", href: "/faqs", icon: <FaQuestionCircle /> },
      { label: "Shipping", href: "/shipping", icon: <FaShoppingCart /> },
      { label: "Returns", href: "/returns", icon: <FaShoppingCart /> },
    ],
  },
];

const contactInfo = {
  email: "contact@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, City, Country",
  workingHours: "Mon-Fri: 9:00 AM - 6:00 PM",
};

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <ThemeProvider>
        <NavigationWrapper />
        <body className={inter.className}>
          {children}
          {/* <LanguageProvider>{children}</LanguageProvider> */}
        </body>
        <Footer
          sections={footerSections}
          copyright={`© ${new Date().getFullYear()} Liza's website. All rights reserved. Powered by Martin Yovchev`}
        />
      </ThemeProvider>
    </html>
  );
}
