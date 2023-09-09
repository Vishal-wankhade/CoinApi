import React, { useState } from 'react';
import CoinItem from './CoinItem';
import Coin from '../routes/Coin';
import { Link } from 'react-router-dom';
import './Coins.css';

const Coins = (props) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10; 

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = props.coins.slice(indexOfFirstCoin, indexOfLastCoin);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='container'>
      <div>
        <div className='heading'>
          <p>#</p>
          <p className='coin-name'>Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className='hide-mobile'>Volume</p>
          <p className='hide-mobile'>Mkt Cap</p>
        </div>

        {currentCoins.map((coin, index) => (
          <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
            <CoinItem coins={coin} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className='pagination'>
        {props.coins.length > coinsPerPage &&
          Array.from({ length: Math.ceil(props.coins.length / coinsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className='btn'>
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Coins;
