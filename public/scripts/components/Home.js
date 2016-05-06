import React from 'react';

import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui';
import { Paper } from 'material-ui';
import { Grid, Row, Col} from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

class Home extends React.Component {

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col lg={9}>
                            <h1>Welcome to the home site of Jeff Zhang!</h1>
                        </Col> 
                        <Col lg={3}>
                            <Card>
                                <CardHeader
                                  title="URL Avatar"
                                  subtitle="Subtitle"
                                  avatar="http://lorempixel.com/100/100/nature/"
                                />
                                <CardMedia
                                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                                >
                                  <img src="http://lorempixel.com/600/337/nature/" />
                                </CardMedia>
                                <CardTitle title="Card title" subtitle="Card subtitle" />
                                <CardText>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                              </Card>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Home;