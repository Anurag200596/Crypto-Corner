import react, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CoinContext } from "../Context/CoinContext"
import gold from "../assets/Gold-coin-Bitcoin-unscreen.gif"
import LineCharts from "../Components/LineChart"
import Navbar from "../Components/Navbar"

const Coin = ()=>{
    const {currency} =useContext(CoinContext)
    let {coinid} = useParams()
    const [coinData,setCoinData] = useState()
    const [chartData,setChartData] = useState([])

    const fetchData1 = async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-spqA1id5dL6vakLiP83UyxL8'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res))
            .catch(err => console.error(err));
    }
    const fetchData2 = ()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-spqA1id5dL6vakLiP83UyxL8'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => setChartData(res))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchData1();
        fetchData2();

    },[currency])

if(coinData && chartData){
    return(
        <div className="coininfo h-auto w-full">
            <Navbar/>
            <div className="coin h-full w-full ">
                <div className="coinname gap-5 mb-10 flex flex-col items-center">
                    <img className="h-30 mt-10" src={coinData.image.large} alt="" />
                    <p className="text-4xl font-semibold"><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
                </div>
                <div className="coinchart w-[50%] mx-auto ">
                    <LineCharts  chartData = {chartData}  />
                </div>
                <div className="coindetails flex flex-col gap-2 items-center my-20">
                    <ul className="w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-md font-normal capitalize">
                        <li>Crypto market rank</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul className="w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-md font-normal capitalize">
                        <li>Current price</li>
                        <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul className="w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-md font-normal capitalize">
                        <li>Market Cap</li>
                        <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul className="w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-md font-normal capitalize">
                        <li>24 Hour high</li>
                        <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul className="w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-md font-normal capitalize">
                        <li>24 Hour low</li>
                        <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                    </ul>
                </div>
            </div>
           

        </div>
    )  
}
else{
    return(
        <div className="spinner h-screen w-full flex justify-center items-center">
            <img src={gold} alt="" />

        </div>

    )
}
}
export default Coin