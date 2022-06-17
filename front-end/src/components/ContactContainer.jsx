import React from 'react'
import Contact from "./Contact";

const ContactsContainer = ({contacts}) => {

    const style = {
        contactsGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "10px 0",
        }

    }

    const contactCards = contacts.map((contact,i) => {
        return (<Contact icon={"../assets/images/employee_icon.png"}
                      name={contact}
        />)
    })

  return (
    <div>
        <div style={style.contactsGrid} className='w-full'>
            {contactCards}
        </div>
    </div>
  )
}

export default ContactsContainer