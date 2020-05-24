import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarText,
    Container
} from 'reactstrap';

const AppNavBar = (props) => {
    return (
        <div>
            <Navbar color="primary" className="text-info" dark >
                <Container>
                    <NavbarBrand href="/">FirstReport</NavbarBrand>
                    <NavbarText>squadcast</NavbarText>
                </Container>
            </Navbar>
        </div>
    );
}

export default AppNavBar;