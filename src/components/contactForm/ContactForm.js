import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = ({ addContact }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const hendleChangeInput = ({ target: { name, value } }) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const hendleSubmitForm = e => {
    e.preventDefault();
    addContact({ ...state });
    reset();
  };

  const reset = () => {
    setState({ ...INITIAL_STATE });
  };

  const { name, number } = state;

  return (
    <form onSubmit={hendleSubmitForm} className={css.formPhonebook}>
      <label className={css.label} htmlFor="name">
        Name:{' '}
      </label>
      <input
        className={css.input}
        onChange={hendleChangeInput}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        required
      />
      <label className={css.label} htmlFor="number">
        Tel:{' '}
      </label>
      <input
        className={css.input}
        onChange={hendleChangeInput}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
