process.env.NODE_ENV ='test'
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs'
import app from '../../index'
import damyData from './damyData'

chai.use(chaiHttp)

describe( "This is article", ()=>{
it("should not create article if no title provided", (done) => {
    chai.request(app)
    .post('/api/v1/newArticle')
    .set('Authorization', `Bearer ${damyData.userAdminToken}`)
    .send({articleImage:"sdhfhdfsfjasfs",
    description:"hfajshfdasdfvlajsfv"})
    .end((error, res) => {
        expect(res).to.have.status([400]);
        done(error)
    })
})
it('It should get an article if is not exist', (done) =>{
            
            chai.request(app)
                .get('/api/v1/blogs/61')
                .end((error, res) => {
                    expect(res).to.have.status([404]);
                    expect(res.body).to.have.property('status');
                done(error);

                })
        });
        
       

})