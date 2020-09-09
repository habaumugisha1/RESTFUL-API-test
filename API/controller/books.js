import express from 'express'
import Book from '../modals/bookModal';
import mongoose from 'mongoose'

class Books {
    static async getBooks(req, res){
        await Book.find( (err, book) =>{

            res.status(200).json({
                status:200,
                message:"I am getting the books.",
                book
            })
            if(err){
                res.json({
                    error : err.message
                })
            }
        })
    }


    static async createBook(req, res){
        const books = new Book({
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            author :req.body.author
        });
       const findBooks = await Book.find()
       if(findBooks[0].name == req.body.name){
           console.log("book is already created")
           return false
       } else{

           await books.save((err, data) => {
            if(err){
                res.status(400).json({error:err.message})
            }
            res.status(201).json({
                message:"a book created successful",
                data: data
            })
                    
        });
       }
    }
}

export default Books;