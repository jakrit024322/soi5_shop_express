// Import Product Schema
const Book = require('../models/bookModel');
exports.getBook = async (req, res) => {

    //equal to db.products.find();
    Book.find()      // equal to db.products.find();
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getBookById = async (req, res) => {
    Book.findById(req.params.id)     //find product by id
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getBookByName = async (req, res) => {
    let bookName = req.params.name;
    Book.find({      //find product by a name field, using regular expression
            name: {
                $regex: new RegExp(bookName),
                $options: 'i'
            }
        })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addBook = async (req, res) => {
    try {
        // define a new product schema, define data from request body
        let book = new Book({
            name: req.body.name,
            authos: req.body.authos,
            publisher: req.body.publisher,
            price: req.body.price,
            borrowstudent: req.body.borrowstudent,
            borrowteacher: req.body.borrowteacher
            // no reviews yet for now
        });
        // store result from saving
        let createdBook = await book.save();
        res.status(200).json({
            msg: "Add a Book complete.",
            data: createdBook
        });
    } catch (err) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editWholeBook = async (req, res) => {
    let book = {
        name: req.body.name,
            authos: req.body.authos,
            publisher: req.body.publisher,
            price: req.body.price,
            borrowstudent: req.body.borrowstudent,
            borrowteacher: req.body.borrowteacher
    };
    Book.findByIdAndUpdate(req.params.id, book)       //find by id first, then update the returned document
        .exec((err, result) => {
            Book.findById(req.params.id)
                .exec((err, result) => {
                    // return doc ที่แก้ไขแล้วกลับไป
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

// สมมติว่าให้ การเพิ่ม Review มาทำใน editProduct
// exports.editBook = async (req, res) => {
//     let reviewData = {
//         $push: {
//             reviews:
//             {
//                 star: req.body.star,
//                 comment: req.body.comment
//             }
//         }
//     };
//     Product.findByIdAndUpdate(req.params.id, reviewData)
//         .exec((err, result) => {
//             Product.findById(req.params.id)
//                 .exec((err, result) => {
//                     // return doc ที่แก้ไขแล้วกลับไป
//                     res.status(200).json({
//                         msg: "OK",
//                         data: result
//                     });
//                 });
//         });
// };

exports.deleteBook = async (req, res) => {
    Book.findByIdAndDelete(req.params.id)        //find product by id, then delete
        .exec((err)=>{
            if(err){
                res.status(500).json({
                    msg: err
                });
            } else{
                res.status(200).json({
                    msg: "Delete complete"
                });
            }
        });
};