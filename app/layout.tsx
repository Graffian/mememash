import React, { JSX } from "react";
import "./globals.css"
export default function RootLayout({
  children
}:Readonly<{children:React.ReactNode}>):JSX.Element{
  return(
    <html lang="en">
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}