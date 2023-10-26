import { client } from "@/app/square_client";
import useInventory from "./useInventory";
import { Variations } from "@/lib/types";
import { pb } from "@/app/pocketbase";
import { Record } from "pocketbase";


export const dynamic = 'auto',
    dynamicparams = true, 
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'




export default function useCatalog() {

async function getAllCatalogObjIDs(){
    try {
      const records = await pb.collection('products').getFullList({
        fields: 'id',
    });
      var itemObjectIds: string[] = [];
      
      for (const record of records){
        itemObjectIds.push(record.id);
      }
      return itemObjectIds;
      }
    catch(error) {
      console.log(error);
    }
  }

async function getDetails(itemId: string){
    try {
        const response = await pb.collection('products').getFirstListItem(`id = '${itemId}'`);
  
        const prodID = response.id;
        const name = response.name;
        const description = response.description;
        const price = response.price;
        const currency = response.currency;

        return {prodID, name, description, price, currency};

      } catch(error) {
        console.log(error);
      }
    }
  
async function getAllImageURLs(itemObjectId:string){    
  try {
    var imageURLs:string[] = [];
    const record = await pb.collection('products').getOne(itemObjectId);
    for (const filename of record.images){

      const url = await pb.files.getUrl(record, filename);
      imageURLs.push(url);
    }

    return imageURLs

  } catch (error) {
    console.log(error)
  }
}


async function getAllVariationObjects(itemId:string){
  try {
    const record = await pb.collection('products').getOne(itemId);
    const variationObjects: Record[] = [];
    for (const variation of record.variations){
      const varRecord = await pb.collection('variations').getOne(variation);
      variationObjects.push(varRecord);
    }
    return variationObjects;
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
    const variationObjects = await getAllVariationObjects(itemId);
    
    const variationPageURLs:string[] = [];
    const variations:Variations = Object.create({});
    const colorKeys:string[] = [];
    
    for (const variation of variationObjects!){
      
      const variation_id = variation.id;
      const colorKey = variation.color;
      const size = variation.size;
      const imageURLs = await getAllImageURLs(itemId);
      const inStock = variation.stock > 0;

      if (!variations[colorKey]){
        variations[colorKey] = [];
      }
      if (!colorKeys.includes(colorKey)){
        colorKeys.push(colorKey);
      }

      variations[colorKey].push({size:size, variation_id:variation_id, inStock:inStock!, imageURLs:imageURLs!})
      console.log(variations)
    }
    

    return {variations, colorKeys};

  } catch(error){
    console.log(error)
  }
}

// // Redundant as of right now
// async function getChosenVariationId(itemId:string, chosenVariation:string[]){
//   try {
//     const response = await client.catalogApi.retrieveCatalogObject(itemId, false);

//     const chosenVariationName = chosenVariation.join(", ");

//     var itemVariationObjects = response.result.object.itemData.variations;
//     for (const variationObject of itemVariationObjects){
//         if (chosenVariationName == variationObject.itemVariationData.name){
//           return variationObject.id;
//         }
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

return {getAllCatalogObjIDs, getDetails, getAllImageURLs, getAllColorSizeVariations};

}
