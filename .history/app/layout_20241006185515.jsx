/* import localFont from "next/font/local"; */
import "./globals.css";
/* const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
}); */
import ParticlesBackground from "./component/particle/particle"
export const metadata = {
  title: "To-Do List",
  description: "To-Do List App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="font-fredoka"
        style={{backgroundColor:"#EDDFE0"}}
      >
        {children}
      </body>
    </html>
  );
}
