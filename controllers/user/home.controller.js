import { validationResult } from "express-validator"
import Category from "../../models/category.js"
import Package from "../../models/package.js"

// export const getOptions = async ( req, res, next ) => {
//     try {
//         const errors = validationResult(req)
//         if(!errors.isEmpty()){
//             res.status(400).json({
//                 status: false,
//                 messgae: " validation failed",
//                 data: null
//             })
//         }else {
//          //
//          const category = await Category.find({ status: 'published'}).select('title _id').exec()


//         //  Category.find({ status: 'published' }) → fetches all categories from DB that are published.

//          // .select('_id title') → only return _id and title fields.

//          res.status(200).json({
//             status: true,
//             message: '',
//             data: {
//                 category
//             }
//          })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             status: false,
//             messgae: " internal server error",
//             data: null
//         })
//     }
// }

export const listPackages = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
            // const {limit, page} = req.query
            const category = await Category.find({ status: 'published'}).select('title _id').exec()
            const packages = await Package.find({}).limit(4).populate({
            path: 'category',
            select: '_id title'
           }) 
           //.populate('location') tells Mongoose:“Go to the Location collection, find the document where _id = 671c7b..., and replace it with that object.”
           res.status(200).json({
                status: true,
                message: "lising all packages",
                data:{
                    packages,
                    category
                } 
           })

          
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            messgae: " internal server error",
            data: null
        })
    }
}