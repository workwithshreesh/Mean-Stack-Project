const ProductsModel = require("../models/productModel")

// getAllproducts,
//     postproducts,
//     putproducts,
//     deleteproducts,
//     TruncateData

const getTotalcount = async () =>{
    try{

        const total = ProductsModel.tostalProduct();
        return total;

    }catch (err) {
        console.log(err,()=>console.log("Error in total count"))
    }
}

const getAllProducts = async (page) => {
    try {
        const rows = ProductsModel.getAllproducts(page);
        return rows;
    } catch (error) {
        console.error("Error fetching Products from DB:", error);
        throw error;
    }
};


const postProducts = async (name,price, category_id) => {
    try {

        const result = ProductsModel.postproducts(name,price, category_id)
        if (!result) {
            return "Data is in valid"
        }
        return result

    } catch (error) {
        console.log("Error inserting in Products", error);
        throw error;
    }
}


const putProducts = async (id, name,price, category_id) => {
    try {

        const result = ProductsModel.putproducts(id, name, price, category_id);
        if (!result) {
            return "Data is invalid";
        }
        return result

    } catch (error){
        console.log("edit the Products", result);
        throw error;
    }
}



const deleteProducts = async (id) => {
    try {

        const result = ProductsModel.deleteproducts(id);
        if (!result) {
            return "Data is invalid";
        }
        return result

    } catch (error){
        console.log("edit the Products", result);
        throw error;
    }
}


const TruncateData = async () => {
    try{

        const result = await ProductsModel.TruncateData();
        return result;

    } catch (error){
        console.log("error in trucate service", error);
        throw error
    }
}


module.exports = {
    getAllProducts,
    postProducts,
    putProducts,
    deleteProducts,
    TruncateData,
    getTotalcount
};
