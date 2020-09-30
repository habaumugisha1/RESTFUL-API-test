import {use, request, expect} from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index'
import damyData from '../tests/damyData'
use(chaiHttp)

describe('/api/v1/blogs/:id/newComment', () => {
    it('should not comment on blog without name', async () =>{
        const res = await request(app)
        .post('/api/v1/blog/5f69e164abf8fe1601000195/newComment')
        .send({description:"jhgsdghsglkjghlskhg"})
        expect(res).have.status(400)
    })

    it('should not comment on blog without blog ', async () =>{
        const res = await request(app)
        .post('/api/v1/blog/5f69e164abf8fe1601000194/newComment')
        .send({name:"aimable",description:"jhgsdghsglkjghlskhg"})
        expect(res).have.status(404)
        expect(res.body.status).to.equal(404)
    })
    it('should comment on blog', async () =>{
        const res = await request(app)
        .post('/api/v1/blog/5f65d80b778fb914a888a726/newComment')
        .send({name:"aimable",description:"the test is complicated somehow"})
        expect(res).have.status(201)
        expect(res.body.status).to.equal(201)
    })
})