export async function GetCategorys():Promise<any[]>{
    const response=await  fetch(`http://localhost:3001/product/getall`, {cache:'no-store'})
    if (!response.ok) {
        throw new Error('fetch failed');
    }

    const data= await response.json()

    return data.products

}

export async function UpdateCategory(cat,desc,id):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/update/${id}`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: desc,
                category: cat,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log("Product updated successfully:", data);
    } catch (error) {
        console.error("Error updating product:", error.message);
        console.log(error.message)
    }
};
export async function DeleteCategory(id):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/delete/${id}`, {
            method: "POST",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON response
        console.log("Product deleted successfully:", data);
    } catch (error) {
        console.error("Error deleing product:", error.message);
        console.log(error.message)
    }
};

export async function ADDCategory(cat,desc):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/add`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: desc,
                category: cat,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Product Added successfully:", data);
    } catch (error) {
        console.error("Error updating product:", error.message);
        console.log(error.message)
    }
};

export async function ADDProduct(device):Promise<any>{
    try {
        const response = await fetch(`http://localhost:3001/product/addSubProd/673396583ba0025fbb896fac`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(device),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Product Added successfully:", data);
    } catch (error) {
        console.error("Error updating product:", error.message);
        console.log(error.message)
    }
};
export async function GetAlldevices():Promise<any[]>{
    const response=await  fetch(`http://localhost:3001/product/getSubProd/673396583ba0025fbb896fac`, {cache:'no-store'})
    if (!response.ok) {
        throw new Error('fetch failed');
    }

    const data= await response.json()

    return data.subDevices

}
