import { client } from "@/app/square_client";

export const dynamic = 'auto',
    dynamicparams = true, 
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'


    
export async function getAllCatalogObjIDs(){
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

export async function getDetails(id: string){
    try {
        const response = await client.catalogApi.retrieveCatalogObject(id);
        
        const prodID = response.result.object.id;
        const name = response.result.object.itemData.name;
        const description = response.result.object.itemData.description;
        const price = Number(response.result.object.itemData.variations[0].itemVariationData.priceMoney.amount)/100;
        const currency = response.result.object.itemData.variations[0].itemVariationData.priceMoney.currency;

        return {prodID, name, description, price, currency};

      } catch(error) {
        console.log(error);
      }
    }
  
export async function getAllImageURLs(objId:string){    
  try {
    const response = await client.catalogApi.retrieveCatalogObject(objId, true);
    var imageObjects = response.result.relatedObjects;
    var imageURLs:string[] = [];

    imageObjects.forEach((imageObj: any) => {
      imageURLs.push(imageObj.imageData.url)
    });

    return imageURLs

  } catch (error) {
    console.log(error)
  }
}
        
