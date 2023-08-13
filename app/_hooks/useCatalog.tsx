import { client } from "@/app/square_client";

export const dynamic = 'auto',
    dynamicparams = true, 
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

export default function useCatalog(){
    
    
    async function getAllCatalogObjIDs(){
        try {
          const response = await client.catalogApi.searchCatalogItems({
            sortOrder: 'DESC',
            productTypes: [
              'REGULAR'
            ]
          });
          var objectIDs: string[] = [];
          response.result.items.forEach((object: any) => {
            if (object.type == "ITEM"){
              objectIDs.push(object.id);
            }
          });
          
          return objectIDs;
          }
        catch(error) {
          console.log(error);
        }
      }

    async function getDetails(id: string){
        try {
            const response = await client.catalogApi.retrieveCatalogObject(id);
            const image1Response = await client.catalogApi.retrieveCatalogObject(response.result.object.itemData.imageIds[0]);
            const image2Response = await client.catalogApi.retrieveCatalogObject(response.result.object.itemData.imageIds[1]);
          
            const image1URL: string = image1Response.result.object.imageData.url;
            const image2URL: string = image2Response.result.object.imageData.url;
           
            const prodID = response.result.object.id;
            const name = response.result.object.itemData.name;
            const description = response.result.object.itemData.description;
            const price = Number(response.result.object.itemData.variations[0].itemVariationData.priceMoney.amount)/100;

            return {prodID, name, description, price, image1URL, image2URL};

          } catch(error) {
            console.log(error);
          }
        }
              
        
        return {getAllCatalogObjIDs, getDetails};
        
}