import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SearchBar from './Searchbar/Searchbar';
import * as API from 'services/pixabay-api';
import { AppComponent } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export default class App extends Component {
  state = {
    isLoading: false,
    page: 1,
    data: [],
    total: 0,
    pages: 0,
    error: '',
    query: '',
    showLargePic: false,
    picData: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const { query: prevQuery, page: prevPage } = prevState;

    if (query !== prevQuery || (page !== prevPage && page !== 1)) {
      API.params.page = query !== prevQuery ? 1 : page;
      API.params.q = query;
      try {
        this.setState({ isLoading: true });
        const data = await API.getData(API.params);
        const { total, hits } = data;

        const properStructHits = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
              id,
              largeImageURL,
              webformatURL,
              tags,
            }))

        if (query !== prevQuery) {
          this.setState({
            data: [...properStructHits],
            page: API.params.page,
            total: total,
            pages: Math.ceil(total / API.params.per_page),
            isLoading: false,
          });
        } else {
          this.setState(p => ({
            data: [
              ...p.data,
              ...properStructHits,
            ],
            page: API.params.page,
            isLoading: false,
          }));
        }
      } catch (error) {
        this.setState({ error: true, isLoading: false });
        console.log(error);
      }
    }
  }

  setQuery = value => {
    this.setState({ query: value });
  };

  toggleLargeMode = picData => {
    this.setState(({ showLargePic }) => ({
      showLargePic: !showLargePic,
      picData,
    }));
  };

  handleLoadMore = () => {
    this.setState(p => ({ page: p.page + 1 }));
  };

  render() {
    const { data, isLoading, page, pages, showLargePic, picData } = this.state;

    return (
      <AppComponent>
        <SearchBar onSubmit={this.setQuery} />
        {data.length > 0 && (
          <ImageGallery data={data} toggleLargeMode={this.toggleLargeMode} />
        )}
        {isLoading && <Loader />}
        {data.length > 0 && page < pages && (
          <Button type="button" onClick={this.handleLoadMore}>
            Load more
          </Button>
        )}
        {showLargePic && (
          <Modal onClose={this.toggleLargeMode}>
            <img alt={picData.alt} src={picData.url} />
          </Modal>
        )}
      </AppComponent>
    );
  }
}
