import React, { useEffect } from "react";
import styled from 'styled-components';
import { Card, Accordion, useAccordionToggle , Button, CardGroup} from 'react-bootstrap';

const GridWrapper = styled.div`
  height: 100vh;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 2em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      eventKey
    );
  
    return (
      <button
        type="button"
        style={{ backgroundColor: 'transparent', border: '0'}}
        onClick={decoratedOnClick}>
        {children}
      </button>
    );
  }





const Orders = ({ orders, prices }) => {
    
    const paid = [];
    let amount = 0;

    function HandleAddItem({rows, user}) {
        amount = rows.reduce((a,b) => a+b)

        paid.push({
                user,
                amount
        })
       
        return amount
    }    

    useEffect(async () => {
        await function onFormSubmit(paid){
            const apiUrl = 'http://localhost:5000/recipes';
         
             fetch(apiUrl, {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json', 
                 },
                 body: JSON.stringify(paid)
             })
           }
    },[]);

    
    return (
        <GridWrapper>
            <div className='Header'>
                <h3 style={{marginTop:'1%'}}>Orders</h3>
            </div>
            <CardGroup className="p-3" style={{flex: 1}}>
                { Object.values(orders).map((order, index) =>{
                    const rows = [];
                    return(
                        <Card className="p-3" key={index} style={{ minWidth:'20em', margin:'0%', border:0, flexBasis: '50%'}}>
                            <Card.Body style={{border:'1px solid rgba(247, 247, 247 ,1)'}}>
                            <Card.Title><i className="fas fa-running"/> Order for {order[0].user}</Card.Title>
                                <Accordion>
                                <Card>
                                    <Card.Header>
                                        <CustomToggle eventKey={index.toString() }> View Items <i className="fas fa-caret-down"/></CustomToggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={index.toString() }>
                                        <Card.Body> 
                                        {order.map(function (person, index) {
                                          //  console.log(person)
                                            const single = prices.filter(price => 
                                            price.drink_name === person.drink)
                                        
                                            const nesw = person.size;
                                            single.map(task => rows.push(task.prices[nesw]))
                                               
                                        return (  
                                            <div key={index} className='row' >
                                                { 
                                                    person.drink.includes("supermo") ?                                                     
                                                    <div className='col' style={{textTransform:'capitalize'}}>• {person.drink.substring(0,10)}</div>:                                                    
                                                    <div className='col' style={{textTransform:'capitalize'}}>• {person.drink}</div>
                                                }
                                                <div className='col' style={{textTransform:'capitalize'}}>{person.size[0]}/ 
                                                    { single.map((task, index) => {
                                                        //console.log(task)
                                                            return ( task.prices[nesw])}) }$
                                                </div>
                                            </div>)
                                        
                                        })}   
                                       </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                    
                            <Button variant="light" style={{border: 0, backgroundColor:"#c7a17a", color:"#fff", marginTop:'5%'}}>
                                Total:<HandleAddItem rows={rows} user={order[0].user}/>$
                            </Button>
                            </Card.Body>
                         </Card>
                    )
                })}
            </CardGroup>
        </GridWrapper>
    )
}

export default Orders