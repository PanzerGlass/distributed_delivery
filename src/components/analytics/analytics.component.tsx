import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

// services
import AuthService from "../../services/auth.service";

function Analytics() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [auth, setAuth] = useState([]);
  const [bandwidthCDN, setBandwidthCdn] = useState([]);
  const [bandwidthPeertopeer, setBandwidthPeertopeer] = useState([]);
  const [audience, setAudience] = useState([]);

  useEffect(() => {
    AuthService(
      setError,
      setIsLoaded,
      setAuth,
      setBandwidthCdn,
      setBandwidthPeertopeer,
      setAudience
    );
  }, []);

  var date: any = [];
  var data_cdn: any = [],
    max_cdn: number;
  var data_p2p: any = [],
    max_peertopeer: number;
  var data_audience: any = [];
  for (var i = 0; i < bandwidthPeertopeer.length; i++) {
    var time = new Date(bandwidthCDN[i][0]);
    var value_bandwidth = bandwidthCDN[i][1];
    var value_peertopeer = bandwidthPeertopeer[i][1];
    var value_audience = audience[i][1];
    //var t = new Date(bandwidthCDN[i][0];
    date.push(
      //{ date : [time.getFullYear(), time.getMonth() + 1, time.getDate()].join("/"), value_bandwidth : value_bandwidth }
      // [time.getDate(), time.getMonth() + 1].join("/")
      time
    );
    data_cdn.push(Number(value_bandwidth) / 1000000000);
    data_p2p.push(Number(value_peertopeer) / 1000000000);
    data_audience.push(value_audience);
  }

  max_cdn = Math.max.apply(null, data_cdn);
  max_peertopeer = Math.max.apply(null, data_p2p);
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
        // @ts-ignore
        <ReactEcharts
          style={{ height: "500px" }}
          option={{
            tooltip: {
              trigger: "axis",
              axisPointer: {
                animation: true,
              },
              formatter: function (params: any) {
                // @ts-ignore
                var colorSpan = (color) =>
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                  color +
                  '"></span>';
                let rez = "<p>" + params[0].axisValue.slice(0, 25) + "</p>";
                let total = 0;
                //console.log(params); //quite useful for debug
                // @ts-ignore
                params.forEach((item) => {
                  //console.log(item); //quite useful for debug
                  var data = item.data;
                  var xx =
                    "<p>" +
                    colorSpan(item.color) +
                    " " +
                    item.seriesName +
                    ": " +
                    data.toString().slice(0, 5) +
                    " Gbps" +
                    "</p>";
                  rez += xx;
                  total = total + Number(item.data);
                });

                return (
                  rez +
                  "<hr/><p>Total : " +
                  total.toString().slice(0, 5) +
                  " Gbps" +
                  "</p>"
                );
              },
            },
            title: {
              left: "center",
              text: "CAPACITY OFFLOAD",
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
              axisLabel: {
                interval: 24,
                formatter: function (value: any) {
                  var time = new Date(value);
                  return [time.getDate(), time.getMonth() + 1].join("/");
                },
              },
              type: "category",
              boundaryGap: false,

              data: date,
            },
            // @ts-ignore
            yAxis: {
              axisLabel: {
                formatter: function (value: any) {
                  return value + " Gbps";
                },
              },
              type: "value",
              boundaryGap: [0, "20%"],
            },
            dataZoom: [
              {
                type: "inside",
                start: 0,
                end: 1300,
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
                name: "HTTP",
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
                      color: "#C42151",
                    },
                    {
                      offset: 1,
                      color: "#FFE0E9",
                    },
                  ]),
                },
                markLine: {
                  type: "value",
                  data: [
                    {
                      name: "HTTP",
                      xAxis: data_cdn[0],
                      yAxis: max_cdn,
                      lineStyle: {
                        normal: {
                          color: "rgb(255, 70, 131)",
                        },
                      },
                    },
                    {
                      name: "P2P",
                      xAxis: data_p2p[0],
                      yAxis: max_peertopeer,
                      lineStyle: {
                        normal: {
                          color: "#12A5ED",
                        },
                      },
                    },
                  ],
                },
                data: data_cdn,
              },
              {
                name: "P2P",
                type: "line",
                smooth: true,
                symbol: "none",
                sampling: "average",
                itemStyle: {
                  color: "#12A5ED",
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#0A3758",
                    },
                    {
                      offset: 1,
                      color: "#12A5ED",
                    },
                  ]),
                },
                data: data_p2p,
              },
            ],
          }}
        />
        // @ts-ignore
        <ReactEcharts
          style={{ height: "500px" }}
          option={{
            tooltip: {
              trigger: "axis",
              axisPointer: {
                animation: true,
              },
            },
            title: {
              left: "center",
              text: "CONCURRENT VIEWERS",
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
              axisLabel: {
                interval: 24,
                formatter: function (value: any) {
                  var time = new Date(value);
                  return [time.getDate(), time.getMonth() + 1].join("/");
                },
              },
              type: "category",
              boundaryGap: false,

              data: date,
            },
            // @ts-ignore
            yAxis: {
              type: "value",
              boundaryGap: [0, "20%"],
            },
            dataZoom: [
              {
                type: "inside",
                start: 0,
                end: 1300,
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
                name: "Audience",
                type: "line",
                smooth: true,
                symbol: "none",
                sampling: "average",
                itemStyle: {
                  color: "#DDA02A",
                },
                /* areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                 {
                   offset: 0,
                   color: "grey",
                 },
               
               ]),
             }*/
                data: data_audience,
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default Analytics;
