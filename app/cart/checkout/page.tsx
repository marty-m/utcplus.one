"use client"
import shipping from "@/lib/shipping.json"
import { shippo, addressFrom } from "@/app/shippo_client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

 
const formSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    country: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    zip: z.string().min(2).max(50),
    phone: z.string().min(2).max(50),
    mailingList: z.boolean(),
})

export default function CheckoutPage() {
    const {countries} = shipping;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            country: "",
            address: "",
            city: "",
            zip: "",
            phone: "",
            mailingList: false,
        },
      })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        var addressTo = {
            "name": values.firstName + " " + values.lastName,
            "street1": values.address,
            "city": values.city,
            "state": "",
            "zip": values.zip,
            "country": values.country
        };
        



        document.getElementById('shipping').scrollIntoView({behavior: "smooth"})
        console.log({values})
    }

    function scrollToShipping(){
        document.getElementById('shipping').scrollIntoView({behavior: "smooth"})
    }

    
    
    return (
        <div className="h-full grid grid-cols-2 divide-x divide-black items-start overscroll-none overflow-hidden relative">
            
            <div className="h-full overscroll-none overflow-hidden">
            <div id="customerinfo" className="h-full overflow-auto overscroll-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-5 px-10 ">
                <div className="col-span-2 font-bold underline">Customer Details</div>
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className="col-span-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input className="border border-black rounded-none" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className="col-span-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input className="border border-black rounded-none" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="col-span-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input className="border border-black rounded-none" type="email" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="col-span-1">
                        <FormLabel>Phone Number (with country code)</FormLabel>
                        <FormControl>
                            <Input className="border border-black rounded-none" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <Separator className="col-span-2" />
                    <div className="col-span-2 font-bold underline">Delivery Address</div>   
                    
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input className="border border-black rounded-none" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="col-span-1">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input className="border border-black rounded-none" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />     
                    
                    <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                        <FormItem className="col-span-1">
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                            <Input className="border border-black rounded-none" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="border border-black rounded-none">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="border border-black rounded-none h-44 overflow-y-auto">
                                        {countries.map((country) => (
                                            <SelectItem key={country.code} value={country.code}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    
                                    </SelectContent>
                                </Select>
                            </FormItem>
                            )}
                            />

                    <FormField
                        control={form.control}
                        name="mailingList"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-2 justify-center pt-2">
                            <FormControl>
                                <Checkbox
                                className="rounded-none "
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                I agree to receive information, special offers and promotions from UTC+1 clothing. 
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                        />
                    <Button className="rounded-none col-span-2 mt-5" type="submit">To Shipping</Button>
                
                </form>
            </Form>
            </div>

            <div id="shipping" className="h-full">
                <div className="flex flex-col h-full">
                <Button variant={"link"} className="text-left w-56 mt-5" onClick={() => {
                    form.reset()
                    document.getElementById('customerinfo').scrollIntoView({behavior: "smooth"})

                    
                    }}><ArrowLeft strokeWidth={1.5} width={30} className="pr-2"/>Back to Customer Info</Button>
                    <div className="flex flex-col h-full py-5 px-10">
                        <h1 className="font-bold underline">Shipping</h1>
                    </div>
                </div>
            </div>
                
        </div>
            


            <div className="fixed left-1/2 flex flex-col h-full py-5 px-10">
                <h1>Orders</h1>
            </div>
        </div>
    )
}