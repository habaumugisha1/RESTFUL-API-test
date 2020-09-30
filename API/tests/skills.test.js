process.env.NODE_ENV ='test'
import {use, request, expect} from 'chai'
import chaiHttp from 'chai-http'
import fs from 'fs'
import mongoose from 'mongoose'
import "dotenv/config"
import app from '../../index'
import damyData from './damyData'
import Skills from '../models/skill'

use(chaiHttp)
const uri = process.env.DB_CONFIG;
describe('The skills test', ()=>{
    // before((done) => {
    //     mongoose.connect( uri, { useNewUrlParser: true,  useUnifiedTopology: true}).then( () => done())
    //     .catch((err) => done(err))
    // })

    // after((done) => {
    //     mongoose.disconnect( uri, { useNewUrlParser: true,  useUnifiedTopology: true}).then( () => done())
    //     .catch((err) => done(err))
    // })
    it("it should get a single skill", async () => {
        let skill = new Skills({name:"communication", skillImage:"dfjhgdfgadjfgjadgf"})
        skill.save( async (err, data) => {

       const res = await request(app)
         .get(`/api/v1/skills/${skill.id}`)
        expect(res).have.status([200])
        expect(res.body).have.property("results")
        })
        
    })
    
    it("it should not delete a single skill if not exist", async () => {
        let skill = new Skills({name:"communication", skillImage:"dfjhgdfgadjfgjadgf"})
        await skill.save( async (err, data) => {

       const res = await request(app)
         .delete(`/api/v1/skills/5f69e164abf8fe1601000195/delete`)
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
        expect(res).have.status(404)
        expect(res.body).have.property("message")
        })
        
    })

    it("it should not update a single skill if not exist", async () => {
        let skill = new Skills({name:"communication", skillImage:"dfjhgdfgadjfgjadgf"})
        await skill.save( async (err, data) => {
       const res = await request(app)
         .patch(`/api/v1/skills/5f69e164abf8fe1601000195/edit`)
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
        expect(res).have.status([404])
        expect(res.body).have.property("message")
        })
        
    })
    it("it should  update a single skill if exist", async () => {
        let skill = new Skills({name:"communication", skillImage:"dfjhgdfgadjfgjadgf"})
        await skill.save( async (err, data) => {
       const res = await request(app)
         .patch(`/api/v1/skills/${data.id}/edit`)
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .send({name:"communication skills"})
        expect(res).have.status([200])
        expect(res.body).have.property("message")
        })
        
    })
    it("it should  update image of a single skill if exist", async () => {
        let skill = new Skills({name:"communication", skillImage:"dfjhgdfgadjfgjadgf"})
        await skill.save( async (err, data) => {
       const res = await request(app)
         .patch(`/api/v1/skills/${data.id}/edit`)
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .attach("skillImage", fs.readFileSync("images/how I get into Andela.jpg"), "how I get into Andela.jpg")

        expect(res).have.status([200])
        expect(res.body).have.property("message")
        })
        
    })

it("it should  delete a single skill if exist", async () => {
        let skill = new Skills({name:"communication", skillImage:"dfjhgdfgadjfgjadgf"})
        await skill.save( async (err, data) => {
       const res = await request(app)
         .delete(`/api/v1/skills/${data.id}/delete`)
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
        expect(res).have.status([200])
        expect(res.body).have.property("message")
        })
        
    })

    it("it should not create skills if user is not admin", async() => {
        const res = await request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userToken}`)
         .send({neme:"HTML", skillImage:"hhfksafhaskhflaskdhfalk"})
        expect(res).have.status([403]);
        expect(res.body).have.property("message");
        expect(res.body.message).to.equals("Only admin is allowed")
    })

     it("it should not create skills without name", async () => {
       const res = await request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .send({skillImage:"hhfksafhaskhflaskdhfalk"})
          expect(res).have.status([400])
    })

    // it("it should not create skills without token", async () => {
    //     const res = await request(app)
    //      .post('/api/v1/addSkills')
    //      .set('Authorization', `Bearer ${damyData.emptyToken}`)
    //      .send({name:"make tokens",skillImage:"hhfksafhaskhflaskdhfalk"})
    //          expect(res).have.status([400])
    //          expect(res.body).have.property("error")
    // })

    it("it should create skills without error", async () => {
        const res = await request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .set('Content-Type', 'multipart/form-data')
         .field("name","mongoDb")
         .attach("skillImage", fs.readFileSync("images/how I get into Andela.jpg"), "how I get into Andela.jpg")
        expect(res).have.status([201])
        expect(res.body).have.property("data")
        expect(res.body).have.property("message")
    })

    it("it should get all  skills ", async () => {
       const res = await request(app)
         .get('/api/v1/skills')
        expect(res).have.status([200])
        expect(res.body).have.property("data")
        
    })
     
     it("it should get a single skill", async () => {
        let skill = new Skills({name:"communication", skillImage:"dfjhgdfgadjfgjadgf"})
        skill.save( async (err, data) => {

       const res = await request(app)
         .get(`/api/v1/skills/5f69e164abf8fe1601000195`)
        expect(res).have.status([404])
        expect(res.body).have.property("message")
        })
        
    })
    
    
});