import Navbar from "@/components/navbarHome";
import ConsumptionHint from "@/components/consumption-hint";
import DeviceList from "@/components/devices-summary-homepage";
import RoomList from "@/components/rooms-summary";

const Page = () => {
    return (
        <div>
            <Navbar />
            <ConsumptionHint />
            <div className="flex flex-col md:flex-row justify-center items-start gap-6 px-4 max-w-5xl mx-auto mt-10">
                <DeviceList />
                <RoomList />
            </div>
        </div>
    );
};

export default Page;
