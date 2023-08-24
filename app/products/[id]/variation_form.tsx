'use client'
import { useState } from "react";

interface VariationFormProps {
    itemId: string;

}



export default function VariationForm({itemId}: VariationFormProps){
    const [chosenColor,setChosenColor] = useState("Gray");  
    const [chosenSize,setChosenSize] = useState("S");

   
    
    
    
    //const [variationInStock, setVariationInStock] = useState(false);
    
    

    return(
            "Variation Form"
    )
}