import { Component } from 'react';
import { SearchBarComponent, FormStyled, ButtonSearch, FieldStyled } from './Searchbar.styled';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  render() {
    return (
      <SearchBarComponent>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={(values, actions) => {
            this.props.onSubmit(values.search);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <FormStyled>
              {isSubmitting && <div>Loading...</div>}
              <ButtonSearch type="submit" className="button" disabled={isSubmitting}>
                <span className="button-label"></span>
              </ButtonSearch>

              <FieldStyled
                name="search"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </FormStyled>
          )}
        </Formik>
      </SearchBarComponent>
    );
  }
}


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}