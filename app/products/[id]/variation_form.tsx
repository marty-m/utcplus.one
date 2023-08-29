'use client'
import { useState } from "react";
import { Variations } from "@/lib/types";
import * as z from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { createItemObject } from "@/app/hooks/useItem";
import useCartStore from "@/lib/cartStore";
import { toast } from "@/components/ui/use-toast";

interface VariationFormProps {
    variations: Variations;
    colorKeys: string[];
    itemDetails: any;
    imageURLs: string[];
}
const FormSchema = z.object({
    color: z.string().min(1),
    size: z.string().min(1),
  })




export default function VariationForm({variations, colorKeys, itemDetails, imageURLs}: VariationFormProps){
    
    const [chosenColor,setChosenColor] = useState("");  
    const [chosenSize,setChosenSize] = useState("");
    const [chosenVariationId, setChosenVariationId] = useState("");
    
    const variationInStock = chosenColor && variations[chosenColor].find((variation) => variation.size === chosenSize)?.inStock

    function onSubmit(values: z.infer<typeof FormSchema>) {
      for (const options of variations[values.color]){
          if (options.size === values.size){
              setChosenVariationId(options.variation_id)
          }
      }
      const object = createItemObject(itemDetails.prodID, chosenVariationId, imageURLs, itemDetails.name, itemDetails.price)
      useCartStore.getState().addItem(object)
      toast({
        title: "ITEM ADDED TO CART",
        className: "bg-green-400"
      })
    }



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })
    
    console.log(form.formState.errors)
    console.log(form.getValues())
    return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>COLOR</FormLabel>
              <Select onValueChange={(value)=>{
                field.onChange(value)
                setChosenColor(value)
                }} 
              defaultValue={field.value}>
                <FormControl>
                <SelectTrigger className="w-56 rounded-none">
                    <SelectValue placeholder="SELECT COLOR" />
                </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-none">
                    {colorKeys.map((key) => {return(
                        <SelectItem key={key} value={key}>{key}</SelectItem>
                    )},[])}
                </SelectContent>
              </Select>
              

            </FormItem>
         )}
         />
         <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SIZE</FormLabel>
              <Select onValueChange={(value)=>{
                field.onChange(value)
                setChosenSize(value)
                }} defaultValue={field.value}>
                <FormControl>
                <SelectTrigger className=" w-56 rounded-none">
                    <SelectValue placeholder="SELECT SIZE" />
                </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-none">
                    {chosenColor === "" ? <SelectItem value="" disabled={true}>COLOR MISSING</SelectItem> :
                        variations[chosenColor].map((variation) => {
                        return(
                        <SelectItem  key={variation.variation_id} value={variation.size} disabled={!variation.inStock}>
                            {variation.inStock? variation.size : variation.size + " (SOLD OUT)"}
                        </SelectItem>
                        )
                    }
                    )}
                </SelectContent>
              </Select>
            </FormItem>
         )}
         />
        <Button variant={"ghost"} className=" py-7 w-56 rounded-none bg-yellow-300 hover:bg-yellow-400" disabled={!variationInStock} type="submit">{variationInStock ? "ADD TO CART" : "UNAVAILABLE"}</Button>
       </form>
     </Form>      
    )
}

