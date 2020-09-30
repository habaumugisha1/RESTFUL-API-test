process.env.NODE_ENV ='test'
import {use, request, expect} from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index'
import damyData from './damyData'

use(chaiHttp)

describe('the profile test', () => {
    it('It should get user profile', async () =>{
        const res = await request(app)
        .get('/api/v1/profile')
        .set('Authorization', `Bearer ${damyData.userAdminToken}`)

      expect(res).have.status([200])
        expect(res.body).have.property("message")
    })

    it('It should not get user profile if no token provided', async () =>{
        const res = await request(app)
        .get('/api/v1/profile')

      expect(res).have.status([401])
        expect(res.body).have.property("message")
    })

    it('It should not get user profile if user is not admin', async () =>{
        const res = await request(app)
        .get('/api/v1/profile')
        .set('Authorization', `Bearer ${damyData.userToken}`)

      expect(res).have.status([403])
        expect(res.body).have.property("message")
    })

    it('It should not get user profile if token is empty', async () =>{
        const res = await request(app)
        .get('/api/v1/profile')
        .set('Authorization', `Bearer ${damyData.emptyToken}`)

      expect(res).have.status([400])
        expect(res.body).have.property("error")
    })
})