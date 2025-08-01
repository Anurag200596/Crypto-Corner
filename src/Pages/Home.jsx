import react, { useContext, useEffect, useState } from "react"
import { CoinContext } from "../Context/CoinContext"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"

const Home = () => {
    const clickHandler2 = () => {
        if (coinNo < 100)
            setCoinNo((prev) => prev + 10)
    }

    const clickHandler3 = () => {
        if (coinNo > 10)
            setCoinNo((prev) => prev - 10)
    }

    const clickHandler = (e) => {
        e.target.style.scale = "1.1"
    }
    const leaveHandler = (e) => {
        e.target.style.scale = "1"
    }

    const changeHandler = (e) => {
        setInput(e.target.value)
        if (e.target.value === "") {
            setdisplayCoin(coins)
        }
    }

    let { coins, currency, coinNo, setCoinNo } = useContext(CoinContext)
    const [displayCoin, setdisplayCoin] = useState([])
    const [input, setInput] = useState("")

    useEffect(() => {
        setdisplayCoin(coins)
    }, [coins])

    const submitHandler = (e) => {
        e.preventDefault()
        const filteredCoin = coins.filter((coin) => {
            return coin.name.toLowerCase().includes(input.toLowerCase())
        })
        setdisplayCoin(filteredCoin)
    }

    return (
        <>
            <div className="home pb-2 h-auto w-full px-4 sm:px-6 md:px-10">
                <Navbar />
                <div className="hero flex flex-col items-center max-w-2xl mt-20 mx-auto text-center px-4">
                    <h1 className="heading text-[8vw] sm:text-[6vw] md:text-[4vw] leading-tight capitalize mx-auto font-bold">
                        largest <br /> crypto marketplace
                    </h1>
                    <p className="w-[90%] sm:w-[80%] mt-5 text-sm leading-6 text-[#e3e3e3]">
                        Welcome to world's largest cryptocurrency marketplace. <br /> Sign up to explore more about cryptos
                    </p>
                    <form
                        onSubmit={submitHandler}
                        className="mt-5 bg-white rounded-md py-2 px-3 flex flex-col sm:flex-row justify-between items-stretch sm:items-center w-[90%] sm:w-[80%] gap-4 sm:gap-[3vw]"
                    >
                        <input
                            value={input}
                            onChange={changeHandler}
                            list="list"
                            className="bg-white text-black border-0 outline-0 w-full sm:w-auto flex-1"
                            type="text"
                            placeholder="Search crypto..."
                        />
                        <datalist className="appearance-none" id="list">
                            {
                                coins.map((elem, idx) => <option key={idx} value={elem.name}></option>)
                            }
                        </datalist>
                        <button
                            onMouseEnter={clickHandler}
                            onMouseLeave={leaveHandler}
                            className="bg-[#7927ff] py-2 px-4 sm:py-[1vw] sm:px-[2vw] rounded-md w-full sm:w-auto"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="crypto-table mb-5 max-w-[800px] mt-10 rounded-md mx-auto px-2 sm:px-0">
                    <div className="table-layout grid grid-cols-5 items-center border-b-2 border-b-[#3c3c3c] text-sm sm:text-base gap-2 sm:gap-4 px-1 sm:px-3">
                        <p>#</p>
                        <p>Coins</p>
                        <p>Price</p>
                        <p className="text-center">24H Change</p>
                        <p className="text-right market-cap">Market cap</p>
                    </div>
                    {
                        displayCoin.slice(0, coinNo).map((elem, idx) =>
                            <Link
                                to={`/coin/${elem.id}`}
                                className={`table-layout grid grid-cols-5 items-center ${idx === coinNo - 1 ? "border-b-0" : "border-b-2 border-b-[#3c3c3c]"} text-sm sm:text-base gap-2 sm:gap-4 px-1 sm:px-3 py-2`}
                                key={idx}
                            >
                                <p>{elem.market_cap_rank}</p>
                                <div className="flex gap-2 items-center">
                                    <img className="h-8 sm:h-10 w-auto" src={elem.image} alt="" />
                                    <p>{elem.name + " " + elem.symbol}</p>
                                </div>
                                <p>{currency.symbol} {elem.current_price.toLocaleString()}</p>
                                <p className={`text-center ${elem.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                                    {Math.floor(elem.price_change_percentage_24h * 100) / 100}
                                </p>
                                <p className="text-right market-cap">{currency.symbol}{elem.market_cap.toLocaleString()}</p>
                            </Link>
                        )
                    }
                </div>

                <div className="buttons w-full flex flex-wrap justify-center gap-4 px-4 sm:px-10">
                    <button
                        onClick={clickHandler2}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-5 py-2 rounded-xl transition duration-300 w-full sm:w-auto"
                    >
                        Show More
                    </button>

                    <button
                        onClick={clickHandler3}
                        className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-5 py-2 rounded-xl transition duration-300 w-full sm:w-auto"
                    >
                        Show Less
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home
