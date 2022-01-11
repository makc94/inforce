// Головний компонент

import { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";
import { getPageCount, getPagesArray } from "../utils/pages";
import InputUser from "./InputUser";

function App() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [words, setWords] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    filterPosts();
  }, [words]);

  const getWords = (info) => {
    setWords(info);
  };

  const filterPosts = () => {
    if (words.length === 0) {
      return data;
    }
    return data.filter((post) => post.title.includes(words));
  };

  async function fetchPosts() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );
    setData(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  }

  const changePage = (page) => {
    setPage(page);
  };

  let pagesArray = getPagesArray(totalPages);

  return (
    <div>
      <InputUser getWords={getWords} />
      <List data={filterPosts()} />
      <div className="footer">
        {pagesArray.map((p) => {
          return (
            <div
              className={page === p ? "page-cur" : "nav"}
              key={p}
              onClick={() => changePage(p)}
            >
              {p}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
