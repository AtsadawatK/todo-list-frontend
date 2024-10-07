import "./globals.css";

import ParticlesBackground from "./components/particle/particle";

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
        <div className="hidden md:block w-[1]">
          <ParticlesBackground />
        </div>
        {children}
      </body>
    </html>
  );
}
