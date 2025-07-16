"use client";
import React, { JSX , createContext , useContext , useState } from "react";

import "./globals.css"
type NameContextType = {
  name: string;
  setName: (name: string) => void;
};
const NameContext = createContext<NameContextType | undefined>(undefined)


export default function RootLayout({
  children
}:Readonly<{children:React.ReactNode}>):JSX.Element{

  const [name , setName] = useState<string>("")
  return(
    <html lang="en">
      <body>
        <div>
          <NameContext.Provider value={{name , setName}}>
            {children}
          </NameContext.Provider>

        </div>
      </body>
    </html>
  )
}
export const useNameState = ():NameContextType=>{
  const context = useContext(NameContext)
  if (!context){
    throw new Error("err has occured")
  }else{
    return context
  }
}