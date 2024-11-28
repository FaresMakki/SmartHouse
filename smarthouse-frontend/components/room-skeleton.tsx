import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RoomSkeleton: React.FC = () => {
    return (
        <Card className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Skeleton className="h-6 w-6 rounded-full mr-2" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} className="h-20 rounded-xl" />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RoomSkeleton;