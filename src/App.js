import React, { useEffect, useState } from 'react';
import Park from './components/park/Park';
import './App.css';
import Panel from './components/panel/ExpansionPanel';
import Header from './components/header/Header'

function App() {

  const API_KEY = 'Osq7v44aBTCLZLAAifD9ybktEZlcIdX0Dw7EfqJg';
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('NULL');
  const data = require('../src/parks');

  useEffect(() => {
    getData();
  }, [query])


  const getData = async () => {
    var array = [];
    {
      data.data.map(curr => (
        curr.fullName.toUpperCase().includes(query.toUpperCase()) ? array.push(curr) : array = array
      ))
    }
    setParks(array);
  }

  const updateSearch = e => {
    const toSet = e.target.value;
    setSearch(toSet);
    
  }

  const getSearch = e => {
    e.preventDefault();
    if (search.length < 3) {
      if (search.length === 0){
        window.alert("Please enter a valid search.");
      }
      else{
        window.alert("Your search must be at least 3 characters.");
      }
      setSearch("");
    }
    else {
      setQuery(search);
      setParks([]);
    }

  }

  return (

    <div className="App">

      <Header />
      <br /><br /><br /><br /><br />
      <h1 className="titleText">Welcome to the National Park Service Kiosk </h1>

      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Enter a park name (3+ characters)" value={search} onChange={updateSearch} />
       <button className="search-button" type="submit">Search</button>
      </form>

      <div className="parks">

        {parks.map(park => (
          <Park
            title={park.fullName}
            parkCode={park.parkCode}
            desc={park.description}
            states={park.states}
            images={park.images}
            latLong={park.latLong}
          />

        ))}
      </div>
    </div>
  );
}

export default App;
