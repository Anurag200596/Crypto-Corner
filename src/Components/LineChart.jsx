import react, { useEffect, useState } from "react"
import Chart from "react-google-charts"

const LineCharts = ({chartData})=>{
    const [data,setdata] = useState([["Date","Prices"]])
    useEffect(()=>{
        let dataCopy = [["Date","Prices"]]
        if(chartData.prices){
            chartData.prices.map((elem)=>{
                dataCopy.push([`${new Date(elem[0]).toLocaleDateString().slice(0,-5)}`,elem[1]])
            })
            setdata(dataCopy)
        }

    },[chartData])
    return(
        <div>
            <Chart
            chartType="LineChart"
            height="100%"
            data={data}
            legendToggle
            />


        </div>
    )
}

export default LineCharts