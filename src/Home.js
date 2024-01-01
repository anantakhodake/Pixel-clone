import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("people");
  const [pageurl,setPageUrl]=  useState("")
// using async await function 
  const getPhotos = async () => {
    const resp = await axios.get(
      `https://api.pexels.com/v1/search?query=${query === ""?"people":query}`,
      {
        headers: {
          Authorization:
            "YE9jOFZRH0NETubPCA9azwbpfYW4QcODQopTfp1VmHP8ZSB6EoeTXmTS",
        },
      }
    );
    setData(resp.data);
    setPageUrl(resp.next_page)
  };
  useEffect(() => {
    getPhotos();
  },[]);
  // this function is used for a keyboard event.
   const onKeyDownHandle = (e)=>{
    if(e.keyCode===13){
        getPhotos();
    }
  }
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
      <div>
        <button onClick={getPhotos}>Next</button>
        <button onClick={getPhotos}>back</button>
      </div>
    </div>
  );
}

export default Home;
