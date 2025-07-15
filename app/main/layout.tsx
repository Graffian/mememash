import React, { JSX } from "react";

export default function RootLayout(
    {children}:Readonly<{children : React.ReactNode}>
):JSX.Element{
    return(
        <html lang="en">
            <body>
                <div style={{backgroundColor : "black"}}>
                    {children}
                </div>
            </body>
        </html>
    )
}