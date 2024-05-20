import axios from "axios";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import UserCard from "../commons/UserCard";
import "../styles/searchseries.css";

export default function SearchSeries() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    console.log("soy EEEEEEEE", e);
    console.log("soy TARGET", e.target);
    console.log("soy VALUEEEE", e.target.value);
    setSearch(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/series/search", { search: search })
      .then((res) => res.data)
      .then((search) => setSearchResult(search.results))
      .catch((error) => console.log("error"));
  };
  return (
    <div>
      <Navbar />
      <div className="backgroundseries">
        <from
          class="d-flex"
          role="search"
          onSubmit={handleSearchSubmit}
          className="searchseries"
        >
          <input
            value={search}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </from>
        <div className="container">
          <div className="row">
            {searchResult.map((data, i) => (
              <div className="col-md-4" key={i}>
                <Link to={`serie/${data.id}`}>
                  <UserCard dataUsecard={data} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
