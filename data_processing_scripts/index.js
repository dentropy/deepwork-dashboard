import fs from 'fs';
import neatCsv from 'neat-csv'

function group_dates_by_month_for_graph(date_list){
    // We are doing Users a Month

    // First Sort
    // console.log(date_list.length)
    
    // Loop through the first and last dates
    let month_range_list = [];
    let month_pos_lookup = {}
    let month_pos = 0;
    console.log("DATE_ME")
    console.log(date_list[0].toISOString().substr(0,7) + "-01")
    // console.log(date_list[date_list.length - 1])
    console.log("DATE_ME")
    console.log(date_list[0])
    let final_date = (new Date(date_list[date_list.length - 1 ].setMonth(date_list[date_list.length - 1 ].getMonth() + 2)))
    for (var d = new Date(date_list[0].toISOString().substr(0,7) + "-01"); d <= final_date; new Date(d.setMonth(d.getMonth() + 1)) ) {
        try {
            month_range_list.push(
                {
                    x : new Date(d),
                    y : 0
                }
            );
            console.log(  new Date(d)  )
            console.log( (( new Date(d) ).toISOString()).substr(0, 7) )
            month_pos_lookup[  (( new Date(d) ).toISOString()).substr(0, 7)  ] = month_pos
            console.log(month_pos)
            month_pos++
        } catch {
            console.log("Error")
        }
    } 
    console.log(month_pos_lookup)
    date_list.forEach(date => {
        let tmp_key = (( new Date(date) ).toISOString()).substr(0, 7)
        console.log("TEST")
        console.log(tmp_key)
        let lookup_key = month_pos_lookup[tmp_key]
        // console.log(tmp_key)
        // console.log(lookup_key)
        // console.log(month_pos_lookup)
        month_range_list[lookup_key].y++

    })
    // console.log(month_range_list)
    // We circle through the dates appening to a sum for every date
    return month_range_list
}

async function process_response_csv(csv_location){
    let data = await fs.readFileSync(csv_location)
    let mah_data = await neatCsv(data)
    //   console.log(Object.keys(mah_data))
    //   console.log(mah_data)
    let raw_dates = []
    mah_data.forEach((row  => {
        // console.log(row['Submit Date (UTC)'].split(" ")[0])
        raw_dates.push( row['Submit Date (UTC)'] ) 
    }))
    raw_dates.sort()
    // console.log(raw_dates)
    let list_dates = []
    raw_dates.forEach((date  => {
        list_dates.push( new Date(date)) 
    }))
    // console.log(list_dates)
    return group_dates_by_month_for_graph(list_dates)
}

async function process_projects_csv(csv_location){
    let data = await fs.readFileSync(csv_location)
    let mah_data = await neatCsv(data)
    // console.log(Object.keys(mah_data[0]))
    // console.log(mah_data[0].StartDate)
    // console.log(mah_data[0].EndDate)
    let graph_data = []
    mah_data.forEach(row => {
        if (row.EndDate == "") {
            const tmp_date = new Date()
            tmp_date.setMonth(tmp_date.getMonth() + 1)
            row.EndDate = tmp_date.toISOString().substr(0, 10) // (new Date()).toISOString()
            
        }
        graph_data.push({
            x : row["Project ID"],
            y : [
                row.StartDate , 
                row.EndDate 
                // `new Date(${row.StartDate}).getTime()` , 
                // `new Date(${row.EndDate}).getTime()`
            
            ]
        })
    })
    return graph_data
}

async function process_prospects_csv(csv_location){
    let data = await fs.readFileSync(csv_location)
    let mah_data = await neatCsv(data)
    // console.log(Object.keys(mah_data))
    // console.log(mah_data)


    let raw_dates = []
    mah_data.forEach((row  => {
        // console.log(row['Submit Date (UTC)'].split(" ")[0])
        raw_dates.push( row['Date'] ) 
    }))
    raw_dates.sort()
    // // console.log(raw_dates)
    let list_dates = []
    raw_dates.forEach((date  => {
        list_dates.push( new Date(date)) 
    }))
    // console.log(list_dates)
    // // console.log(list_dates)
    return group_dates_by_month_for_graph(list_dates)
}


async function doAsync(){
    let response_csv = await process_response_csv('../csvs/responses.csv')
    // console.log(response_csv)
    let projects_csv = await process_projects_csv('../csvs/Projects - Sheet1.csv')
    //console.log(projects_csv)
    let prospects_csv = await process_prospects_csv('../csvs/Prospects - Sheet1.csv')
    console.log(prospects_csv)
}

doAsync()