import React from 'react';
import PropTypes from 'prop-types'
import css from './ContactFilter.module.css'

export const ContactFilter = ({onFilter, value}) => {
  return (
    <section className={css.app}>
      <label className={css.label} htmlFor="">Find contacts by name</label>
      <input onChange={onFilter} className={css.input} value={value} type="text" />
    </section>
  );
};

ContactFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
