import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = contact => {
    const { contacts } = this.state;
    const { name, number } = contact;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existsContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existsContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    const filterValue = e.target.value;
    this.setState({ filter: filterValue });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={style['phone-book']}>
        <h1 className={style.name}>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2 className={style.name}>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />

        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
