import React from "react";
import { AddressCard } from "../Cart/AddressCard";


const Address = () => {

return (
        <>
        <div>
            <h1 className="text-center font-semibold text-2xl py-10">Select Your Address</h1>
            <div className="flex gap-5 flex-wrap justify-center">
                {[1,1,1].map((item) =>(<AddressCard showButton={false} />))}
            </div>
        </div>
      </>    
    )
}

export default Address;