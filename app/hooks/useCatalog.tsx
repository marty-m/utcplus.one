import { client } from "@/app/square_client";

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
  try{
    const variationObjects = await getAllVariationObjects(itemId);
    
    const colorOptionID = variationObjects[0].itemVariationData.itemOptionValues[0].itemOptionId;
    const sizeOptionID = variationObjects[0].itemVariationData.itemOptionValues[1].itemOptionId;

    const colorOptionValues: string[] = [];
    const sizeOptionValues: string[] = [];

    const colorOptionResponse = await client.catalogApi.retrieveCatalogObject(colorOptionID, false);
    const sizeOptionResponse = await client.catalogApi.retrieveCatalogObject(sizeOptionID, false);

    colorOptionResponse.result.object.itemOptionData.values.forEach((value:any) => {
      colorOptionValues.push(value.itemOptionValueData.name);
    });
    sizeOptionResponse.result.object.itemOptionData.values.forEach((value:any) => {
      sizeOptionValues.push(value.itemOptionValueData.name);
    });

    return {colors: colorOptionValues, sizes: sizeOptionValues};

    
    

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
