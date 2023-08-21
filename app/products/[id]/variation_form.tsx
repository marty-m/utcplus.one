"use client"
import { getAllItemVariationOptions, getChosenVariationId} from "@/app/_hooks/useCatalog";
import { isInStock } from "@/app/_hooks/useInventory";
import { useState } from "react";

interface VariationFormProps {
    itemId: string;
}

export default async function VariationForm({itemId}: VariationFormProps){
    
    const allOptions = await getAllItemVariationOptions(itemId);
    
    const [variationInStock, setVariationInStock] = useState(false);
    const []

    async function handleChange(event: any){

    }

    return(
            <form className="flex flex-col items-start">
            
                {allOptions?.map((option: any) => {
                    return (
                        <>
                        <label className="text-xl font-bold">{option.name}</label>
                        <select>
                            {option.values.map((value: string) => {
                                
                                return (
                                    <option value={value}>{value}</option>
                                )
                            })}
                        </select>
                        </>
                    )
                })}
                           
        
            <button type="submit" disabled={!variationInStock}>{variationInStock? "ADD TO CART" : "SOLD OUT"}</button>

            </form>
    )
}