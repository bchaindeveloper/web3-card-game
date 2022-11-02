import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { PageHOC, CustomInput, CustomButton } from '../components';

const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: "failure",
        message: "Something went wrong!"
      })
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate('/create-battle');
    };
    if (contract) createPlayerToken();
  }, [contract]);



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