import localFont from "next/font/local";
import { UserProvider } from "@/contextApi/UserContext";
import { CategoryProvider } from "@/contextApi/CategoriesContext";
import { ProductProvider } from "@/contextApi/ProductContext";
import ProgressBarProviders from "@/components/miniComponents/ProgressBAr";
import Navbar from "@/components/header/Navbar";
import Sidebar from "@/components/header/Sidebar";
import ProgressBar from "@/components/miniComponents/ProgressBAr";
import TopLine from "@/components/header/TopLine";
import NotificationsDropdown from "@/components/widgets/notification/NotificationsDropdown";
import "./globals.css";
import PathnameWrapper from "@/components/miniComponents/PathWrapper";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ecommerce Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CategoryProvider>
          <UserProvider>
            <ProductProvider>
              <NotificationsDropdown />
              <PathnameWrapper>
                <ProgressBarProviders>
                  <main className="bg-gray-100 pt-24">{children}</main>
                </ProgressBarProviders>
              </PathnameWrapper>
            </ProductProvider>
          </UserProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
