import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!searchQuery) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/products/search?query=${searchQuery}`);
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className="container mt-4">
      <h2>Search Results for: "{searchQuery}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="row">
          {searchResults.map((product) => (
            <div className="col-md-4 mb-3" key={product._id}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Search;
