import { getDetails, getAllImageURLs} from "@/app/_hooks/useCatalog";
import VariationForm from "./variation_form";



export default async function ProductPage({ params }: { params: { id: string } }){
    
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
                    
                    <details className="collapse collapse-plus border border-black">
                        <summary className="collapse-title float-left pt-4 border-b border-black">PRODUCT DETAILS & SIZING</summary>
                        
                        <div className="collapse-content pt-3 text-xs display-linebreak"> 
                        
                          {itemDetails?.description} {/*Grab item description*/} 
                            
                        </div>
                    </details>

                <div className="py-4"/> {/*spacer*/}

                    <details className="collapse collapse-plus border border-black">
                        <summary className="collapse-title font-medium float-left pt-4 border-b border-black">DELIVERY & RETURNS</summary>
                        
                        <div className="collapse-content pt-3 text-xs w-fit"> 
                            
                                <p>
                                All domestic orders are shipped via UPS and all 
                                international orders are shipped via DHL. This item ships in 5-7 business days. 
                                All packages are insured and trackable. An email containing the tracking 
                                number will be sent to you when the order ships. 
                                <br/><br/>
                                For more information, view our <a className="underline" href="/terms-and-conditions">Shipping and Return</a> policies.
                                
                                </p>
                            
                        </div>
                    </details>           
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