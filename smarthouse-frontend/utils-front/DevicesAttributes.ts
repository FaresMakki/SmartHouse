const DevicesAttribute = [
    {
        "category": "Home Appliances",
        "commonAttributes": [  "temperature", "fanSpeed", "doorOpen", "timeRemaining", "powerLevel"],
    },
    {
        "category": "Lighting",
        "commonAttributes": ["brightness", "color", "powerState"],
    },
    {
        "category": "Connectivity",
        "commonAttributes": ["connectedDevices","SSID","Password"],
    },
    {
        "category": "Sensors",
        "commonAttributes": ["batteryLevel", "temperature", "humidity", "smokeDetected","networkSpeed","energyConsumption"],
    },
    {
        "category": "Smart Devices",
        "commonAttributes": [ "timer", "alarmSet"],

    },

]
//export
export default DevicesAttribute;


