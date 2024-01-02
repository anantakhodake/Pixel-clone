import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("people");
  const [pageurl, setPageUrl] = useState("");
  // using async await function
  const getPhotos = async (type) => {
    let url = data?.next_page
      ? data?.next_page
      : `https://api.pexels.com/v1/search?query=${query}`;
    if (data?.next_page && type === "next") {
      url = data.next_page;
    }
    if (data.prev_page && type === "back") {
      url = data.prev_page;
    }
    const resp = await axios.get(url, {
      headers: {
        Authorization:
          "YE9jOFZRH0NETubPCA9azwbpfYW4QcODQopTfp1VmHP8ZSB6EoeTXmTS",
      },
    });
    setData(resp.data);
    setPageUrl(resp.data.next_page);
  };
  useEffect(() => {
    getPhotos();
  }, []);
  // this function is used for a keyboard event.
  const onKeyDownHandle = (e) => {
    if (e.keyCode === 13) {
      getPhotos();
    }
  };
  return (
    <div>
      <input
        className="input-search"
        placeholder="Search For Photos"
        onKeyDown={onKeyDownHandle}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div className="container">
        {data?.photos?.map((item, index) => {
          return (
            <div className="box" key={index}>
              <img src={item.src.medium} alt={item.id} />
            </div>
          );
        })}
      </div>
      <div className="btns">
        <button
          className="btn"
          disabled={data?.page == 1}
          onClick={() => getPhotos("back")}
        >
          prev
        </button>
        <button className="btn" onClick={() => getPhotos("next")}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
