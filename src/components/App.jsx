import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SearchBar from './Searchbar/Searchbar';
import * as API from 'services/pixabay-api';
import { AppComponent } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export default function App() {
 
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [showLargePic, setShowLargePic] = useState(false);
  const [picData, setPicData] = useState({});

  useEffect(() => {
    fetchData();
  }, [query, page]);

  const fetchData = async () => {
    if (!query) return;

    setIsLoading(true);
    API.params.page = page;
    API.params.q = query;
    try {
      const data = await API.getData(API.params);
      const { total, hits } = data;
      console.log(data);
      const properStructHits = hits.map(
        ({ id, largeImageURL, webformatURL, tags }) => ({
          id,
          largeImageURL,
          webformatURL,
          tags,
        })
      );
      setData(state => [...state, ...properStructHits]);
      setPage(API.params.page);
      setPages(Math.ceil(total / API.params.per_page));
    } catch (e) {
      setError(true);
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleQuery = value => {
    setPage(1);
    setData([]);
    setQuery(value);
  };

  const toggleLargeMode = picData => {
    setShowLargePic(state => !state);
    setPicData(picData);
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <AppComponent>
      <SearchBar handleQuery={handleQuery} />
      {data.length > 0 && (
        <ImageGallery data={data} toggleLargeMode={toggleLargeMode} />
      )}
      {isLoading && <Loader />}
      {error && <p>Sorry, something went wrong</p>}

      {data.length > 0 && page < pages && (
        <Button type="button" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
      {showLargePic && (
        <Modal onClose={toggleLargeMode}>
          <img alt={picData.alt} src={picData.url} />
        </Modal>
      )}
    </AppComponent>
  );
}
