import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import fs from 'fs'
import app from '../../index'
import damyData from './damyData'

chai.use(chaiHttp)

describe('The skills test', ()=>{
    it("it should not create skills if user is not admin", (done) => {
        chai.request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userToken}`)
         .send({neme:"HTML", skillImage:"hhfksafhaskhflaskdhfalk"})
         .end((err, res) =>{
             expect(res).have.status([403])
        done(err)
         })
    })

     it("it should not create skills without name", (done) => {
        chai.request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .send({skillImage:"hhfksafhaskhflaskdhfalk"})
         .end((err, res) =>{
             expect(res).have.status([400])
        done(err)
         })
    })
    it("it should not create skills without token", (done) => {
        chai.request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.emptyToken}`)
         .send({name:"make tokens",killImage:"hhfksafhaskhflaskdhfalk"})
         .end((err, res) =>{
             expect(res).have.status([400])
             expect(res.body).have.property("error")
        done(err)
         })
    })

    it("it should create skills without error", (done) => {
        chai.request(app)
         .post('/api/v1/addSkills')
         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
         .set('Content-Type', 'multipart/form-data')
         .field("name","mongoDb")
         .attach("skillImage", fs.readFileSync("images/how I get into Andela.jpg"))
         .end((err, res) =>{
             expect(res).have.status([201])
        done(err)
         })
    })
    it("it should get all  skills ", (done) => {
        chai.request(app)
         .get('/api/v1/skills')
         .end((err, res) =>{
             expect(res).have.status([200])
        done(err)
         })
    })
})