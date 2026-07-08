import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Sidebar /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}