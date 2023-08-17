import { getDetails, getAllImageURLs} from "@/app/_hooks/useCatalog";



export default async function ProductPage({ params }: { params: { id: string } }){
    
    const imageURLs = await getAllImageURLs(params.id)
    const itemDetails = await getDetails(params.id)

    return( 
                

        <div className="w-screen h-full">
            
            <div className="flex h-full items-center justify-center w-2/5 fixed left-0">
                <div className="h-min w-5/12 pb-52">
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


            





        </div>
    )
}