import { validationResult } from "express-validator"
import Location from "../models/location.js"

export const listAllLocation = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
           const location = await Location.find({})
           res.status(200).json({
                status: true,
                message: "lising all location",
                data: location
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

export const addLocation = async ( req, res, next ) => {
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
                title,
                country,
                state,
                city,
                createdBy,
                isDeleted,
                status
            } = req.body
            
            const newLocation = new Location({
                title,
                country,
                state,
                city,
                createdBy,
                isDeleted,
                status
            })

            await newLocation.save()

            res.status(200).json({
                status: true,
                message: " Location added successfully",
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

export const updateLocation = async ( req, res, next ) => {
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
                    message: "invalid location:id",
                    data: null
                })
            } else {
                const { title,
                    country,
                    state,
                    city,
                    createdBy,
                    isDeleted,
                    status } = req.body

                const updateLocation = await Location.findByIdAndUpdate(id, {title,
                    country,
                    state,
                    city,
                    createdBy,
                    isDeleted,
                    status})
                if(!updateLocation){
                    res.status(400).json({
                        status: false,
                        message:" failed to update Location",
                        data: null
                    })
                }else {
                    res.status(200).json({
                        status: true,
                        message: "updated category Location",
                        data: updateLocation
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

export const deleteLocation = async (req, res, next ) => {
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
                    message: "invalid location:id",
                    data: null
                })
            } else {
                const deleteLocation = await Category.findByIdAndDelete(id)
                if(!deleteLocation){
                    res.status(400).json({
                        status: false,
                        message:"failed to delete category",
                        data: null
                    })
                }else {
                    res.status(200).json({
                        status: true,
                        message: "deleted category successfully",
                        data: deleteLocation
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