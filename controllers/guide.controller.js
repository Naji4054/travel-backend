import { validationResult } from "express-validator"
import Guide from "../models/guide.js"

export const listAllGuide = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
            const { gender, availability, searchQuery } = req.query

            const filterConfig = {}  
            
            if ( searchQuery){
                const searchTerm = searchQuery.toLowerCase()
                filterConfig.$or = [{name: { $regex: searchTerm, $options: 'i'}}, {location: {$regex: searchTerm, $options: 'i'}}]
            }

            if( gender &&  gender !== 'all'){
                
                filterConfig.gender= gender
            }
            if( availability &&  availability !== 'all'){

                filterConfig.availability = availability === 'active' ? true : false
            }
            const guides = await Guide.find(filterConfig)
            res.status(200).json({
                status: true,
                message: "listing all guides",
                data: guides
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
export const addGuide = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
         
            const {
                name,
                age,
                gender,
                email,
                phone,
                location,
                language,
                availability
            } = req.body

            const newGuide = new Guide ({
                name,
                age,
                gender,
                email,
                phone,
                location,
                language,
                availability
            })
            await newGuide.save()
            res.status(200).json({
                status: true,
                message: "guide added successfully",
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
export const updateGuide = async ( req, res, next ) => {
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
                message: "invalid guide:id",
                data: null
            })
        } else {
            const {
            name,
            age,
            gender,
            email,
            phone,
            location,
            language,
            availability
        } = req.body

        const updateGuide = await Guide.findByIdAndUpdate(id,{name,
            age,
            gender,
            email,
            phone,
            location,
            language,
            availability}, {new: true} )
        
        }
        if(!updateGuide){
            res.status(400).json({
                status: false,
                message:" updation failed",
                data: null
            })
        }else {
            res.status(200).json({
                status: true,
                message: "updated successfully",
                data: updateGuide
            })
        }}
   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            messgae: " internal server error",
            data: null
        })
    }
}
export const deleteGuide = async ( req, res, next ) => {
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
                    message: "invalid guide:id",
                    data: null
                })
            } else {
                const deleteGuide = await Guide.findByIdAndDelete(id)
                if(!deleteGuide){
                    res.status(400).json({
                        status: false,
                        message:"failed to delete",
                        data: null
                    })
                }else {
                    res.status(200).json({
                        status: true,
                        message: "deleted successfully",
                        data: deleteGuide
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
export const singleGuide = async ( req, res, next ) => {
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
            if(!id){
                res.status(400).json({
                    status: false,
                    messgae: "guide id not found",
                    data: null
                })
            }else {
                const singleGuide = await Guide.findById(id)
                if(!singleGuide){
                    res.status(400).json({
                        status: false,
                        message: "guide not found",
                        data: null
                    })
                } else {
                    res.status(200).json({
                        status: true,
                        message: " guide fetched successfully",
                        data: singleGuide
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