// categoryService.js (or wherever you handle the category logic)
const promisePool = require("../utils/dbConnection");

const tostalCategory = async () =>{
    const limit = 10;
    const countQuery = `SELECT COUNT(*) AS total FROM categories`;
    const [countResult] = await promisePool.execute(countQuery);
    const totalRecords = countResult[0].total;
    return  Math.ceil(totalRecords/limit)

}

const getAllCategory = async (page) => {
    try {
        const limit = "10";
        const offset = (page - 1) * parseInt(limit);
          
        const [rows] = await promisePool.execute("SELECT * FROM categories LIMIT ? OFFSET ?",[limit, offset.toString()]);
        return rows; 
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; 
    }
};




const postCategory = async (name) => {
    try{

        const [result] = await promisePool.execute("INSERT INTO categories (name) VALUES (?)", [name])
        return result

    }catch (error){
        console.log("Error inserting in categories",error);
        throw error;
    }
}


const putCategory = async (id, name) => {
    try{

        const [rows] = await promisePool.execute('UPDATE categories SET name = ? WHERE id = ?', [name, id]);

        return rows

    } catch (error){
        console.log("edit the category",error);
        throw error
    }
}

const deleteCategory = async (id) => {
    try{

        const [rows] = await promisePool.execute("DELETE FROM categories WHERE id = ?", [id]);
        return rows

    } catch (error){
        console.log("edit the category",error);
        throw error
    }
}


const TruncateData = async () => {
    try{

        const result = await promisePool.execute("TRUNCATE TABLE categories");
        return result;

    }catch (error){
        console.log("error in trucate model", error);
        throw error;
    }
}


module.exports = {
    getAllCategory,
    postCategory,
    putCategory,
    deleteCategory,
    TruncateData,
    tostalCategory
};
