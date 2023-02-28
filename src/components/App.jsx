import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { ContactFilter } from './contactFilter/ContactFIlter';

import css from './app.module.css';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const dubleNumber = contacts.find(
      ({ name }) => name === data.name.toLowerCase()
    );
    const newContact = { ...data, id: nanoid(10) };
    if (dubleNumber) {
      return alert(`${data.name} is already in contacts`);
    }
    setContacts(prevComtacts => [...prevComtacts, newContact]) 
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => id !== item.id));
  };

  const onFilter = e => {
    setFilter(e.target.value)
  };

  const filterSearh = () => {
    if (!filter) {
      return contacts;
    }
    const newContact = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.includes(filter)
    );
    return newContact;
  };

  const arrFindContact = filterSearh()

  return (
    <section className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <ContactFilter onFilter={onFilter} value={filter} />
      {contacts.length !== 0 && (
        <ContactList list={arrFindContact} onRemove={deleteContact} />
      )}
    </section>
  );
};

