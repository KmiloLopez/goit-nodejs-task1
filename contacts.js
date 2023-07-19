

const fs = require('fs').promises;

 const contactsPath = './db/contacts.json';



function listContacts() {
    
    return fs.readFile(contactsPath).then((data)=> {
        return JSON.parse(data.toString());
    });
  }
  
  function getContactById(contactId) {
    return listContacts().then((list) => {
        
        const contactFound= list.find((contact) => contact.id == contactId);
        
        return contactFound;
    })
  }
  
  function removeContact(contactId) {
    return listContacts().then((list) => {
        const filteredList = list.filter((contact) => contact.id != contactId);
        return fs.writeFile(contactsPath, JSON.stringify(filteredList), (err)=> {
            if (err) {
                console.log("errory", err);
            }
            })
            .then(()=> `Contact with id ${contactId} removed`)
    })
  }
  
  function addContact(name, email, phone) {
    return listContacts().then((list)=>{
       const identificator= list.length + 1
      
        const newContact = {id: identificator, name:name, email:email, phone:phone}
        
        list.push(newContact)
        const listNumber = list.length;
        return fs.writeFile(contactsPath, JSON.stringify(list), (err)=> {
            if (err) {
                console.log("errory", err);
            }
            })
            
            .then(()=> `new contact successfully added, id automatically generated: ${list[listNumber-1].id}`)
    })
  }

  module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact
  }