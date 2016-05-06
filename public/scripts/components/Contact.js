import React from 'react'

import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui';
import { Paper } from 'material-ui';
import { Grid, Row, Col} from 'react-bootstrap';

class Contact extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={12}>
                        This is contact page!
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Contact;