process.env.NODE_ENV ='test'
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs'
import app from '../../index'
import damyData from './damyData'
import Articles from "../models/article"

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
it("should not create article if is not admin", (done) => {
    chai.request(app)
    .post('/api/v1/newArticle')
    .set('Authorization', `Bearer ${damyData.userToken}`)
    .field('title', 'franklin')
    .attach('articleImage',fs.readFileSync('images/how I get into Andela.jpg'), 'how I get into Andela.jpg')
    .field('description', 'testing files')
    .end((error, res) => {
        expect(res).to.have.status([403]);
        done(error)
    })
})
it("should create article", (done) => {
    chai.request(app)
    .post('/api/v1/newArticle')
    .set('Authorization', `Bearer ${damyData.userAdminToken}`)
    .field('title', 'franklin')
    .attach('articleImage',fs.readFileSync('images/how I get into Andela.jpg'), 'how I get into Andela.jpg')
    .field('description', 'testing files')
    .end((error, res) => {
        expect(res).to.have.status([201]);
        done(error)
    })
})

it('It should get all articles', (done) =>{
            
            chai.request(app)
                .get('/api/v1/blogs')
                .end((error, res) => {
                    expect(res).to.have.status([200]);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal("The blogs fetched");
                    expect(res.body).to.have.property('data');
                done(error);

                })
        });

it('It should get an article if is not exist', (done) =>{
            
            chai.request(app)
                .get('/api/v1/blogs/5f69e164abf8fe1601000198')
                .end((error, res) => {
                    expect(res).to.have.status([404]);
                    expect(res.body).to.have.property('status');
                done(error);

                })
        });
        
    
it('It should get single article ', (done) =>{
            const article = new Articles ({
                    title: 'franklin',
                    articleImage:'images/how I get into Andela.jpg',
                    description: 'testing files'
                        })
                        article.save( (err, art) => {

                    chai.request(app)
                        .get(`/api/v1/blogs/${art.id}`)
                        .set('Authorization', `Bearer ${damyData.userAdminToken}`)
                        .end((error, res) => {
                            expect(res).to.have.status([200]);
                            expect(res.body).to.have.property('status');
                        done(error);

                        })
                })
        });
        

it('It should not delete single article if not found', (done) =>{
            const article = new Articles ({
                    title: 'franklin',
                    articleImage:'images/how I get into Andela.jpg',
                    description: 'testing files'
                        })
                        article.save( (err, art) => {

                   chai.request(app)
                        .delete(`/api/v1/blogs/5f69e164abf8fe1601000000`)
                        .set('Authorization', `Bearer ${damyData.userAdminToken}`)
                        .end((error, res) => {
                            expect(res).to.have.status([404]);
                            expect(res.body).to.have.property('status');
                        done(error);

                        })
                })
        });

    it('It should delete single article ', (done) =>{
            const article = new Articles ({
                    title: 'this is delete',
                    articleImage:'images/how I get into Andela.jpg',
                    description: 'testing files'
                        })
                        article.save( (err, art) => {

                    chai.request(app)
                        .delete(`/api/v1/blogs/${art.id}`)
                        .set('Authorization', `Bearer ${damyData.userAdminToken}`)
                        .end((error, res) => {
                            expect(res).to.have.status([200]);
                            expect(res.body).to.have.property('status');
                        done(error);

                        })
                })
        });

it('It should not update single article if not found ', (done) =>{
            const article = new Articles ({
                    title: 'this is delete',
                    articleImage:'how I get into Andela.jpg',
                    description: 'testing files'
                        })
                    article.save( (err, art) => {

                    chai.request(app)
                        .put(`/api/v1/blogs/5f69e164abf8fe1601000190/edit`)
                        .set('Authorization', `Bearer ${damyData.userAdminToken}`)
                        .end((error, res) => {
                            expect(res).to.have.status([404]);
                            expect(res.body).to.have.property('status');
                        done(error);

                        })
                })
        });
    // it('It should update single article ', (done) =>{
    //         const article = new Articles ({
    //                 title: 'this is update article ',
    //                 articleImage:'how I get into Andela.jpg',
    //                 description: 'testing files'
    //                     })
    //                 article.save( (err, art) => {

    //                 chai.request(app)
    //                     .put(`/api/v1/blogs/${art.id}/edit`)
    //                     .set('Authorization', `Bearer ${damyData.userAdminToken}`)
    //                     .send({
    //                         title: 'this is update article on portfolio ',
    //                         articleImage:'how I get into Andela.jpg',
    //                         description: 'testing files'
    //                             })
    //                     .end((error, res) => {
    //                         console.log(res)
    //                         expect(res).have.status([200]);
    //                         expect(res.body).have.property('message');
    //                     done(error);

    //                     })
    //             })
    //     });

})