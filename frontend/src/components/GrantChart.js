import React from 'react';
import Chart from "react-apexcharts";

export const GrantChart = () => {
    //const [state, dispatch] = React.useContext(DiscordContext);
    const [renderedGraph, setRenderedGraph] = React.useState(<h1>Rendering</h1>);
    
    function convert_dates(data_in) {
        for(var i = 0; i < data_in.length; i++) {
            data_in[i].y[0] = new Date(data_in[i].y[0]).getTime()
            data_in[i].y[1] = new Date(data_in[i].y[1]).getTime()
        }
        return data_in
    }

    let imported_data = [
        { x: 'TEST001', y: [ '2021-05-03', '2021-05-21' ] },
        { x: 'TEST002', y: [ '2021-05-03', '2022-02-18' ] },
        { x: 'TEST003', y: [ '2021-05-19', '2021-06-04' ] }
    ]

    let graphData = {
          
        series: [
          {
            data: convert_dates(imported_data)
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
            <Chart options={graphData.options} series={graphData.series} type="rangeBar" height={1000} />
        </div>
        <h1>TEST</h1>
      </>
    )
}