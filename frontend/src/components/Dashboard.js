import React from 'react';
import Chart from "react-apexcharts";
import { graph_data } from './graph_data';

export const Dashboard = () => {
    //const [state, dispatch] = React.useContext(DiscordContext);
    const [renderedGraph, setRenderedGraph] = React.useState(<h1>Rendering</h1>);
    
    let ProspectsGraphInput = {
      series: [{
        name: 'Prospects',
        data: graph_data.prospects
      }],
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Prospects per Month',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val );
            },
          },
          title: {
            text: 'Number of Responses'
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val)
            }
          }
        }
      },    
    };

    let ResponsesGraphInput = {
        series: [{
          name: 'Prospects',
          data: graph_data.responses
        }],
        options: {
          chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
          },
          title: {
            text: 'Prospects per Month',
            align: 'left'
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100]
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return (val );
              },
            },
            title: {
              text: 'Number of Responses'
            },
          },
          xaxis: {
            type: 'datetime',
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return (val)
              }
            }
          }
        },    
      };



    function convert_dates(data_in) {
        for(var i = 0; i < data_in.length; i++) {
            data_in[i].y[0] = new Date(data_in[i].y[0]).getTime()
            data_in[i].y[1] = new Date(data_in[i].y[1]).getTime()
        }
        return data_in
    }

    let ProjectsGraphData = {
          
        series: [
          {
            data: convert_dates(graph_data.projects)
          }
        ],
        options: {
          chart: {
            height: 350,
            type: 'rangeBar'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          xaxis: {
            type: 'datetime'
          }
        },
    };
    React.useEffect(() => {
        async function doAsync (){
          // setRenderedGraph()
          console.log("test_graph useEffect")
        }
        doAsync()
    }, [])

    return (
      <>
        <div id="chart">
            <Chart options={ProspectsGraphInput.options} series={ProspectsGraphInput.series} type="area" height={1000} />
            <Chart options={ResponsesGraphInput.options} series={ResponsesGraphInput.series} type="area" height={1000} />
            <Chart options={ProjectsGraphData.options} series={ProjectsGraphData.series} type="rangeBar" height={1000} />
        </div>
      </>
    )
}