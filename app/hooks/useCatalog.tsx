import { client } from "@/app/square_client";
import useInventory from "./useInventory";
import { Variations } from "@/lib/types";


export const dynamic = 'auto',
    dynamicparams = true, 
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'




export default function useCatalog() {

async function getAllCatalogObjIDs(){
    try {
      const response = await client.catalogApi.searchCatalogItems({
        sortOrder: 'DESC',
        productTypes: [
          'REGULAR'
        ]
      });
      var itemObjectIds: string[] = [];
      response.result.items.forEach((object: any) => {
        if (object.type == "ITEM"){
          itemObjectIds.push(object.id);
        }
      });
      
      return itemObjectIds;
      }
    catch(error) {
      console.log(error);
    }
  }

async function getDetails(itemId: string){
    try {
        const response = await client.catalogApi.retrieveCatalogObject(itemId);
        
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
  
async function getAllImageURLs(itemObjectId:string){    
  try {
    const response = await client.catalogApi.retrieveCatalogObject(itemObjectId, true);
    var imageIDs = response.result.object.itemData.imageIds;
    var imageURLs:string[] = [];

    for (const imageID of imageIDs){
      const imageResponse = await client.catalogApi.retrieveCatalogObject(imageID,false);

      imageURLs.push(imageResponse.result.object.imageData.url);
    }

    return imageURLs

  } catch (error) {
    console.log(error)
  }
}

async function getAllVariationObjects(itemId:string){
  try {
    const response = await client.catalogApi.retrieveCatalogObject(itemId, false);
    return response.result.object.itemData.variations;
  } catch (error) {
    console.log(error)
  }
}


async function getAllColorSizeVariations(itemId:string){
  /*
    Iterate and extract all color and size variations in the following object format:
    { "Gray" : [
      {
        size: "S",
        variation_id : 123123,
        inStock: true,
        imageURLs: ["www.domain.com/image.jpeg"]
      },...
		 

    */

  try{
    const {isInStock} = useInventory();
    const variationObjects = await getAllVariationObjects(itemId);
    const variations:Variations = Object.create({});
    const colorKeys:string[] = [];
    

      for (var i = 0; i < variationObjects.length; i++){
        const variationObject = variationObjects[i];
        const colorKey:string = variationObject.itemVariationData.name.split(", ")[0];
        const size:string = variationObject.itemVariationData.name.split(", ")[1];
        
        const variation_id = variationObject.id;

        const inStock = await isInStock(variation_id);

        
        const variationImageURLs:string[] = []
        const response = await client.catalogApi.retrieveCatalogObject(variation_id, true)
        for (const relatedObject of response.result.relatedObjects) {
          if (relatedObject.type == "IMAGE") {
            variationImageURLs.push(relatedObject.imageData.url);
          }
        }
        
        
        if (!variations[colorKey]){
          variations[colorKey] = [];
        }
        if (!colorKeys.includes(colorKey)){
          colorKeys.push(colorKey);
        }
        
        variations[colorKey].push({size:size, variation_id:variation_id, inStock:inStock!, imageURLs:variationImageURLs})
        
      }
    return {variations, colorKeys};

    
    

  } catch(error){
    console.log(error)
  }
}

async function getChosenVariationId(itemId:string, chosenVariation:string[]){
  try {
    const response = await client.catalogApi.retrieveCatalogObject(itemId, false);

    const chosenVariationName = chosenVariation.join(", ");

    var itemVariationObjects = response.result.object.itemData.variations;
    for (const variationObject of itemVariationObjects){
        if (chosenVariationName == variationObject.itemVariationData.name){
          return variationObject.id;
        }
    }
  } catch (error) {
    console.log(error)
  }
}

return {getAllCatalogObjIDs, getDetails, getAllImageURLs, getAllColorSizeVariations, getChosenVariationId}

}
