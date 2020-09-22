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
// it("should not create article if no user is not admin", (done) => {
//     chai.request(app)
//     .post('/api/v1/newArticle')
//     .set('Authorization', `Bearer ${damyData.userToken}`)
//     .send({articleImage:"sdhfhdfsfjasfs",
//     description:"hfajshfdasdfvlajsfv"})
//     .end((error, res) => {
//         expect(res).to.have.status([403]);
//         done(error)
//     })
// })
it("should not create article if no user is no token provided", (done) => {
    chai.request(app)
    .post('/api/v1/newArticle')
    .set('Authorization', `Bearer ${damyData.emptyToken}`)
    .send({articleImage:"sdhfhdfsfjasfs",
    description:"hfajshfdasdfvlajsfv"})
    .end((error, res) => {
        expect(res).to.have.status([400]);
        done(error)
    })
})
// it('It should create article', (done) =>{
            
//             chai.request(app)
//                 .post('/api/v1/newArticle')
//                 .set('Authorization', `Bearer ${damyData.userAdminToken}`)
//                 .set('Content-Type', 'multipart/form-data')
//                 .field('title', 'franklin')
//                 .attach('articleImage',
//         fs.readFileSync('images/how I get into Andela.jpg'),'how I get into Andela.jpg')
//                 .field('description', 'testing files')
//                 .end((error, res) => {
//                     expect(res).to.have.status([201])
//                 done(error);

//                 })
//         });

        // it('It should get all articles', (done) =>{
            
        //     chai.request(app)
        //         .get('/api/v1/blogs')
                
        //         .end((error, res) => {
        //             expect(res).to.have.status([200]);
        //             expect(res.body).to.have.property('status');
        //         done(error);

        //         })
        // });
        it('It should get an article if is not exist', (done) =>{
            
            chai.request(app)
                .get('/api/v1/blogs/61')
                .end((error, res) => {
                    expect(res).to.have.status([404]);
                    expect(res.body).to.have.property('status');
                done(error);

                })
        });
        
        // it('It should get all articles', (done) =>{
        //     const id = '5f687da09ea6421941ecfd38'
        //     chai.request(app)
        //         .get('/api/v1/blogs/id')
                
        //         .end((error, res) => {
        //             expect(res).to.have.status([404]);
        //             expect(res.body).to.have.property('status');
        //         done(error);

        //         })
        // });

        // it('It should delete a articles if is not admin', (done) =>{
        //     const id = '5f687da09ea6421941ecfd38'
        //     chai.request(app)
        //         .delete('/api/v1/blogs/id')
        //         .set('Authorization', `Bearer ${damyData.userToken}`)
        //         .end((error, res) => {
        //             expect(res).to.have.status([403]);
        //         done(error);

        //         })
        // });
        // it('It should delete a articles if is not admin', (done) =>{
            
        //     chai.request(app)
        //         .delete('/api/v1/blogs/2')
        //         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
        //         .end((error, res) => {
        //             expect(res).to.have.status([404]);
        //             expect(res.body).to.have.property('message');
        //         done(error);

        //         })
        // });
        // it('It should not update a articles if is not exist', (done) =>{
            
        //     chai.request(app)
        //         .put('/api/v1/blogs/2/edit')
        //         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
        //         .end((error, res) => {
        //             expect(res).to.have.status([400]);

        //         done(error);

        //         })
        // });

})