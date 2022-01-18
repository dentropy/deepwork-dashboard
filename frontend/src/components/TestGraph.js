import React from 'react';
import Chart from "react-apexcharts";

export const TestGraph = () => {
    //const [state, dispatch] = React.useContext(DiscordContext);
    const [renderedGraph, setRenderedGraph] = React.useState(<h1>Rendering</h1>);
    
    let graphData = {
          
      series: [{
        name: 'XYZ MOTORS',
        data: [
          { x: new Date("2021-03-01T00:00:00.000Z"), y: 3 },
          { x: new Date("2021-03-28T23:00:00.000Z"), y: 2 },
          { x: new Date("2021-04-28T23:00:00.000Z"), y: 1 }
        ]
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
            <Chart options={graphData.options} series={graphData.series} type="area" height={1000} />
        </div>
        <h1>TEST</h1>
      </>
    )
}