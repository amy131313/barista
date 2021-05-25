import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styles
import './App.css'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';

// UI Components
import Main from './components/Main'
import Orders from './components/Orders'
import SideBar from './components/SideBar'
import Payments from './components/Payments';

const App = () => {

  const [prices, setPrices] = useState([])
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [recipes, setRecipes] = useState([])
  
//Get payments data stored on the json local server 
  useEffect(() => {
    const getPayments = async () => {
      const paymentsFromServer = await fetchPayments()
      
      const nest = paymentsFromServer.reduce((r, order, index) => {
        const {
          user,
          amount
        } = order;
      
        r[user] = [...r[user] || [], {
          user,
          amount
        }];
      
        return r;
      }, {});

      setPayments(nest)
    }

    getPayments()
  }, [])
  
  //Fetch data 
  const fetchPayments = async () => {
    const res = await fetch('http://localhost:5000/payments')  
    const data = await res.json()

    return data
  }


  useEffect(() => {
    const getMenu = async () => {
      const menuFromServer = await fetchMenu()
      setPrices(menuFromServer)
    }

    getMenu()
  }, [])
  
  //Fetch data 
  const fetchMenu = async () => {
    const res = await fetch('http://localhost:5000/prices')  
    const data = await res.json()

    return data
  }

  
  useEffect(() => {
    const getOrders = async () => {
      const ordersFromServer = await fetchOrders()

      const nest = ordersFromServer.reduce((r, order, index) => {
        const {
          user,
          drink,
          size
        } = order;
      
        r[user] = [...r[user] || [], {
          user,
          drink,
          size
        }];
      
        return r;
      }, {});

      setOrders(nest)
    }

    getOrders()
  }, [])
  
  //Fetch data orders
  const fetchOrders = async () => {
    const res = await fetch('http://localhost:5000/orders')  
    const data = await res.json()

    return data
  }

  //Get the total amount to be paid from the orders
  useEffect(() => {
    const getRecipes = async () => {
      const recipesFromServer = await fetchRecipes()
      setRecipes(recipesFromServer)
    }

    getRecipes()
  }, [])
  
  //Fetch data 
  const fetchRecipes = async () => {
    const res = await fetch('http://localhost:5000/recipes')  
    const data = await res.json()

    return data
  }
  
  return (
      <React.Fragment>
        <Router>
        <NavigationBar/>
        <SideBar/>

        <Switch>
          <Route exact path="/">
            <Main prices={prices} className='App--sidebar'/>
          </Route>

          <Route exact path="/orders">
            <Orders className="App--main" orders={orders} prices={prices} recipes={recipes}/>           
          </Route>

          <Route exact path="/payments">
            <Payments payments={payments}/>           
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
