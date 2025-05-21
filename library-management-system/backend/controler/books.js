const Books = require("../models/books");
const { findByIdAndDelete } = require("../models/user");

const AddNewBook = async (req,res) =>{
    try{

        const {bookname, description, bookAuthor} = req.body;

        if(!bookname && !description && !bookAuthor){
            const error = new Error("Bad Request");
            error.statusCode = 409;
            throw error;
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

        const status = error.statusCode || 500;
        return res.status(status).json({error: error.message});
    }
}


const UpdateBook = async (req,res) => {
    try{

        const {bookAuthor, bookname, description} = req.body;
        const Id = req.params.id;

        const updatedData = {};

        if (bookAuthor) updatedData.bookAuthor = bookAuthor;
        if (bookname) updatedData.bookname = bookname;
        if (description) updatedData.description = description;

        const updateBook = await Books.findByIdAndUpdate(Id, updatedData, {new: true});

        if(!updateBook){
            const error = new Error("book is not created");
            error.statusCode = 409;
            throw error;
        }

        return res.status(200).json({message:updateBook})

    }catch (error){
        console.log(error, "error in update func");

        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message });
    }
}


const DeleteBook = async (req,res) => {
    try{

        const Id = req.params.id;
        if(!Id){
            const error = new Error("Id is not found");
            error.statusCode = 409;
            throw error
        }

        const book = await Books.findByIdAndDelete(Id)
        if(!book){
            return res.status(404).json({message:"book is deleted"});
        }

        return res.status(200).json({message:book});

    }catch (error){
        console.log(error, "error in delete book");

        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message })

    }
}


const GetAllBook = async (req,res) => {
    try{

        const book = await Books.find();
        if(!book){
            const error = new Error("Bad Methods");
            error.statusCode = 409;
            throw error;
        }

        return res.status(200).json({message:book});

    }catch(error){
        console.log(error, "error in get all book");

        const status = error.statusCode || 500;
        return res.status(status).json({message: error.message});
    }
}



const getBookById = async (req,res) => {
    try{

        const Id = req.params.id;

        if(!Id){
            const error = new Error("Id is not provided");
            error.status = 409;
            throw error;
        }

        const book = await Books.findById(Id);
        console.log(book)

        if(!book){
            const error = new Error("Book is not found");
            error.statusCode = 409 || 500;
            throw error;
        }

        return res.status(200).json({message:book});


    }catch (error){
        console.log(error, "error in getBookById");
        const status = error.statusCode || 500;
        return res.status(status).json({error: error.message});
    }
}


module.exports = {

    AddNewBook,
    UpdateBook,
    DeleteBook,
    GetAllBook,
    getBookById

}