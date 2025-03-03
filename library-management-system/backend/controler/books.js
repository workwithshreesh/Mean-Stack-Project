const Books = require("../models/books");
const { findByIdAndDelete } = require("../models/user");

const AddNewBook = async (req,res) =>{
    try{

        const {bookname, description, bookAuthor} = req.body;

        if(!bookname, !description, !bookAuthor){
            return res.status(404).json({message:"Bad Request"});
        }

        const addNew = new Books({
            bookAuthor,
            bookname,
            description
        });

        await addNew.save();

        return res.status(201).json({message:addNew});

    }catch (error){
        console.log(error, "error is in add new book func");
        throw error
    }
}


const UpdateBook = async (req,res) => {
    try{

        const {bookAuthor, bookname, description} = req.body;
        const Id = req.params.id

        const updatedData = {}

        if (bookAuthor) updatedData.bookAuthor = bookAuthor;
        if (bookname) updatedData.bookname = bookname;
        if (description) updatedData.description = description;

        const updateBook = await Books.findByIdAndUpdate(Id, updatedData, {new: true});

        if(!updateBook){
            return res.status(404).json({message:"book is not created"});
        }

        return res.status(200).json({message:updateBook})

    }catch (error){
        console.log(error, "error in update func");
        throw error
    }
}


const DeleteBook = async (req,res) => {
    try{

        const Id = req.params.id;
        if(!Id){
            res.status(404).json({message:"Id is not found"})
        }

        const book = await Books.findByIdAndDelete(Id)
        if(!book){
            return res.status(404).json({message:"book is deleted"});
        }

        return res.status(200).json({message:book});

    }catch (error){
        console.log(error, "error in delete book");
        throw error
    }
}


const GetAllBook = async (req,res) => {
    try{

        const book = await Books.find();
        if(!book){
            return res.status(404).json({message:"Bad Methods"});
        }

        return res.status(200).json({message:book});

    }catch(error){
        console.log(error, "error in get all book");
        throw error;
    }
}



const getBookById = async (req,res) => {
    try{

        const Id = req.params.id;

        if(!Id){
            return res.status(404).json({message:"id is not provided"})
        }

        const book = await Books.findById(Id);
        console.log(book)

        if(!book){
            return res.status(404).json({message:"Book is not found"});
        }

        return res.status(200).json({message:book});


    }catch (error){
        console.log(error, "error in getBookById");
        throw error;
    }
}


module.exports = {

    AddNewBook,
    UpdateBook,
    DeleteBook,
    GetAllBook,
    getBookById

}