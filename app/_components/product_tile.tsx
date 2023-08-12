import useCatalog from "../_hooks/useCatalog"

export default function ProductTile(id: string){
    
    const { getDetails} = useCatalog();
    
    const detailsPromise = getDetails(id);
    
    return detailsPromise.then((item) => { 
        
        return(
    <>
        <img src={item?.imageURL} alt="product image" height={400} width={400}/>
        <h1>{item?.name}</h1>
        <p>{item?.price} USD</p>
        </>)}
    )
 
    
    

}