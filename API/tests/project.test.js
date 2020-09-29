process.env.NODE_ENV ='test'
import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import fs from 'fs'
import app from '../../index'
import damyData from './damyData'
import "dotenv/config"
import Projects from '../models/project'

use(chaiHttp)
describe("project tests", () => {
    it('It should not create project if is not admin', async () => {
      const res = await request(app)
      .post('/api/v1/newProject')
      .set('Authorization', `Beare ${damyData.userToken}`)
      .send({title:"this is the project", projectImage:"fhdkyddhgdccxx,c",hostedLink:"hfgwshgfjsahf", description:"jfgjhgrfuqwertwyertgwq"})
      expect(res).to.have.status([403])
    })
    it('It should not create project if is no token provided', async () => {
      const res = await request(app)
      .post('/api/v1/newProject')
      .set('Authorization', `Beare ${damyData.emptyToken}`)
      .send({title:"this is the project", projectImage:"fhdkyddhgdccxx,c",hostedLink:"hfgwshgfjsahf", description:"jfgjhgrfuqwertwyertgwq"})
      expect(res).to.have.status([400])
    })
    it('It should not create project if project already exist', async () => {
      const res = await request(app)
      .post('/api/v1/newProject')
      .set('Authorization', `Beare ${damyData.userAdminToken}`)
      .send({title:"The Free Mentors", projectImage:"fhdkyddhgdccxx,c",hostedLink:"hfgwshgfjsahf", description:"jfgjhgrfuqwertwyertgwq"})
      expect(res).to.have.status([409])
    })

    it('It should create project', async () => {
      const res = await request(app)
      .post('/api/v1/newProject')
      .set('Authorization', `Beare ${damyData.userAdminToken}`)
      .set('Content-Type', 'multipart/form-data')
        .field('title', 'franklins and thers author write onblogs')
        .attach('projectImage',fs.readFileSync('images/how I get into Andela.jpg'), 'how I get into Andela.jpg')
        .field('hostedLink', 'testing nvjjvjhvjfiles')
        .field('description', 'testing files')
      expect(res).to.have.status([201])
      expect(res.body).to.have.property('message')
    })
  it("it should get all  project ", async () => {
       const res = await request(app)
         .get('/api/v1/projects')
        expect(res).have.status([200])
        expect(res.body).have.property("project")
        
    })
     it('it not should DELETE a project given the id if not exist', () => {
          let project = new Projects({title: "The Chronicles of Narnia", description: "C.S. Lewis", hostedLink: "hfgjhgfdbdsfb"})
          project.save( async(err, prject) => {
            const res =  await request(app)
            .delete('/api/v1/projects/5fgtru/delete')
            .set('Authorization', `Beare ${damyData.userAdminToken}`)
                expect(res).to.have.status([404])

          })
     })
     it('it should DELETE a project given the id ', () => {
          let project = new Projects({title: "The Chronicles of Narnia", description: "C.S. Lewis", hostedLink: "hfgjhgfdbdsfb"})
          project.save( async(err, pro) => {
            const res =  await request(app)
            .delete('/api/v1/projects/' + pro.id + '/delete')
            .set('Authorization', `Beare ${damyData.userAdminToken}`)
                expect(res).to.have.status([200])

          })
     })

     it('it should not update a project given the id ', () => {
          let project = new Projects({title: "The Chronicles of Narnia", description: "C.S. Lewis", hostedLink: "hfgjhgfdbdsfb"})
          project.save( async(err, pro) => {
            const res =  await request(app)
            .patch('/api/v1/projects/6y7jf/edit')
            .set('Authorization', `Beare ${damyData.userAdminToken}`)
            .send({title: "The Chronicles of Narnia", description: "C.S. Lewis and come again", hostedLink: "hfgjhgfdbdsfb//jandg"})
                expect(res).to.have.status([404])

          })
     })

     it('it should update a project given the id ', () => {
          let project = new Projects({title: "The Chronicles of Narnia", description: "C.S. Lewis", hostedLink: "hfgjhgfdbdsfb"})
          project.save( async(err, pro) => {
            const res =  await request(app)
            .patch('/api/v1/projects/' + pro.id + '/edit')
            .set('Authorization', `Beare ${damyData.userAdminToken}`)
            .field('title', 'franklins and thers author')
        
            .field('hostedLink', 'testing nvjjvjhvjfiles')
            .field('description', 'testing files')

                expect(res).to.have.status([200])

          })
     })

     it('it should update a project given the id ', () => {
          let project = new Projects({title: "The Chronicles of Narnia", description: "C.S. Lewis", hostedLink: "hfgjhgfdbdsfb"})
          project.save( async(err, pro) => {
            const res =  await request(app)
            .patch('/api/v1/projects/' + pro.id + '/edit')
            .set('Authorization', `Beare ${damyData.userAdminToken}`)
            .attach('projectImage',fs.readFileSync('images/how I get into Andela.jpg'), 'how I get into Andela.jpg')

                expect(res).to.have.status([200])
                expect(res.body).have.property("message")

          })
     })
     
})