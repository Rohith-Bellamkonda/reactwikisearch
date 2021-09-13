import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [searchbar, setSearchbar] = useState('');
  const [query, setQuery] = useState('Wikipedia');

  useEffect(async () => {
    getWiki();
  }, [query]);

  const getWiki = async () => {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${query}&format=json`
    );
    const data = await response.json();
    console.log(data);
    setResults(data.query.search);
  };
  const UpdateSearch = e => {
    setSearchbar(e.target.value);
    console.log(searchbar);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(searchbar);
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <h1 className="topHeader">WIKI SEARCH MADE EASY</h1>

        <input
          className="search-bar"
          type="text"
          value={searchbar}
          onChange={UpdateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {results.map((index, i) => {
        const url = `https://en.wikipedia.org/?curid=${index.pageid}`;

        return (
          <div className="Hello" key={i}>
            <h1 className="title">{index.title}</h1>
            <h2
              className="text23"
              dangerouslySetInnerHTML={{ __html: index.snippet }}
            />
            <a href={url} target="_blank" rel="nofollow">
              <span />
              <span />
              <span />
              <span />
              Read more
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default App;
