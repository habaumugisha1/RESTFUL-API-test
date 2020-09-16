import Contacts from '../models/contact';

class ContactMessage {
    static createContact(req, res){
        // date of mesage
        const created_at = new Date()

        const contact = new Contacts({
            name: req.body.name,
             email:req.body.email, 
             content:req.body.content, 
             created_at
        })
         contact.save().then( () =>{
             return res.status(201).json({
                 status:201,
                 message:"contact sent successful",
                 data: contact
             })

         }).catch((err) => {
                return res.status(500).json({error: err.message})
            })
        
    }
}

export default ContactMessage;