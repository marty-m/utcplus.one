
import ProductTile from "@/app/_components/product_tile";
import useCatalog from "@/app/_hooks/useCatalog";


export default function AllProducts() {

  const { getAllCatalogObjIDs } = useCatalog();

  const allObjectIDs = getAllCatalogObjIDs();

  return allObjectIDs.then((array) => {
    return (
      
        
        
      
        <div className="flex flex-col items-center w-screen h-full">
            <h1 className="text-8xl font-thin font-mono">EVERYTHING</h1>
        
            <div className="flex h-auto w-3/4 items-center justify-center py-10">
                <div className="grid grid-cols-4 py-5 text-center gap-x-12 gap-y-6 h-max">
            
                    {array?.map(function(id){
                    return (
                        <div key={id}>{ProductTile(id)}</div>
                    );
                    })}
                    
                </div>
            </div>
        </div> 
      
      
      )
  })
  
  
  
}
