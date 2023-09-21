"use client"
import shipping from "@/lib/shipping.json"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
        console.log(values)
    }
    
    return (
        <div className="h-full grid grid-cols-2 divide-x divide-black items-start">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" overflow-auto grid grid-cols-2 gap-4 py-5 px-16">
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
                                            <SelectItem key={country} value={country}>
                                                {country}
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
                            <FormItem className="flex flex-row items-center space-x-3 space-y-6 justify-center pt-1">
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


            <div className="overflow-auto flex flex-col h-full p-5">
                <h1>Orders</h1>
            </div>
        </div>
    )
}