import React from 'react';
import Chart from "react-apexcharts";
import { graph_data } from './graph_data';
import Grid from '@mui/material/Grid';


export const Dashboard = () => {
    //const [state, dispatch] = React.useContext(DiscordContext);
    const [renderedGraph, setRenderedGraph] = React.useState(<h1>Rendering</h1>);
    
    let ProspectsGraphInput = {
      series: [
        {
          name: 'Prospects',
          data: graph_data.prospects
        },
        {
          name: 'Responses',
          data: graph_data.responses
        }
      ],
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
          text: 'Prospects and Responses per Month',
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
          },
          title: {
            text: 'Current Projects'
          }
        },
    };
    let new_dates = []
    for (var i = 0; i < ProjectsGraphData.series[0].data.length; i++) {

      if (ProjectsGraphData.series[0].data[i].y[1] > Date.now()) {
        // delete ProjectsGraphData.series[0].data[i].y[1]
        new_dates.push(ProjectsGraphData.series[0].data[i])
      }
    }
    ProjectsGraphData.series[0].data = new_dates

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
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
           <Chart options={ProspectsGraphInput.options} series={ProspectsGraphInput.series} type="area" height={window.innerHeight - 75} />
          </Grid>
          <Grid item xs={6} md={6}>
            <Chart options={ProjectsGraphData.options} series={ProjectsGraphData.series} type="rangeBar" height={window.innerHeight - 75} />
          </Grid>
        </Grid>
        </div>
      </>
    )
}