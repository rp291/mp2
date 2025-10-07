import React from 'react';
import { Header, Container, Menu, MenuItem, Grid, GridRow, GridColumn, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <Segment basic padded="very">
            <Container textAlign="center">
                <Header as="h1">
                    First Generation Pokemon
                </Header>
                <Grid centered>
                    <GridRow>
                        <GridColumn width={5}></GridColumn>
                        <GridColumn width={2}>
                            <Menu text>
                                <MenuItem as={Link} to="/list" name="search">
                                    Search
                                </MenuItem>
                                <MenuItem as={Link} to="/gallery" name="gallery">
                                    Gallery
                                </MenuItem>
                            </Menu>
                        </GridColumn>
                        <GridColumn width={5}></GridColumn>
                    </GridRow>
                </Grid>

            </Container>
        </Segment>
    );
}

export default NavBar;