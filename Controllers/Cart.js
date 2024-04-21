import express from 'express';
import Cart from '../Models/Cart.js';
import { createError } from '../utils/error.js';

export const createCart = async (req, res, next) => {
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        next(error);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    }
    catch (error) {
        next(error);
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart deleted');
    } catch (error) {
        next(error);
    }
}

export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}
