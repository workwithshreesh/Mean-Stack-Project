const categorySevice = require("../services/categoryService");

const getcategories = async (req,res) =>{
    try {
        const page = parseInt(req.query.page) || 1;

        const categories = await categorySevice.getAllCategory(page);
        const totalCount = await categorySevice.getTotalcount();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        res.status(200).json({
            categories,
            totalCount, 
            currentPage: page,
        });
    } catch (error) {
        console.error("Error in getcategories:", error);
        res.status(500).json({ message: "Error fetching categories", error: error.message });
      }
}


const InsertCategory = async (req,res) => {
    try{
        const {name} = req.body
        if (!name){
            return res.status(400).json({
                message:"category name not found"
            });
        }
        const Insertcategory = await categorySevice.postCategory(name);
        return res.status(200).json(Insertcategory)

    } catch (error){
        console.error("Error in insert category", error);
        res.status(500).json({ message: "Error inserting categories", error: error.message})
    }
}



const EditCategory = async (req,res) =>{
    try{

        const {name} = req.body;
        const id = req.params.id
        if (!id || !name){
            return res.status(400).json({message:"In correct data is provided"});
        }
        const result = await categorySevice.putCategory(id, name);
        if (!result) {
            return res.status(404).json({ message: "Category not found." });
          }
        console.log(id,name)
        return res.status(200).json(result)

    }catch (error){
        console.log("Edit category in controller");
        throw error
    }
}


const DeleteCategory = async (req,res) => {
    try{

        const id = req.params.id;
        if (!id ){
            return res.status(400).json({message:"In correct data is provided"});
        }

        const result = await categorySevice.deleteCategory(id);

        return res.status(200).json(result);

    } catch (error){
        console.log("error in delete categroy in controller", error)
    }
}


const TruncateData = async (req,res) => {
    try{

        const result = await categorySevice.TruncateData();
        return res.status(200).json(result)

    }catch (error){
        console.log("error in truncate controller", error);
        throw error
    }
}


module.exports = {
    getcategories,
    InsertCategory,
    EditCategory,
    DeleteCategory,
    TruncateData,
}