import React from 'react'

import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui';
import { Paper } from 'material-ui';
import { Grid, Row, Col} from 'react-bootstrap';

class About extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={12}>
                        This is about page!
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default About;