import styled from 'styled-components';
import { Card, CardGroup, Accordion, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const GridWrapper = styled.div`
  height: 100vh;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 2em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;



const Payments = ({ payments  }) => {

    const [recipes, setRecipes] = useState([])

    //Get the total amount to be paid from the orders
    useEffect(() => {
        const getRecipes = async () => {
            const recipesFromServer = await fetchRecipes()
            setRecipes(recipesFromServer[0])
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
        <GridWrapper>
            <div className='Header'>
                <h3 style={{marginTop:'1%'}}>Payments</h3>
            </div>
            <CardGroup style={{flex: 1}}>
            { Object.values(payments).map(function(order, index){
                const paymentsList  = order.filter(o => o.user = order[0].user).map(amount => amount.amount)
                const totalPaid = paymentsList.reduce(function(a, b){ return (a + b)})
                let singleRecipe = recipes.filter(recipe =>recipe.user === order[0].user).map(i=> i.amount)
                let owend = singleRecipe - totalPaid
                return(
                <Card className="p-3" key={index}
                style={{ minWidth:'15em', maxWidth:'15em', border: '0', flexBasis: '25%' }}>
                    <Card.Body style={{ border:'1px solid rgba(247, 247, 247 ,1)'}} >
                    <Card.Title><i className="fas fa-hand-holding-usd"/> {order[0].user}</Card.Title>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={index.toString() }> {/* EventKey is a String type variable, your initial value is a number type variable. */}
                            Paid <i className="fas fa-caret-down"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body>
                                    { order.filter(o => o.user = order[0].user).map((amount, index) => 
                                        <p key={index} style={{ height: 'auto'}}>{amount.amount}$</p>
                                    )}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                        <div className="progress" style={{ height: '15px', marginTop:'10%'}}>
                            <div className="progress-bar" role="progressbar" style={{width:`${totalPaid}%`, backgroundColor: '#c7a17a'}}/>
                        </div>

                        
                        <p>Total: {singleRecipe}$</p>
                        <div>Paid: {totalPaid}$</div>

                        {owend.toString().includes("-")? <Badge variant="success">Overcharged: {owend}$</Badge> :  <Badge variant="warning">Pending: {owend}$</Badge>}
                       
                    </Card.Body>
                </Card>
             )})}
            </CardGroup>
        </GridWrapper>
    )
}

export default Payments