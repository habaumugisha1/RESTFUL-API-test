process.env.NODE_ENV ='test'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import request from 'request'
import damyData from './damyData'

const should = chai.should()
chai.use(chaiHttp)

describe('Authentication', () => {

    // testing authentication signup
    describe('/api/v1/auth/signup', ()=>{
        it('It should not signup without email', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send({
                    userRole: "admin",
                    password: "sekera"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });
        it('It should not signup with invalid email', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send({
                    email: "habajeunes2gmail.com",
                    userRole: "admin",
                    password: "sekera"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });

        // it('It should not signup without data', (done) =>{
        
        //     chai.request(server)
        //         .post('/api/v1/auth/signup')
        //         .send(damyData.signupWithoutData)
        //         .then((err, res) => {
        //             res.should.have.status(400);
        //         done();

        //         }).catch(error => done(error))
        // });

        it('It should not signup if email exist in database', (done) =>{
        
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(damyData.signupWithEmailExist)
                .end((err, res) => {
                    res.should.have.status(409);
                
                
                });
                done();
                
                
        });
        it('It should not signup if there is hash errors', (done) =>{
        
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(damyData.signupErrorOfHasPassword)
                .then((err, res) => {
                    console.log(res)
                    res.should.have.status(500);
                
                    })
                .catch( error => console.log(error))
                done();
        });
        
        
        
    })


    // testing authentication sign in
    describe('/api/v1/auth/login', ()=>{
        it('It should not sign in without email', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(damyData.loginWithoutEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });
        it('It should not sign in with invalid email', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(damyData.loginWithInvalidEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });
        it('It should not sign in with incorrect email', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/login')
                .send({
                    email:"habajeunes298@gmail.com",
                    password: "sekera"
                })
                .then((err, res) => {
                    console.log(res + 'responce')
                    res.should.have.status(404);

                })
                .catch( err => console.log(err))
            done();
        });
        it('It should not sign in without password', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(damyData.loginWithoutPassword)
                .end((err, res) => {
                    res.should.have.status(400);
 
                })
            done();
        });
         it('It should sign in with  all requirements', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(damyData.login)
                .end((err, res) => {
                    res.should.have.status(200);

                })
            done();
        });
        it('It should not sign in with incorrect password', (done) =>{
            
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(damyData.loginWithIncorrectPassword)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property("message");
                    res.body.should.have.property("message").equal('Pssword incorrect!');
                })
            done();
        });
        

     
    })
})
