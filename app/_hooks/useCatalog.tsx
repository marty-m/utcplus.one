import { client } from "@/app/square_client";
import { isInStock } from "./useInventory";

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

export async function getDetails(itemId: string){
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
  
export async function getAllImageURLs(itemObjectId:string){    
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

export async function getAllVariationObjects(itemId:string){
  try {
    const response = await client.catalogApi.retrieveCatalogObject(itemId, false);
    return response.result.object.itemData.variations;
  } catch (error) {
    console.log(error)
  }
}


export async function getAllItemVariationOptions(itemId:string){
  try{
    const variationObjects = await getAllVariationObjects(itemId);
    
    const options = variationObjects[0].itemVariationData.itemOptionValues;
    const optionIds: string[] = []
    const allOptionValues: any[] = []
    
    for (const option of options){
      optionIds.push(option.itemOptionId);
    }

    for (const id of optionIds){
      const optionResponse = await client.catalogApi.retrieveCatalogObject(id, false);
      const optionValues: string[] = [];
      const optionName: string = optionResponse.result.object.itemOptionData.name;

      optionResponse.result.object.itemOptionData.values.forEach((value:any) => {
        optionValues.push(value.itemOptionValueData.name);
      });

      allOptionValues.push({name:optionName ,values:optionValues});
    }
   
    
    return allOptionValues;
    

  } catch(error){
    console.log(error)
  }
}

export async function getChosenVariationId(itemId:string, chosenVariation:string[]){
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
        
