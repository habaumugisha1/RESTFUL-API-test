process.env.NODE_ENV ='test'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import mongoose from 'mongoose'
import Contacts from "../models/contact";
import damyData from './damyData'

chai.should()
chai.use(chaiHttp)
// clea up database

describe('Contacts', () => {

    // testing create contacts message
    describe('/api/v1/newContact', ()=>{
        it('It should not create contacts message without name', (done) =>{
            let contact = {
                email: "habajeunes2@gmail.com",
                content :"nice tests"
            }
            chai.request(server)
                .post('/api/v1/newContact')
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });

        it('It should not create contacts message without input data', (done) =>{
            
            let conta = {}
            chai.request(server)
                .post('/api/v1/newContact')
                .send(conta)
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });

        it('It should create contact message with input data', (done) =>{
            
            let contactData = {
                name:"ami des jeunes",
                email: "habajeunes2@gmail.com",
                content :"nice tests"
            }
            chai.request(server)
                .post('/api/v1/newContact')
                .send(contactData)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    
                })
                done();
        })

        it('It should get contact message if is admin', (done) =>{
            
            chai.request(server)
                .get('/api/v1/contacts')
                .set('Authorization', `Bearer ${damyData.userAdminToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
        it('It should not get contact message if is not admin', (done) =>{
            
            chai.request(server)
                .get('/api/v1/contacts')
                .set('Authorization', `Bearer ${damyData.userToken}`)
                .end((err, res) => {
                    console.log(err)
                    res.should.have.status(403);
                    done();
                })
        })
        it('It should not get contact message if is not no token', (done) =>{
            
            chai.request(server)
                .get('/api/v1/contacts')
                .set('Authorization', `Bearer ${damyData.emptyToken}`)
                .end((err, res) => {
                    console.log(err)
                    res.should.have.status(400);
                    done();
                })
        })
    })
})
