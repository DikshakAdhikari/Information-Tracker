import mongoose from 'mongoose'
import express from 'express'

const userSchema= new mongoose.Schema({
    username: String,
    password: String
})

export const User= mongoose.model('User', userSchema);

