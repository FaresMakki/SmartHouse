"use client"

import React, {useState, useRef, useEffect, useTransition} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent} from "@/components/ui/card"
import * as Icons from 'lucide-react'
import {Navbar} from "@/components/navbarBack"
import {Footer} from "@/components/general-footer"
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {useRouter} from "next/navigation";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";

const roomSchema = z.object({
    name: z.string().min(1, "Room name is required").max(50, "Room name must be 50 characters or less"),
    icon: z.string(),
    nature: z.string(),
    devices: z.array(z.any())
})

type RoomFormValues = z.infer<typeof roomSchema>

interface Device {
    name: string
    icon: React.ElementType
    status: boolean
    model?: string
    dateAdded?: string
    lastTurnedOn?: string
    consumption?: number
}

const roomNatures = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Balcony", "Garage", "Garden", "Office", "Basement", "Attic", "Dining Room", "Hallway", "Laundry Room", "Library", "Lobby", "Pantry", "Playroom", "Studio", "Terrace", "Veranda", "Walk-in Closet", "Workshop"]

const iconList = [
    {id: 'Home', icon: Icons.Home},
    {id: 'Bed', icon: Icons.Bed},
    {id: 'Sofa', icon: Icons.Sofa},
    {id: 'Tv', icon: Icons.Tv},
    {id: 'Utensils', icon: Icons.Utensils},
    {id: 'Bath', icon: Icons.Bath},
    {id: 'Briefcase', icon: Icons.Briefcase},
    {id: 'Flower2', icon: Icons.Flower2},
    {id: 'Car', icon: Icons.Car},
    {id: 'Dumbbell', icon: Icons.Dumbbell},
    {id: 'WashingMachine', icon: Icons.WashingMachine},
    {id: 'Gamepad2', icon: Icons.Gamepad2},
    {id: 'BookOpen', icon: Icons.BookOpen},
    {id: 'Wrench', icon: Icons.Wrench},
    {id: 'Wind', icon: Icons.Wind},
    {id: 'Shirt', icon: Icons.Shirt},
]

export default function AddRoom() {
    const [isIconDialogOpen, setIsIconDialogOpen] = useState(false)
    const [isEditingName, setIsEditingName] = useState(false)
    const nameInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();


    const form = useForm<RoomFormValues>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            name: '',
            icon: 'sofa',
            nature: 'Living Room',
            devices: [],
        },
    })

    useEffect(() => {
        if (isEditingName && nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }, [isEditingName])

    const handleIconSelect = (iconId: string) => {
        form.setValue('icon', iconId)
        setIsIconDialogOpen(false)
    }

    const handleAddDevice = () => {
        // Placeholder for adding a device
        console.log('Add device functionality to be implemented')
    }

    const router = useRouter();

    const onSubmit = (data: RoomFormValues) => {
        startTransition(() => {
            console.log(data)
            fetch('http://localhost:3001/user/room', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    name: data.name,
                    icon: data.icon,
                    type: data.nature,
                }),
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setSuccess("Room added successfully!");
                        router.push("/rooms");
                    } else {
                        setError(result.message || "Failed to add the room");
                    }
                })
                .catch(error => setError("Network error, please try again later."));
        });
    };


    return (
        <div className="min-h-screen flex flex-col">
            <Navbar href={"/rooms"}/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="flex-grow mx-auto space-y-8 mt-10 max-w-2xl w-full px-4">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex-1 pb-2 border-b-2 border-dashed border-gray-300">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Input
                                                            {...field}
                                                            ref={nameInputRef}
                                                            className="text-4xl md:text-5xl shadow-none lg:text-6xl font-bold bg-transparent border-none focus:ring-0 p-0 h-auto w-full"
                                                            placeholder="Room Name"
                                                            name={"name"}
                                                            onFocus={() => setIsEditingName(true)}
                                                            onBlur={() => setIsEditingName(false)}
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Click to edit room name</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Dialog open={isIconDialogOpen} onOpenChange={setIsIconDialogOpen}>
                            <DialogTrigger asChild>
                                <div
                                    className="border border-gray-300 bg-white rounded-lg cursor-pointer w-32 h-32 p-0 flex items-center justify-center">
                                    {(() => {
                                        const selectedIcon = iconList.find((icon) => icon.id === form.getValues('icon'));
                                        const IconComponent = selectedIcon ? selectedIcon.icon : Icons.Home;
                                        return <IconComponent size={48}/>;
                                    })()}
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Select an Icon</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="h-[300px] p-4">
                                    <div className="grid grid-cols-4 gap-4">
                                        {iconList.map((icon) => (
                                            <div
                                                key={icon.id}
                                                className="w-16 h-16 p-0 border border-gray-300 bg-white rounded-lg cursor-pointer flex items-center justify-center"
                                                onClick={() => handleIconSelect(icon.id)}
                                            >
                                                {React.createElement(icon.icon, {size: 24})}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="nature"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"text-lg font-semibold mb-2"}>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select room type"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {roomNatures.map((nature) => (
                                                    <SelectItem key={nature} value={nature}>
                                                        {nature}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <div>
                                <h2 className="text-lg font-semibold mb-2">Devices</h2>
                                {form.getValues('devices').length === 0 ? (
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                                        onClick={handleAddDevice}
                                    >
                                        <Icons.Plus className="mx-auto h-12 w-12 text-gray-400"/>
                                        <p className="mt-2 text-sm text-gray-600">Add Device</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-2">
                                        {form.getValues('devices').map((device: Device, index: number) => (
                                            <li key={index}
                                                className="flex items-center justify-between p-2 bg-secondary rounded-md">
                                                <span>{device.name}</span>
                                                <Button variant="ghost" size="sm">Remove</Button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-orange-500 rounded-full hover:bg-orange-600 text-white font-semibold py-2 px-4 transition-colors duration-300"
                        >
                            Add Room
                        </Button>
                    </div>
                </form>
            </Form>
            <Footer/>
        </div>
    )
}