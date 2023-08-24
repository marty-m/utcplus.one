'use client'
import useCatalog from "@/app/hooks/useCatalog";
import { isInStock } from "@/app/hooks/useInventory";
import { use, useState } from "react";

interface VariationFormProps {
    itemId: string;
}


export default function VariationForm({itemId}: VariationFormProps){
    const { getAllColorSizeVariations, getChosenVariationId } = useCatalog();

    const [chosenColor,setChosenColor] = useState("Gray");  
    const [chosenSize,setChosenSize] = useState("S");

    
    const option = getAllColorSizeVariations(itemId);
    
    async function checkStock(color:string, size:string){
        const variationId = await getChosenVariationId(itemId, [color, size]);
        const inStock = await isInStock(variationId);
        return inStock;
    }
    //const [variationInStock, setVariationInStock] = useState(false);
    
    

    return(
            <form className="flex flex-col items-start">

                <label className="text-xl font-bold">COLOR</label>
                <select value={chosenColor} onChange={(e) => {
                    setChosenColor(e.target.value);
                    }}>

                    {use(option)?.colors.map((color: any) => {
                        return (
                            
                            
                            <option key={color} value={color}>{color}</option>
                

                        )
                    })}
                </select>

                <label className="text-xl font-bold">SIZE</label>
                <select value={chosenSize} onChange={(e) => {
                    setChosenSize(e.target.value);
                    }}>

                    {use(option)?.sizes.map((size: any) => {
                        return (  

                        <option key={size} value={size} disabled={use(checkStock(chosenColor,size))? false : true}>
                            {use(checkStock(chosenColor,size))? size : size + " SOLD OUT"}
                        </option>
                        
                            )
                    })}
                </select>

                <p>{chosenColor}</p>
                <p>{chosenSize}</p>
                           
        
            <button disabled={false} onClick={(e) => {console.log("logged")}}>{true? "ADD TO CART" : "SOLD OUT"}</button>

            </form>
    )
}