import { client } from "@/app/square_client";

export default function useCatalog(){
    
    async function getAllCatalogObjIDs(){
        try {
          const response = await client.catalogApi.listCatalog();
          var objectIDs: string[] = [];
          response.result.objects.forEach((object: any) => {
            objectIDs.push(object.id);
          });
          
          console.log(response.result);
          return objectIDs;
          }
        catch(error) {
          console.log(error);
        }
      }

    async function getDetails(id: string){
        try {
            const response = await client.catalogApi.retrieveCatalogObject(id);
            const imageResponse = await client.catalogApi.retrieveCatalogObject(response.result.object.itemData.imageIds[0]);
          
            const imageURL: string = imageResponse.result.object.imageData.url;
           

            const name = response.result.object.itemData.name;
            const description = response.result.object.itemData.description;
            const price = Number(response.result.object.itemData.variations[0].itemVariationData.priceMoney.amount)/100;

            return {name, description, price, imageURL};

          } catch(error) {
            console.log(error);
          }
        }
              
        
        return {getAllCatalogObjIDs, getDetails};
        
}