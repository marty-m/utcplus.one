import useCatalog from "../_hooks/useCatalog"

export default function ProductTile(id: string){
    
    const { getDetails} = useCatalog();
    
    const detailsPromise = getDetails(id);
    
    return detailsPromise.then((item) => { 
        
        return(
            <a className="group" href={"/products/"+item?.prodID}>
                <div className=" border border-black ">
                    <div className="group-hover:hidden"><img height={300} width={300} src={item?.image1URL}/></div>
                    <div className="group-hover:flex hidden"><img height={300} width={300} src={item?.image2URL}/></div>
                </div>
                <div className="flow-root font-thin py-1 border border-black border-t-transparent">
                    <p className="text-left text-sm float-left pl-2">{item?.name.toUpperCase()}</p>
                    <p className="text-right text-sm float-right pr-2">{item?.price} USD</p>
                </div>
            </a>
        )}
    )
 
    
    

}