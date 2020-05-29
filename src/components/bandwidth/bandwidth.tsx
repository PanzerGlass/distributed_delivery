import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

// services
import AuthService from "../../services/auth-service";

function Bandwidth() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [auth, setAuth] = useState([]);
  const [bandwidth, setBandwidth] = useState([]);

  useEffect(() => {
    AuthService(
      setError,
      setIsLoaded,
      setAuth,
      setBandwidth
    );

    
  }, []);

  var date = [];

  var data: any = [];
  for (var i = 0; i < bandwidth.length; i++) {
    var time = new Date(bandwidth[i][0]);
    var level = bandwidth[i][1];
    date.push(
      //{ date : [time.getFullYear(), time.getMonth() + 1, time.getDate()].join("/"), level : level }
      [time.getDate(), time.getMonth() + 1].join("/")
    );
    data.push(level);
  }

 /* date.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return Number(new Date(a.date)) - Number(new Date(b.date));
  });
  function foo(arr:any) {
    var a = [],
      b = [],
      c:any = [],
      prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].date !== prev) {
        a.push(arr[i].date);
        b.push(1);
        c.push(arr[i].level)
      } else {
        b[b.length - 1]++;
        c[c.length -1] = Number(c[c.length -1]) + Number(arr[i].level)
      }
      prev = arr[i].date;
    }

    return [a, b ,c ]; 
  }

console.log('check foo '+foo(date))
*/

  if (error) {
    // @ts-ignore
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <div>
        <ul>
          <li>{auth}</li>
          <li>{bandwidth}</li>
        </ul>
        <ReactEcharts
          option={{
            tooltip: {
              trigger: "axis",
              position: function (pt: any) {
                return [pt[0], "10%"];
              },
            },
            title: {
              left: "center",
              text: "大数据量面积图",
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: "none",
                },
                restore: {},
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              axisLabel:{
                interval:24
             },
              data: date,
            },
            yAxis: {
              type: "value",
              boundaryGap: [0, "100%"],
            },
            dataZoom: [
              {
                type: "inside",
                start: 0,
                end: 10,
              },
              {
                start: 0,
                end: 10,
                handleIcon:
                  "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                handleSize: "80%",
                handleStyle: {
                  color: "#fff",
                  shadowBlur: 3,
                  shadowColor: "rgba(0, 0, 0, 0.6)",
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                },
              },
            ],
            // @ts-ignore
            series: [
              {
                name: "模拟数据",
                type: "line",
                smooth: true,
                symbol: "none",
                sampling: "average",
                itemStyle: {
                  color: "rgb(255, 70, 131)",
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgb(255, 158, 68)",
                    },
                    {
                      offset: 1,
                      color: "rgb(255, 70, 131)",
                    },
                  ]),
                },
                data: data,
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default Bandwidth;
