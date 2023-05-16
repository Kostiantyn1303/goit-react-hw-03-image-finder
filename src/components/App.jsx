import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../Api/PixabeyApi';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { AppBox } from './App.styled';

import ImageGallery from './ImageGallery/ImageGallery';
export class App extends Component {
  state = {
    query: '',
    pictures: [],
    page: 1,
    error: null,
    isLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.uploadImages();
    }
  }
  async uploadImages() {
    this.setState({ isLoading: true });

    try {
      const responseApi = await fetchImages(this.state.query, this.state.page);

      if (!responseApi.totalHits) {
        toast.error(
          ` Sorry!!! Nothing was found for query: "${this.state.query}"`
        );
        throw new Error('No data :-(');
      }

      const selectedProperties = responseApi.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        }
      );

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...selectedProperties],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }
  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };
  handleFormSubmit = searchQuery => {
    if (this.state.query !== searchQuery) {
      this.setState({ query: searchQuery, pictures: [], page: 1 });
    }
  };
  render() {
    const { query, pictures, page, isLoading } = this.state;
    const isShowGallery = pictures.length > 0 && query;
    const isShowButton = isShowGallery && !isLoading && !(pictures.length % 12);

    return (
      <AppBox>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={2500} />
        {isShowGallery && <ImageGallery pictures={pictures} page={page} />}
        {isShowButton && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </AppBox>
    );
  }
}
