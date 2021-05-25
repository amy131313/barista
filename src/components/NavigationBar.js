import { Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar-brand {
    font-size: 1.4em;
    color: #7b7b7b ;
    &:hover { color: #584C47; }
  }
`;

const NavigationBar = () => {
    return (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">
              <img
                src="/logo.svg"
                width="70"
                alt="Barista logo"
              /> 
              G•R•A•I•N B•A•R•I•S•T•A
            </Navbar.Brand>
        </Navbar>
    </Styles>
    )
}

export default NavigationBar
