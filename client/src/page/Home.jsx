import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import { PageHOC, CustomInput, CustomButton } from '../components';

const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);
      if(!payerExists) {
        await contract.registerPlayer(playerName, playerName);
      }
    } catch (error) {
      alert(error);
    }
  } 
  
  return (
    <div className='flex flex-col'>
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton 
      title="Register"
      handleClick={handleClick}
      restStyles="mt-6"
      />
    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br /> The Ultimate Web3 Battle Card Game</>
);