import axios from "axios";
import { useEffect, useState } from "react";

import RechartsExample from "./RechartsExample";

const options = {
  grid: { top: 8, right: 8, bottom: 24, left: 36 },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
  tooltip: {
    trigger: "axis",
  },
};

const SEARCH_ENDPOINT = "https://api.github.com/search/repositories?q=react";

const getReactRepositories = () =>
  axios
    .get(SEARCH_ENDPOINT)
    .then((result) => result.data.items)
    .then((repos) =>
      repos.map(({ forks, name, stargazers_count, html_url }) => ({
        forks,
        name,
        stars: stargazers_count,
        url: html_url,
      }))
    );

function App({ text }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getReactRepositories().then((repositories) => setData(repositories));
  }, []);

  console.log("data", data);
  return (
    <div className="App">
      {text}
      <RechartsExample options={options} />
    </div>
  );
}

export default App;
