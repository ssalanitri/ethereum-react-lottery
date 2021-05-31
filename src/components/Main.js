import React, { useEffect, useState } from 'react'
import  { web3_utils } from 'web3-utils';
import Web3 from 'web3';

import { abi , networks } from '../build/Lottery.json';

console.log(abi);
console.log(networks);

const Main = () => {

  let web3;

  const [state, setState] = useState({
                                      manager: '',
                                      players: [],
                                      balance: '',
                                      award: '',
                                      value: '',
                                      message: '',
                                      winner: '',
                                      web3: '',
                                      lottery: ''
                                    });
  
  useEffect( () => {
           
         async function setInitialState(){
    
            await connectWeb3();
            const lottery = new web3.eth.Contract(
                            abi,
                            networks[5777].address
                          );
       
    
            const manager = await lottery.methods.manager().call();
            const players = await lottery.methods.getPlayers().call();
            const balance = await web3.eth.getBalance(state.lottery.options.address);
            const winner = await lottery.methods.winner().call();
                       
            setState({manager,players,balance,winner,web3,lottery});

         }

         setInitialState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

  const connectWeb3 = async () => {
    let web3Provider;

    // Modern dapp browsers...
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error('User denied account access');
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganached
    else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

      web3 = new Web3(web3Provider);
    };
  
  const onSubmit = async e => {
      e.preventDefault();

      const accounts = await web3.eth.getAccounts();

      setState({ message: 'Waiting on transaction success...' });

      await state.lottery.methods.enter().send({
        from: accounts[0],
        value: web3_utils.toWei(this.state.value, 'ether')
      });

      setState({ message: 'You have been entered!' });
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setState({ message: 'Waiting on transaction success...' });

    await state.lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setState({ message: 'And the winner is....'+ state.winner});
  };

  return (
    <div style={{ padding: '40px'}}>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {state.manager}. There are currently{' '}
        {!state.players === 'undefined' ? state.players.length : 0 } people entered, competing to win{' '}
        {/* {web3_utils.fromWei(state.balance, 'ether')} ether!   */}
      </p>

      <hr />

      <form onSubmit={ onSubmit }>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={state.value}
            onChange={ e => setState({ value: e.target.value })}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr />

      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner!</button>

      <hr />

      <h1>{state.message}</h1>
    </div>
  );
}

export default Main;