import chai from 'chai'
import chaiHttp from 'chai-http'
import fs from 'fs';
import mongoose from 'mongoose'
import Articles from '../models/article'
import server from '../../index'
import damyData from './damyData'

chai.use(chaiHttp)
const should = chai.should()

describe('Article', () => {

    // testing create article
    describe('/api/v1/newArticle', ()=>{

         it('It should not create article if is not admin', (done) =>{
            
            chai.request(server)
                .post('/api/v1/newArticle')
                .set('Authorization', `Bearer ${damyData.userToken}`)
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'franklin')
                .attach('articleImage',fs.readFileSync('images/how I get into Andela.jpg'), 'how I get into Andela.jpg')
                .field('description', 'testing files')
                .end((err, res) => {
                    console.log(err)
                    res.should.have.status(403);
                

                })
                done();
        });
        it('It should not create article if is no token', (done) =>{
            
            chai.request(server)
                .post('/api/v1/newArticle')
                .set('Authorization', `Bearer ${damyData.emptyToken}`)
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'franklin')
                .attach('articleImage',
        fs.readFileSync('images/how I get into Andela.jpg'), 'how I get into Andela.jpg')
                .field('description', 'testing files')
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });

         it('It should not create article if there is erro r to upload image', (done) =>{
            
            chai.request(server)
                .post('/api/v1/newArticle')
                .set('Authorization', `Bearer ${damyData.emptyToken}`)
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'franklin')
                .attach('articleImage',
        fs.readFileSync('images/how I get into Andela.jpg'))
                .field('description', 'testing files')
                .end((err, res) => {
                    res.should.have.status(400);
                done();

                })
        });

        it('It should not create article without title', (done) =>{
            
            chai.request(server)
                .post('/api/v1/newArticle')
                .set('Authorization', `Bearer ${damyData.userAdminToken}`)
                .set('Content-Type', 'multipart/form-data')
                .attach('articleImage', fs.readFileSync('images/how I get into Andela.jpg'), 'how I get into Andela.jpg')
                .field('description', 'testing files')
                .end((err, res) => {
                    console.log(err)
                    res.should.have.status(400);
                
            })
            done();
        });
        
        // it('It should create article', (done) =>{
            
        //     chai.request(server)
        //         .post('/api/v1/newArticle')
        //         .set('Authorization', `Bearer ${damyData.userAdminToken}`)
        //         .set('Content-Type', 'multipart/form-data')
        //         .field('title', 'franklin')
        //         .attach('articleImage', fs.readFileSync('images/test_image.jpeg'))
        //         .field('description', 'testing files')
        //         .end((err, res) => {
        //             res.should.have.status(201);
        //             res.body.should.be.a('object');
        //             res.body.should.have.property('data');
        //         done();
        //         })
            
        // });
          it('it should get all article', (done)=>{
             chai.request(server)
                .get('/api/v1/blogs')
                .end((err, res) => {
                    console.log(err)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                
                });
                done();
        });
        it('it should get a single article by given id', (done)=>{
           const articles = new Articles({title:"mongoDb", articleImage:"gcdhgdshdfbsfbdkjfgsdfgbdkgs", description:"sdfsvfjaserguwergFBSDFSDFBSDHFGSJDF"})
           articles.save((err, article) =>{
               chai.request(server)
               .get('/api/v1/blogs/' + article.id)
               .send(article)
               .end((err, res) =>{  
                 res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('results');
               
               })
                
           })
           done();
        })

        it('it should not get a single article when there isn\'t', (done)=>{
           const articles = new Articles({})
           Articles.findById( 2, (err, article) =>{
               chai.request(server)
               .get('/api/v1/blogs/' + 2)
               .send(articles)
               .end((err, res) =>{  
                 res.should.have.status(404);
                
               });
            done();
           })
        })

        it('it should not update a single article with a given ID if no token provided', (done)=>{
            const articles = new Articles({title:"mongoDb", articleImage:"gcdhgdshdfbsfbdkjfgsdfgbdkgs", description:"sdfsvfjaserguwergFBSDFSDFBSDHFGSJDF"})
           Articles.findById( articles.id, (err, article) =>{
               chai.request(server)
               .put('/api/v1/blogs/' + articles.id + '/edit')
               .send(articles)
               .end((err, res) =>{  
                 res.should.have.status(401);
                
               });
            
           });
           done();
        })

         it('it should not update a single article with a given ID if no blog of provided id', (done)=>{
            const articles = new Articles({title:"mongoDb", articleImage:"gcdhgdshdfbsfbdkjfgsdfgbdkgs", description:"sdfsvfjaserguwergFBSDFSDFBSDHFGSJDF"})
           Articles.findById( articles.id, (err, article) =>{
               chai.request(server)
               .put('/api/v1/blogs/' + articles.id + '/edit')
               .set('Authorization', `Bearer ${damyData.userAdminToken}`)
               .send(articles)
               .end((err, res) =>{  
                 res.should.have.status(404);
                
               })
               
           });
           done();
        })

        it('it should not update a single article with a given ID if no blog of provided id', (done)=>{
            const id = '5f687da09ea6421941ecfd38'
           Articles.findById( id, (err, article) =>{
               chai.request(server)
               .put('/api/v1/blogs/' + id + '/edit')
               .set('Authorization', `Bearer ${damyData.userAdminToken}`)
               .attach('articleImage', fs.readFileSync('images/test_image.jpeg'))
               .end((err, res) =>{  
                 res.should.have.status(404);
                
               })
               
           });
           done()
        })

        it('it should delete a single article with a given ID', (done)=>{
            const arti = new Articles({title:"hjgjhfgfjfj", articleImage:"kjhsfhsdfhkdfhsdkf",description:"jhrgjasgdfjasgfa"})
           arti.save((err, art) =>{
               chai.request(server)
               .delete('/api/v1/blogs/' + art.id)
               .set('Authorization', `Bearer ${damyData.userAdminToken}`)
               .end((err, res) =>{  
                 res.should.have.status(200);
                
               })
               
           });
           done();
        })

        it('it should not delete a single article with a given ID', (done)=>{
            const id = '5f687da09ea6421941ecfd3'
           Articles.findById( id, (err, article) =>{
               chai.request(server)
               .delete('/api/v1/blogs/' + id)
               .set('Authorization', `Bearer ${damyData.userAdminToken}`)
               .end((err, res) =>{  
                 res.should.have.status(404);
                
               })
               
           });
           done()
        })
        
    });
})