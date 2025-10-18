import { validationResult } from "express-validator"
import Package from "../models/package.js"
import Category from "../models/category.js"
import Location from "../models/location.js"

export const getAddOptions = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
         //
         const locations = await Location.find({ status: 'published'}).select('_id title').exec()
         const category = await Category.find({ status: 'published'}).select('title _id').exec()


        //  Category.find({ status: 'published' }) → fetches all categories from DB that are published.

         // .select('_id title') → only return _id and title fields.

         res.status(200).json({
            status: true,
            message: '',
            data: {
                locations,
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
export const listAllPackages = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
           const packages = await Package.find({}).populate('location').populate('category') 

           //.populate('location') tells Mongoose:“Go to the Location collection, find the document where _id = 671c7b..., and replace it with that object.”
           res.status(200).json({
                status: true,
                message: "lising all packages",
                data: packages
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

export const addPackages = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
                console.log(req.body, 'creo')

            if (req.body.category && typeof req.body.category === 'string') {
                req.body.category = JSON.parse(req.body.category);
              }
              if (req.body.location && typeof req.body.location === 'string') {
                req.body.location = JSON.parse(req.body.location);
              }

              const {
                title,
                description,
                duration,
                type,
                category,
                status,
                location,
                price

            } = req.body

            console.log(category, 'req body')
            console.log(req.files,'image')
            const images = req.files?.map(file => ({
                url: file.path,          // local path
                publicId: file.filename, // use filename as identifier
                altText: file.originalname,
                isCover: true,          // optional, you can mark the first as cover
              })) || [];
          
            
            const newPackage = new Package({
                title,
                description,
                duration,
                type,
                category: category._id,
                image: images,
                status,
                location: location._id,
                price
            })

            await newPackage.save()

            res.status(200).json({
                status: true,
                message: " package successfully",
                data: null
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


export const updatePackages = async ( req, res, next ) => {
    console.log(req.body, 'eee') 
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
            const {id} = req.params
            if (!id) {
                res.status(400).json({
                    status: false,
                    message: "invalid package:id",
                    data: null
                })
            } else {
                  if (req.body.category && typeof req.body.category === 'string') {
                    req.body.category = JSON.parse(req.body.category);
                  }
                  if (req.body.location && typeof req.body.location === 'string') {
                    req.body.location = JSON.parse(req.body.location);
                  }
                const { title, description, duration, type, category, status, location, price } = req.body
                const images = req.files?.map((file)=>({
                    url: file.path ,
                    publicId: file.filename,
                    altText: file.originalname,
                    isCover: true
                })|| []);
               
                const updatePackage = await Package.findByIdAndUpdate(id, {title, description, duration, type, category, image: images, status, location, price}, { new: true })
                if(!updatePackage){
                    res.status(400).json({
                        status: false,
                        message:" updation failed",
                        data: null
                    })
                }else {
                    res.status(200).json({
                        status: true,
                        message: "updated successfully",
                        data: updatePackage
                    })
                }
            }
          
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

export const deletePackages = async (req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
            const {id} = req.params
            if (!id) {
                res.status(400).json({
                    status: false,
                    message: "invalid package:id",
                    data: null
                })
            } else {
                const deletePackage = await Package.findByIdAndDelete(id)
                if(!deletePackage){
                    res.status(400).json({
                        status: false,
                        message:"failed to delete",
                        data: null
                    })
                }else {
                    res.status(200).json({
                        status: true,
                        message: "deleted successfully",
                        data: deletePackage
                    })
                }
            }
          
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

export const SinglePackage = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
            const {id} = req.params
            console.log(id,'iddddd')
          if(!id){
            res.status(400).json({
                status: false,
                message: "package id  not found",
                data: null
            })
          }else {
            const packageView = await Package.findById(id)
            .populate('category', 'title')
            .populate('location', 'title').exec()

        //     This time,  fetching one single package by ID.
        //    .populate('category', 'title') means:“Replace the category ObjectId with the Category document, but include only its title field.”

            if(!packageView){
                res.status(400).json({
                    status: false,
                    message: "package not found",
                    data: null
                })
            } else {
                res.status(200).json({
                    status: true,
                    message: " package fetched successfully",
                    data: packageView
                })
            }
          }
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

//category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
// location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },

// That means each package stores only the IDs of category and location — not their names.
// When you want to display or return full details (like "title": "Domestic"), you must call populate().