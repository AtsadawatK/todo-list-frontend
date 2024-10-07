import "./globals.css";

import DynamicParticlesBackground from "./components/particle/particle";

export const metadata = {
  title: "To-Do List",
  description: "To-Do List App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="font-fredoka"
        style={{
          backgroundColor: "#EDDFE0",
          position: "relative",
          margin: 0,
          padding: 0,
        }}
      >


          <DynamicParticlesBackground />

        {children}
      </body>
    </html>
  );
}
