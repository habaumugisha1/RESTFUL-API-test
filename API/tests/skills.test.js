process.env.NODE_ENV ='test'
import {use, request, expect} from 'chai'
import chaiHttp from 'chai-http'
import fs from 'fs'
import app from '../../index'
import damyData from './damyData'

use(chaiHttp)

describe('The skills test', ()=>{
    it("it should not create skills if user is not admin", async() => {
        const res = await request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userToken}`)
         .send({neme:"HTML", skillImage:"hhfksafhaskhflaskdhfalk"})
        //  .then((res) =>{
            console.log(res.body)
        expect(res).have.status([403]);
        expect(res.body).have.property("message");
        expect(res.body.message).to.equals("Only admin is allowed")
        //  done()
        //  })
        //  .catch((err) => done(err))
    })

     it("it should not create skills without name", async () => {
       const res = await request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .send({skillImage:"hhfksafhaskhflaskdhfalk"})
        //  .end((err, res) =>{
            console.log(res.body)
          expect(res).have.status([400])
        // done(err)
        //  })
    })
    it("it should not create skills without token", async () => {
        const res = await request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.emptyToken}`)
         .send({name:"make tokens",skillImage:"hhfksafhaskhflaskdhfalk"})
        //  .end((err, res) =>{
            console.log(res.body)
             expect(res).have.status([400])
             expect(res.body).have.property("error")
        // done(err)
        //  })
    })

    it("it should create skills without error", async () => {
        const res = await request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .set('Content-Type', 'multipart/form-data')
         .field("name","mongoDb")
         .attach("skillImage", fs.readFileSync("images/how I get into Andela.jpg"), "how I get into Andela.jpg")
        //  .then(res =>{
            console.log(res.body)
        expect(res).have.status([201])
        expect(res.body).have.property("data")
        expect(res.body).have.property("message")
             
        //  done()
        //  })
        //  .catch((err) => done(err))
    })
    it("it should get all  skills ", async () => {
       const res = await request(app)
         .get('/api/v1/skills')
        //  .then(res =>{
             console.log(res.body)
        expect(res).have.status([200])
        expect(res.body).have.property("data")
        //  done()
        //  })
        //  .catch((err) => done(err))
    })
});