process.env.NODE_ENV = "test";

const app = require('../app');
const request = require('supertest');
let items = require('../fakeDB')

let pickles = {name:'pickle',price:20}
describe('item routes',()=>{
    beforeEach(()=>{
        pickles = {name:'pickle',price:20}
        items.push(pickles)
    })
    afterEach(()=>{
        items.length = 0;
    })
    test('GET /items returns all items',async ()=>{
        let res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([pickles])
    })
    test('GET /items/:name returns valid object',async ()=>{
        let res = await request(app).get('/items/pickle')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(pickles)
    })
    test('GET /items/:name returns 404 if not valid name', async()=>{
        let res = await request(app).get('/items/invalid')
        expect(res.statusCode).toBe(404)
    })
    test('POST /items creates new item',async()=>{
        let res = await request(app).post('/items').send({
            name:'beans',
            price:30
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({added:{
            name:"beans",
            price:30
        }})
    })
    test('PATCH /items/:name edits item', async()=>{
        let res = await request(app).patch('/items/pickle').send({
            name:'banana'
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated:{name:'banana',price:20}})
    })
    test('PATCH /items/:name returns 404 for invalid name', async()=>{
        let res = await request(app).patch('/items/beans').send({
            name:'banana'
        })
        expect(res.statusCode).toBe(404)
    })
    test('DELETE /items/:name deletes properly', async()=>{
        let res = await request(app).delete('/items/pickle')
        console.log(items)
        expect(res.statusCode).toBe(200)
    })
    test('DELETE /items/:name returns 4040 bad name', async()=>{
        let res = await request(app).delete('/items/notaname')
        expect(res.statusCode).toBe(404)
    })

})