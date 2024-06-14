import server from '../../index'
import request from 'supertest'

describe('GET /api/productos', () => {
    test('Should respond with 200 status code', async() => {
        const respose = await request(server).get('/api').send()
        expect(respose.statusCode).toBe(200)
    }) 
})