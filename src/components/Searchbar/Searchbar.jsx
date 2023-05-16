import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  SearchFormBtn,
  SearchHeader,
  SearchbarForm,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchIcon,
} from './Searchbar.styled';
export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  handleInputChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error(' Your searchquery is empty :( Enter your search query!');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
  };
  render() {
    return (
      <SearchHeader class="searchbar">
        <SearchbarForm class="form" onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit" class="button">
            <SearchIcon />
            <SearchFormButtonLabel class="button-label">
              Search
            </SearchFormButtonLabel>
          </SearchFormBtn>

          <SearchFormInput
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </SearchbarForm>
      </SearchHeader>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
