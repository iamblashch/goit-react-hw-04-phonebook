import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ list = [], onRemove }) => {
  const userContact = list.map(item => (
    <li className={css.list_item} key={item.id}>
      <p>{item.name}: {item.number} </p>
      <button
        onClick={() => onRemove(item.id)}
        type="button"
        className={css.delButton}
      >
        delete
      </button>
    </li>
  ));
  return <ul className={css.list}>{userContact}</ul>;
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  remuve: PropTypes.func,
};
