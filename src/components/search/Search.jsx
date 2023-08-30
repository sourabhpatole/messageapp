import React from "react";
import "./search.css";
import searchImg from './images/search-icon.png'

const Search = ({value, onChange}) => {
  return (
    <div className="search-emp-div">
      <div className="search-div">
        <img src={searchImg} alt="Search" className="search-img" />
        <input type="search" className="search-emp" placeholder="Search" value={value} onChange={onChange}/>
      </div>
    </div>
  );
};

export default Search;
