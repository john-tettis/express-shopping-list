const express = require('express')
const ExpressError = require('./expressError')
const router = new express.Router()
let items = require('./fakeDB')



router.get('/',(req,res)=>{
    return res.status(200).json(items)

})
router.post('/',(req,res,next)=>{
    try{
        let price = req.body.price;
        let  name = req.body.name;
        if(!name || !price){throw new ExpressError('Invalid information for shopping list', 400)}
        else{
            let item ={name: name, price: price};
            items.push(item)
            res.status(201).json({added:item})
        }
    }
    catch(e){
        next(e)
    }
})
router.get('/:name',(req,res,next)=>{
    try{
        let item = items.find(item => item.name===req.params.name)
        if(!item){throw new ExpressError('Item not found',404)}
        return res.status(200).json(item)
    }
    catch(e){
        next(e)
    }
})

router.patch('/:name',(req,res,next)=>{
    try{
        let item = items.find(item => item.name===req.params.name)
        if(!item){throw new ExpressError('Item not found',404)}
        else{
            let i = items.indexOf(item)
            let price = req.body.price
            let  name= req.body.name
            items[i].name = name || item.name
            items[i].price = price || item.price
            
            return res.status(200).json({updated:item})
        }
    }
    catch(e){
        next(e)
    }
})
router.delete('/:name',(req,res,next)=>{
    try{
        let new_items = items.filter(item => item.name!==req.params.name)
        if(new_items.length == items.length){throw new ExpressError('Item not found',404)}
        items = new_items
        return res.status(200).json({message:"Deleted"})
    }
    catch(e){
        next(e)
    }
})

module.exports = router