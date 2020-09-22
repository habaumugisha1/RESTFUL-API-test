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

    // getting all contacts
    static getContacts(req, res){
        Contacts.find().exec().then((contacts) =>{
            return res.status(200).json({status:200, message:"This contacts", data: contacts})
        })
    }
}

export default ContactMessage;