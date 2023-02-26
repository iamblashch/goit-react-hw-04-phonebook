import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { ContactFilter } from './contactFilter/ContactFIlter';

import css from './app.module.css';

export class App extends Component {
  state = {
    contact: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount(){
    const contact = localStorage.getItem("contact");
    const parsedContact = JSON.parse(contact);
    if(parsedContact){
      this.setState({ contact: parsedContact })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.contact !== prevState.contact){
      localStorage.setItem("contact", JSON.stringify(this.state.contact))
    }
  }


  addContact = data => {
    const dubleNumber = this.state.contact.find(
      ({ name }) => name === data.name.toLowerCase()
    );
    const newContact = { ...data, id: nanoid(10) };
    if (dubleNumber) {
      return alert(`${data.name} is already in contacts`);
    }
    this.setState(prevState => {
      return {
        contact: [...prevState.contact, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      const newContact = prevState.contact.filter(item => id !== item.id);
      return { contact: newContact };
    });
  };

  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  filterSearh = () => {
    const { contact, filter } = this.state;
    if (!filter) {
      return contact;
    }
    const newContact = contact.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.includes(filter)
    );
    return newContact;
  };

  render() {
    const arrFindContact = this.filterSearh();
    return (
      <section className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <ContactFilter onFilter={this.onFilter} value={this.state.filter} />
        {this.state.contact.length !== 0 && (
          <ContactList list={arrFindContact} onRemove={this.deleteContact} />
        )}
      </section>
    );
  }
}
