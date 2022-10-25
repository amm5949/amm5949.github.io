import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import h337 from "heatmap.js";
import axios from "axios";
// import Layout from "./assets/layout.jpg";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import imgSrc from './assets/Picture1.jpg'

const baseUrl = "https://www.hibouconnect.com/tapi";
const GET = "GET";

const API_KEY = "d70c04a537f617ef5ac3ff369fdd0f94";
const CODE = "083-083-068-156-105-114";
const sensor1 = "ssd_";
const APP = "hibou5775";
const headers = {
  "api-key": API_KEY,
  code: CODE,
  app: APP,
};
const real_points = [
  { key: 1, x: 268, y: 109, ref: "4352F4" },
  { key: 2, x: 280, y: 270, ref: "42C322" },
  { key: 3, x: 345, y: 352, ref: "4350B8" },
  { key: 4, x: 228, y: 488, ref: "434B9F" },
  { key: 5, x: 411, y: 433, ref: "432F60" },
  { key: 7, x: 410, y: 341, ref: "435C70" },
  { key: 8, x: 224, y: 193, ref: "43344A" },
  { key: 9, x: 225, y: 290, ref: "4336AB" },
  { key: 12, x: 348, y: 541, ref: "432541" },
  { key: 20, x: 323, y: 74, ref: "056EB5" },
  { key: 21, x: 380, y: 118, ref: "056EF9" },
  { key: 22, x: 380, y: 211, ref: "05500B" },
  { key: 23, x: 483, y: 384, ref: "057DC6" },
  { key: 24, x: 605, y: 267, ref: "056EBE" },
  { key: 25, x: 605, y: 224, ref: "0589C3" },
  { key: 26, x: 605, y: 143, ref: "0544AA" },
  { key: 27, x: 452, y: 40, ref: "0565F6" },
  { key: 28, x: 409, y: 254, ref: "058F31" },
  { key: 29, x: 212, y: 648, ref: "056E8B" },
  { key: 50, x: 182, y: 341, ref: "60DC3A" },
  { key: 52, x: 323, y: 391, ref: "60FD8B" },
  { key: 53, x: 148, y: 340, ref: "60C52B" },
  { key: 54, x: 57, y: 300, ref: "36B017" },
];
function formatDate(date) {
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
}
const getSensorTemperatureValue = async (url, headers) => {
  const response = await axios({
    method: GET,
    url: url,
    headers: headers,
  });
  return response;
};
const getSensorPressureValue = async (url, headers) => {
  const response = await axios({
    method: GET,
    url: url,
    headers: headers,
  });
  return response;
};
const getSensorHumidityValue = async (url, headers) => {
  const response = await axios({
    method: GET,
    url: url,
    headers: headers,
  });
  return response;
};
const getSensorLightValue = async (url, headers) => {
  const response = await axios({
    method: GET,
    url: url,
    headers: headers,
  });
  return response;
};
const getSensorVOCValue = async (url, headers) => {
  const response = await axios({
    method: GET,
    url: url,
    headers: headers,
  });
  return response;
};

function App() {
  const [From, setFrom] = useState(new Date());
  const [To, setTo] = useState(new Date());
  const handleToChangeDate = (date) => {
    setTo(date);
  };
  const handleFromChangeDate = (date) => {
    setFrom(date);
  };
  const [selectedValue, setSelectedValue] = useState("");

  let message = "You selected " + selectedValue;
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  let heads = "";
  const [data1, setData1] = useState();
  for (let i = 0; i < real_points.length; i++) {
    let newSensor = sensor1.concat(real_points[i].ref);
    heads += newSensor + ",";
    if (i == real_points.length - 1) {
      heads = heads.slice(0, -1);
    }
  }

  headers["to"] = formatDate(To);
  headers["from"] = formatDate(From);
  headers["sensor"] = heads;

  const getTemperatureData = async () => {
    const url = baseUrl + "/temperature";
    const response = await getSensorTemperatureValue(url, headers);
    if (response) {
      setData1(response.data.slice(1, 200));
      console.log(response.data.slice(1, 200));
    }
  };
  const getPressureData = async () => {
    const url = baseUrl + "/pressure ";
    const response = await getSensorPressureValue(url, headers);
    if (response) {
      setData1(response.data.slice(1, 200));
      console.log(response.data.slice(1, 200));
    }
  };
  const getHumidityData = async () => {
    const url = baseUrl + "/humidity";
    const response = await getSensorHumidityValue(url, headers);
    if (response) {
      setData1(response.data.slice(1, 200));
      console.log(response.data.slice(1, 200));
    }
  };
  const getLightData = async () => {
    const url = baseUrl + "/light";
    const response = await getSensorLightValue(url, headers);
    if (response) {
      setData1(response.data.slice(1, 200));
      console.log(response.data.slice(1, 200));
    }
  };
  const getVOCData = async () => {
    const url = baseUrl + "/voc";
    const response = await getSensorVOCValue(url, headers);
    if (response) {
      setData1(response.data.slice(1, 200));
      console.log(response.data.slice(1, 200));
    }
  };
  const getData = () => {
    switch (selectedValue) {
      case "temperature":
        return getTemperatureData();
      // break;
      case "pressure":
        return getPressureData();
      // break;
      case "light":
        return getLightData();
      // break;
      case "humidity":
        return getHumidityData();
      // break;
      case "VOC":
        return getVOCData();
      // break;
      default:
        console.log("Error is occured");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedValue]);

  useEffect(() => {
    // getAllTemperatureValues(url, heads);
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector(".App"),
    });
    var points = [];
    var max = 0;
    var width = 731;
    var height = 757;
    var len = 23;
    var val = 0.0;
    if (!data1) return;

    // while (len--) {

    // }
    max = Math.max(max, val);
    real_points.map((value, index) => {
      var point = {
        // x: Math.floor(Math.random() * width),
        x: value.x,
        y: value.y,
        // y: Math.floor(Math.random() * height),
        value: parseFloat(data1[index]?.value),
        radius: 70
      };
      // points.pop();
      console.log(point);
      points.push(point);
    })
    
    // heatmap data format
    var data = {
      max: max,
      data: points,
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  }, [data1]);

  return (
    <div className="App">
      <img src={imgSrc}/>
      <div className="datepicker-from">
        <DatePicker selected={From} onChange={handleFromChangeDate} />
        <p>salaam From</p>
      </div>
      <div className="datepicker-to">
        <DatePicker selected={To} onChange={handleToChangeDate} />
        <p>salaam To</p>
      </div>
      <div>
        <select
          value={selectedValue}
          onChange={handleChange}
          className="dropdown"
        >
          <option value="temperature">temperature</option>
          <option value="pressure">pressure</option>
          <option value="light">Light</option>
          <option value="humidity">humidity</option>
          <option value="VOC">VOC</option>
        </select>
        <p className="dropdown">{message}</p>
      </div>
      <div className="project">
        <h1>.</h1>
      </div>
      {/* <div className="App"></div> */}
    </div>
  );
}
export default App;
