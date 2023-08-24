import useCatalog from "@/app/hooks/useCatalog";
import VariationForm from "./variation_form";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { use } from "react";





export default function ProductPage({ params }: { params: { id: string } }){
    
        const { getDetails, getAllImageURLs  } = useCatalog()
        const imageURLs = await getAllImageURLs(params.id)
        const itemDetails = await getDetails(params.id)

    return( 
                

        <div className="w-screen h-full">
            
            <div className="flex flex-col h-full items-end justify-center w-1/4 fixed left-0 bg-white pr-10">
                <div className="h-min pl-14 pb-52 pt-14">
                    <div className=" text-right text-xl font-bold">
                        <label>
                        {itemDetails?.name} {/*Grab item name*/}
                        </label>
                    </div>
                    <div className="pb-2 text-right text-lg font-extralight">
                        <label>
                        {itemDetails?.price + " " + itemDetails?.currency} {/*Grab item price and currency*/}
                        </label>
                    </div>
                    
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>ITEM DETAILS & SIZING</AccordionTrigger>
                            <AccordionContent>
                            {itemDetails?.description}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>DELIVERY & RETURNS</AccordionTrigger>
                            <AccordionContent>
                            <p>
                                All domestic orders are shipped via UPS and all 
                                international orders are shipped via DHL. This item ships in 5-7 business days. 
                                All packages are insured and trackable. An email containing the tracking 
                                number will be sent to you when the order ships. 
                                <br/><br/>
                                For more information, view our <a className="underline" href="/terms-and-conditions">Shipping and Return</a> policies.
                                
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
          
                </div>
            </div>


            
            <div className="flex flex-col items-center pt-5"> {/*Scrollable product images*/}
                {imageURLs?.map((url) => {
                    return(
                        <img key={url} className="pb-7" src={url} width={580} height={580}></img> 

                    );
                })}

            </div>
            
            
            <div className="flex flex-col h-full items-start justify-center fixed end-0 top-20 bg-white pr-10">
                <div className="h-min pl-14 pb-52 pt-14">
                    <VariationForm itemId={params.id}/>
                </div>
            </div>
            


        </div>
    )
}