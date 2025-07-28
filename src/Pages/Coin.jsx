import react, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../Context/CoinContext";
import gold from "../assets/Gold-coin-Bitcoin-unscreen.gif";
import LineCharts from "../Components/LineChart";
import Navbar from "../Components/Navbar";

const Coin = () => {
    const { currency } = useContext(CoinContext);
    let { coinid } = useParams();
    const [coinData, setCoinData] = useState();
    const [chartData, setChartData] = useState([]);

    const fetchData1 = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-spqA1id5dL6vakLiP83UyxL8' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res))
            .catch(err => console.error(err));
    };

    const fetchData2 = () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-spqA1id5dL6vakLiP83UyxL8' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => setChartData(res))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchData1();
        fetchData2();
    }, [currency]);

    if (coinData && chartData) {
        return (
            <div className="coininfo h-auto w-full">
                <Navbar />
                <div className="coin h-full w-full px-4 md:px-10">
                    <div className="coinname gap-5 mb-10 flex flex-col items-center text-center">
                        <img className="h-24 md:h-32 mt-10" src={coinData.image.large} alt="" />
                        <p className="text-2xl md:text-4xl font-semibold">
                            <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b>
                        </p>
                    </div>
                    <div className="coinchart w-full sm:w-[80%] md:w-[70%] lg:w-[50%] mx-auto">
                        <LineCharts chartData={chartData} />
                    </div>
                    <div className="coindetails flex flex-col gap-4 items-center my-10 md:my-20 px-4 sm:px-6">
                        <ul className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-sm md:text-md font-normal capitalize">
                            <li>Crypto market rank</li>
                            <li>{coinData.market_cap_rank}</li>
                        </ul>
                        <ul className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-sm md:text-md font-normal capitalize">
                            <li>Current price</li>
                            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                        </ul>
                        <ul className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-sm md:text-md font-normal capitalize">
                            <li>Market Cap</li>
                            <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                        </ul>
                        <ul className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-sm md:text-md font-normal capitalize">
                            <li>24 Hour high</li>
                            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                        </ul>
                        <ul className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] flex justify-between items-center border-b-2 border-b-[#5f5d5f] py-2 px-1 text-sm md:text-md font-normal capitalize">
                            <li>24 Hour low</li>
                            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-screen bg-transparent">
              <div className="relative w-20 h-20 rounded-full border-8 border-yellow-400 border-t-transparent animate-spin shadow-[0_0_30px_rgba(250,204,21,0.6)]">
                
              
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300/30 via-transparent to-yellow-100/20 animate-pulse"></div>
                
               
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10
                             10-4.486 10-10S17.514 2 12 2zm.5 14h-1v-1h1v1zm1.93-4.36
                             c-.32.29-.77.45-1.43.5v.86h-1v-.89c-.88-.11-1.5-.54-1.5-1.32h1
                             c0 .28.25.47.72.47.39 0 .72-.17.72-.43 0-.18-.1-.31-.32-.41
                             l-.87-.31c-1.03-.37-1.53-.95-1.53-1.77 0-.94.65-1.6 1.5-1.74V7h1v.89
                             c.79.1 1.31.53 1.4 1.25h-1.03c-.05-.26-.27-.44-.65-.44-.37 0-.67.17-.67.45
                             0 .22.12.38.41.49l.8.29c1.13.41 1.61.99 1.61 1.86 0 .43-.16.81-.57 1.17z"/>
                  </svg>
                </div>
              </div>
            </div>
          );
          
    }
};

export default Coin;
