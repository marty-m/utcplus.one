import VariationForm from "./variation_form";
import useCatalog from "@/app/hooks/useCatalog";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"






export default async function ProductPage({ params }: { params: { id: string } }){
    const {getAllImageURLs, getDetails, getAllColorSizeVariations} = useCatalog();
    const imageURLs = await getAllImageURLs(params.id);
    const itemDetails = await getDetails(params.id);
    const variationObject = await getAllColorSizeVariations(params.id);
    const variations = variationObject!.variations;
    const colorKeys = variationObject!.colorKeys;

    

    return( 
        
        
        <div className="w-full h-full grid grid-cols-4 gap-16">
            <div className="flex flex-col items-end">
            <div className=" fixed flex top-80">
                <div className="h-min flex-col">
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
                    
                    <Accordion type="single" collapsible className="w-60">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>ITEM DETAILS & SIZING</AccordionTrigger>
                            <AccordionContent className="text-xs display-linebreak">
                            {itemDetails?.description}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>DELIVERY & RETURNS</AccordionTrigger>
                            <AccordionContent className="text-xs">
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
        </div>
            <div className="flex flex-col w-auto items-center justify-center col-span-2 ">
                {/*Scrollable product images*/}
                <div className="grid grid-cols-1 gap-y-5 border-x border-black ">
                {imageURLs?.map((url) => {
                    return(
                        <Image alt={"Item image"} key={url}  src={url} width={590} height={590}></Image> 

                    );
                })}
                </div>
            </div>
            <div className="flex flex-col items-start">
                <div className="fixed flex top-80">
                    <VariationForm colorKeys={colorKeys} variations={variations}></VariationForm>
                </div>
             </div>
            
            


        </div>
    )
}