'use client';


//toaster provider needed because in nextjs 13 
//component need to ne marked use client
//therefore we need a wrapper component around
//Toaster component as we can't
//mark Toaster use client as it is 3rd party
//package

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return ( 
    <Toaster />
   );
}
 
export default ToasterProvider;