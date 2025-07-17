import React, { useEffect, useState } from "react";
import Card from "../components/Card";
function Home({ theme }) {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [currentpage, setCurrentPage] = useState(1);
  let [search, setSearch] = useState("");
  let [debounce, setDebounce] = useState("");
  let page = 10;
  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch("https://dummyjson.com/products");
      let result = await response.json();
      setData(result.products);
      console.log(result.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  let start = (currentpage - 1) * page;
  let end = start + page;
  let currentData = data.slice(start, end);
  let totalPages = Math.ceil(data.length / page);

  useEffect(() => {
    let id = setTimeout(() => {
      setDebounce(search);
    }, 1000);
    return () => clearTimeout(id);
  }, [search]);

  if (debounce) {
    currentData = currentData.filter((products) =>
      products.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (loading) return <p>Loading ....</p>;
  return (
    <div className="p-10">
      <div>
        <input
          placeholder="search here"
          style={{
            border: theme == "black" ? "2px solid white" : "2px solid black",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-5">
          {currentData.map((data) => (
            <Card key={data.id} c={data} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            style={{
              border: theme == "black" ? "2px solid white" : "2px solid black",
            }}
            disabled={currentpage === 1}
            onClick={() => setCurrentPage(Math.max(currentpage - 1, 1))}
          >
            Previous
          </button>
          <span className="ml-10 mr-10">
            {currentpage} of {totalPages}
          </span>
          <button
            style={{
              border: theme == "black" ? "2px solid white" : "2px solid black",
            }}
            disabled={currentpage === totalPages}
            onClick={() =>
              setCurrentPage(Math.min(currentpage + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
