function transformSettings(settings) {
    const transformedSettings = {}; // Object to hold the new structure

    // Iterate through each key-value pair in the original settings
    for (const [key, value] of Object.entries(settings)) {
        if (value === "readWrite") {
            transformedSettings[key] = { state: "write", value: "" }; // Add 'write' state with empty value
        } else if (value === "readOnly") {
            transformedSettings[key] = { state: "read" }; // Add 'read' state
        }
    }

    return transformedSettings; // Return the transformed settings
}
//export
module.exports = { transformSettings };