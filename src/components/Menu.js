import styled from 'styled-components';
import { Card, CardDeck, Badge, Image} from 'react-bootstrap';

const GridWrapper = styled.div`
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 0.3em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 

const PriceWrapper = styled.div`
display: grid;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 34px;
    background-color: transparent;
    color: #c7a17a;
    font-size: 1em;
`;

const Menu = ({ coffees }) => {
    const urlPathForImages = './../images/';
    
    return (
        <GridWrapper> 
            <div className='Header'>
                <Image src="./../coffe.svg" style={{width:'60px'}}></Image>
                <h3 style={{marginTop:'1%'}}>Grain Coffee Menu</h3>
            </div>
        <CardDeck>
            {coffees.map((coffe, index) => (
                <Card key={index} className="mb-2" style={{ minWidth:'18em', maxWidth:'18em', border: '0', flex:2, backgroundColor:'rgba(247, 247, 247 ,0.8)'}}>
                    <Card.Body className="text-center" style={{ backgroundColor:'rgba(247, 247, 247 ,0.8)',  borderRadius:'3%'}} >
                    <Card.Img variant="top" src={`${urlPathForImages}${coffe.image}`} style={{ backgroundColor:'white',  borderRadius:'3%'}} />
                    {coffe.drink_name.includes("supermocha") ? <Badge pill variant="info" style={{marginTop:'3%'}}> NEW </Badge> : ""}
                    <Card.Title className="text-center--header">{coffe.drink_name}</Card.Title> 
                    <Card.Subtitle className="mb" style={{color:'#b9a787', marginBottom:'1rem'}}>{coffe.description}</Card.Subtitle>
                    <div key={index}  style={{ display:'flex', justifyContent:'center', backgroundColor:'rgba(247, 247, 247 ,0.8)'}}>
                            {coffe.prices.small > 0 ? 
                                <PriceWrapper>
                                    <Badge variant="light">S</Badge> {coffe.prices.small}$ 
                                </PriceWrapper>
                                : ''
                            } 
                            {coffe.prices.medium > 0 ? 
                                <PriceWrapper>
                                    <Badge variant="light">M</Badge> {coffe.prices.medium}$ 
                                </PriceWrapper>
                                : ''
                            } 

                            {coffe.prices.large > 0 ? 
                                <PriceWrapper >
                                 <Badge variant="light">L</Badge>{coffe.prices.large}$ 
                                </PriceWrapper> : ''
                            }

                            {coffe.prices.huge > 0 ? 
                                <PriceWrapper >
                                    <Badge variant="light">H</Badge>{coffe.prices.huge}$ 
                                </PriceWrapper> : ''
                            }

                            {coffe.prices.mega > 0 ? 
                                <PriceWrapper >
                                 <Badge variant="light">Mega</Badge>{coffe.prices.mega}$
                                </PriceWrapper> : ''
                            }   

                            {coffe.prices.ultra > 0 ? 
                                <PriceWrapper >
                                    <Badge variant="light">U</Badge>{coffe.prices.ultra}$
                                </PriceWrapper> : ''
                            }       
                        </div>
                    </Card.Body>
                </Card>
             ))}
        </CardDeck>
        </GridWrapper>
    )
}

export default Menu