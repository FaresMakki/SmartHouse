'use client';

import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface Model {
    id: string;
    name: string;
    image: string;
    specifications: string;
}

export default function ModelsPage({params,}: {
    params: { categoryId: string; productId: string };
}) {
    const [models, setModels] = useState<Model[]>([
        {
            id: '1',
            name: 'Smart Bulb Pro X1',
            image: 'https://images.unsplash.com/photo-1550985543-f1ea83691cd8?auto=format&fit=crop&q=80&w=300&h=300',
            specifications: 'RGB, 10W, WiFi enabled',
        },
        {
            id: '2',
            name: 'Smart Bulb Pro X2',
            image: 'https://images.unsplash.com/photo-1565864105589-24e6eda45178?auto=format&fit=crop&q=80&w=300&h=300',
            specifications: 'RGBW, 15W, WiFi + Bluetooth',
        },
    ]);

    const [newModel, setNewModel] = useState({
        name: '',
        image: '',
        specifications: '',
    });

    const handleAddModel = () => {
        if (newModel.name && newModel.image) {
            setModels([
                ...models,
                {
                    id: Math.random().toString(),
                    ...newModel,
                },
            ]);
            setNewModel({ name: '', image: '', specifications: '' });
        }
    };

    return (
        <div>
            <div className="flex items-center mb-6">
                <Link
                    href={`/admin/categories/${params.categoryId}/products`}
                    className="mr-4"
                >
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Models</h1>
                    <p className="text-gray-500">Manage models for this product</p>
                </div>
            </div>

            <div className="flex justify-end mb-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Model
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Model</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={newModel.name}
                                    onChange={(e) =>
                                        setNewModel({ ...newModel, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <Input
                                    id="image"
                                    value={newModel.image}
                                    onChange={(e) =>
                                        setNewModel({ ...newModel, image: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="specifications">Specifications</Label>
                                <Input
                                    id="specifications"
                                    value={newModel.specifications}
                                    onChange={(e) =>
                                        setNewModel({ ...newModel, specifications: e.target.value })
                                    }
                                />
                            </div>
                            <Button onClick={handleAddModel} className="w-full">
                                Add Model
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                    <Card key={model.id} className="overflow-hidden">
                        <img
                            src={model.image}
                            alt={model.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                            <p className="text-gray-600">{model.specifications}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );}