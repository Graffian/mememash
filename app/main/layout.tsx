import React, { JSX } from "react";

export default function MainLayout(
    {children}:Readonly<{children : React.ReactNode}>
):JSX.Element{
    return(
        <div style={{backgroundColor : "black"}}>
            {children}
        </div>
    )
}