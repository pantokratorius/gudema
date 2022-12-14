import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import './LogoutForm.scss'
import * as authActions from '../../actions/auth'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useLocation } from 'react-router-dom' 
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";


  const LogoutForm = props => {

    const location = useLocation()
    const history = useHistory()
    const { t } = useTranslation();

    const logout = (location, history) => {
      props.logout(location, history )
      window.location="/logout"
    }

    return(
        <div className="fade-for-click-auth" onClick={props.hideAuthHandler}>
            <div className="logout_wrap">
                <Form onSubmit={logout.bind(null,location, history )}><span className="close-popup" onClick={props.hideAuthHandler}>&times;</span>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="gudema">G U D E M A</Form.Label>
                            <Card.Subtitle className="mt-3"><b>{props.authUsername}</b></Card.Subtitle>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2" >
                        {t("logOut")}
                        </Button>   
                        
                    </Form>
                    <Card style={{ width: '18rem' }}><span className="close-popup" onClick={props.hideAuthHandler}>&times;</span>
                        <Card.Body>
                            <Card.Title><b>Order in Holland department</b></Card.Title>
                            <Card.Text style={{fontSize: "15px", marginTop: "10px", marginBottom: "10px"}}>
                              <ul style={{textAlign: 'left'}}>
                                <li><b>Flowers</b></li>
                                <li><b>Plants</b></li>
                                <li><b>Greens</b></li>
                                <li><b>Decorations</b></li>
                              </ul>
                            </Card.Text>
                            <Card.Link href="https://shop.floraplaza.nl/floraplaza/en/EUR/login?store=34356" target="_blank">Floraplaza</Card.Link>
                            {/* <Card.Link href="https://www.xlflor.com/en/homexl" target="_blank" style={{marginTop: '10px'}}>Xlflor</Card.Link> */}
                        </Card.Body>
                    </Card>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
   username: state.auth.username,
   password: state.auth.password,
   isAuth: !!state.auth.authUsername,
   alert: state.auth.alert,
   authUsername: state.auth.authUsername
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(authActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(LogoutForm);