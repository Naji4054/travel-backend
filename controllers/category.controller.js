import { validationResult } from "express-validator"
import Category from "../models/category.js"

export const listAllCategory = async ( req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                messgae: " validation failed",
                data: null
            })
        }else {
           const category = await Category.find({})
           res.status(200).json({
                status: true,
                message: "lising all categories",
                data: category
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

export const addCategory = async ( req, res, next ) => {
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
                description,
                createdBy,
                isDeleted,
                status
            } = req.body
            
            const newCategory = new Category({
                title,
                description,
                createdBy,
                isDeleted,
                status
            })

            await newCategory.save()

            res.status(200).json({
                status: true,
                message: " category added successfully",
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

export const updateCategory = async ( req, res, next ) => {
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
                    message: "invalid category:id",
                    data: null
                })
            } else {
                const { title,
                    description,
                    duration,
                    createdBy,
                    isDeleted,
                    status } = req.body

                const updateCategory = await Category.findByIdAndUpdate(id, {title,
                    description,
                    duration,
                    createdBy,
                    isDeleted,
                    status})
                if(!updateCategory){
                    res.status(400).json({
                        status: false,
                        message:" failed to update category",
                        data: null
                    })
                }else {
                    res.status(200).json({
                        status: true,
                        message: "updated category successfully",
                        data: updateCategory
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

export const deleteCategory = async (req, res, next ) => {
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
                const deleteCategory = await Category.findByIdAndDelete(id)
                if(!deleteCategory){
                    res.status(400).json({
                        status: false,
                        message:"failed to delete category",
                        data: null
                    })
                }else {
                    res.status(200).json({
                        status: true,
                        message: "deleted category successfully",
                        data: deleteCategory
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