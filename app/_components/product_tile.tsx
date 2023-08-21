import { use } from "react"
import useCatalog from "../_hooks/useCatalog"

export default async function ProductTile(id: string){
    const { getAllImageURLs, getDetails } = useCatalog()
    const imageURLs = await getAllImageURLs(id)
    const item = await getDetails(id)
    
    return(
        <a className="group" href={"/products/"+ item?.prodID}>
                <div className=" border border-black ">
                    <div className="group-hover:hidden"><img height={300} width={300} src={imageURLs?.at(0)}/></div>
                    <div className="group-hover:flex hidden"><img height={300} width={300} src={imageURLs?.at(1)}/></div>
                </div>
                <div className="flow-root font-thin py-1 border border-black border-t-transparent">
                    <p className="text-left text-sm float-left pl-2">{item?.name.toUpperCase()}</p>
                    <p className="text-right text-sm float-right pr-2">{item?.price} USD</p>
                </div>
            </a>
    )
 
    
    

}