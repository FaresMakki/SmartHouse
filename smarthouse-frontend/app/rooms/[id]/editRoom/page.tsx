"use client"

import React, {useState, useRef, useEffect, useTransition, use} from 'react'
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
import {useRouter} from "next/navigation"
import {FormError} from "@/components/form-error"
import {FormSuccess} from "@/components/form-success"
import {motion} from "framer-motion"
import DeleteConfirmationOverlay from "@/components/delete-confirmation-overlay"

const roomSchema = z.object({
    name: z.string().min(1, "Room name is required").max(50, "Room name must be 50 characters or less"),
    icon: z.string(),
    nature: z.string(),
    devices: z.array(z.any())
})

type RoomFormValues = z.infer<typeof roomSchema>

interface Device {
    _id: string
    deviceName: string
    picture: string
    status: boolean
    modelName?: string
    createdAt: string
    updatedAt: string
    Settings: {
        powerState?: {
            value: string
        }
    }
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

export default function EditRoom({params}: { params: { roomId: string } }) {
    const [isIconDialogOpen, setIsIconDialogOpen] = useState(false)
    const [isEditingName, setIsEditingName] = useState(false)
    const nameInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    // @ts-ignore
    const {id} = use(params)
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        deviceId: string | null;
        deviceName: string
    }>({
        isOpen: false,
        deviceId: null,
        deviceName: '',
    })

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
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/user/getroombyid/${id}`, {
                    method: "GET",
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch room data')
                }
                const data = await response.json()
                console.log(data.success)
                if (data.success) {
                    form.reset({
                        name: data.success.name,
                        icon: data.success.icon,
                        nature: data.success.nature,
                        devices: data.success.devices || [],
                    })
                }
            } catch (error) {
                setError('Failed to load room data. Please try again.')
            }
        }

        fetchRoomData()
    }, [id, form])

    useEffect(() => {
        if (isEditingName && nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }, [isEditingName])

    const handleIconSelect = (iconId: string) => {
        form.setValue('icon', iconId)
        setIsIconDialogOpen(false)
    }

    const openDeleteConfirmation = (deviceId: string, deviceName: string) => {
        setDeleteConfirmation({isOpen: true, deviceId, deviceName})
    }

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({isOpen: false, deviceId: null, deviceName: ''})
    }

    const handleDeleteDevice = async () => {
        if (deleteConfirmation.deviceId) {
            try {
                const response = await fetch(`http://localhost:3001/user/deletedevice/${deleteConfirmation.deviceId}/${id}`, {
                    method: 'POST',
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error('Failed to delete device')
                }
                const updatedDevices = form.getValues('devices').filter((device: Device) => device._id !== deleteConfirmation.deviceId)
                form.setValue('devices', updatedDevices)
                closeDeleteConfirmation()
            } catch (error) {
                setError('Failed to delete device. Please try again.')
            }
        }
    }

    const toggleDeviceStatus = (deviceIndex: number) => {
        const devices = form.getValues('devices')
        const updatedDevices = devices.map((device: Device, index: number) => {
            if (index === deviceIndex) {
                return {...device, status: !device.status}
            }
            return device
        })
        form.setValue('devices', updatedDevices)
    }

    const onSubmit = async (data: RoomFormValues) => {
        startTransition(async () => {
            try {
                const response = await fetch(`http://localhost:3001/user/updateroom/${id}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({
                        name: data.name,
                        icon: data.icon,
                        type: data.nature,
                    }),
                })
                if (!response.ok) {
                    throw new Error('Failed to update room')
                }
                setSuccess('Room updated successfully!')
                router.push(`/rooms`)
            } catch (error) {
                setError('Failed to update room. Please try again.')
            }
        })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar href={`/rooms`}/>
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
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select room type" />
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
                                        onClick={() => router.push(`/rooms/${id}/add-device`)}
                                    >
                                        <Icons.Plus className="mx-auto h-12 w-12 text-gray-400"/>
                                        <p className="mt-2 text-sm text-gray-600">Add Device</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {form.getValues('devices').map((device: Device, deviceIndex: number) => {
                                            const IconComponent = Icons[device.picture as keyof typeof Icons] || Icons.Smartphone;
                                            const isOn = device.status;

                                            return (
                                                <TooltipProvider key={device._id}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <motion.div
                                                                className={`p-4 rounded-xl shadow-none flex flex-col items-center justify-between cursor-pointer transition-all duration-300 ease-in-out relative ${
                                                                    isOn
                                                                        ? "bg-gradient-to-br from-emerald-50 to-emerald-100"
                                                                        : "bg-gradient-to-br from-slate-50 to-slate-100"
                                                                }`}
                                                                onClick={(e: React.MouseEvent) => {
                                                                    e.stopPropagation();
                                                                    toggleDeviceStatus(deviceIndex);
                                                                }}
                                                                whileTap={{scale: 0.95}}
                                                            >
                                                                <div
                                                                    className={`p-2 rounded-full ${isOn ? "bg-emerald-200" : "bg-slate-200"}`}>
                                                                    <IconComponent
                                                                        className={`h-8 w-8 ${isOn ? "text-emerald-700" : "text-slate-700"}`}/>
                                                                </div>
                                                                <div className="w-full text-center mt-2">
                                                                    <p className={`text-sm font-medium truncate ${isOn ? "text-emerald-800" : "text-slate-800"}`}>
                                                                        {device.deviceName}
                                                                    </p>
                                                                    <div
                                                                        className="flex items-center justify-center mt-1 space-x-1">
                                                                        <Icons.Power
                                                                            className={`h-3 w-3 ${isOn ? "text-emerald-500" : "text-slate-500"}`}/>
                                                                        <p className={`text-xs ${isOn ? "text-emerald-600" : "text-slate-600"}`}>
                                                                            {isOn ? "On" : "Off"}
                                                                        </p>
                                                                    </div>
                                                                    {device.Settings.powerState && (
                                                                        <div
                                                                            className="flex items-center justify-center mt-1 space-x-1">
                                                                            <Icons.Zap
                                                                                className="h-3 w-3 text-amber-500"/>
                                                                            <p className="text-xs text-amber-600">{device.Settings.powerState.value}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <button
                                                                    type={"button"}
                                                                    className="absolute top-1 right-1 p-1 rounded-full text-black bg-white transition-colors duration-200"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        openDeleteConfirmation(device._id, device.deviceName);
                                                                    }}
                                                                >
                                                                    <Icons.X className="h-3 w-3"/>
                                                                </button>
                                                            </motion.div>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top">
                                                            <div className="text-xs">
                                                                <p><strong>Model:</strong> {device.modelName || "N/A"}
                                                                </p>
                                                                <p>
                                                                    <strong>Added:</strong> {new Date(device.createdAt).toLocaleString() || "N/A"}
                                                                </p>
                                                                <p>
                                                                    <strong>Updated:</strong> {new Date(device.updatedAt).toLocaleString() || "N/A"}
                                                                </p>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            );
                                        })}
                                    </div>
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
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
            <Footer/>
            <DeleteConfirmationOverlay
                isOpen={deleteConfirmation.isOpen}
                onClose={closeDeleteConfirmation}
                onConfirm={handleDeleteDevice}
                object={deleteConfirmation.deviceName}
            />
        </div>
    )
}