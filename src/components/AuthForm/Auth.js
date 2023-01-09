import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import './Auth.scss'
import * as authActions from '../../actions/auth'
import * as shopActions from '../../actions/shop'
import * as headerActions from '../../actions/header'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";



  const AuthForm = props => { 


    const { t } = useTranslation();

    const history = useHistory()

   const loginHandler = async (username, password, e) => {
    e.preventDefault()
    await props.auth(username, password, history)
    const data =  await props.getCart()
      props.addSpecialOffer(props.specialOffer)
      history.push('/shop')
      
  }


    return(
        <div className="fade-for-click-auth" onClick={props.hideAuthHandler}>
            <div className="popup_wrap">
                <Form onSubmit={loginHandler.bind(null,props.username, props.password)}><span className="close-popup" onClick={props.hideAuthHandler}>&times;</span>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="gudema">G U D E M A</Form.Label>
                        <Form.Label style={{fontSize: '13px'}} className="mb-5">{t('loginWind.login')}</Form.Label>
                        <Form.Control type="text" name="urername" placeholder={t('loginWind.name')} onChange={props.onChangeName}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" name="password" placeholder={t('loginWind.password')} onChange={props.onChangePassword}/> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        {props.alert ? <span style={{color:'red'}}>{t('loginWind.wrong')}!!!</span> : null}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2" >
                    {t('logIn')}
                    </Button>   
                    <Form.Group className="mt-3" controlId="contact">
                        <Form.Label style={{color: '#212529',textDecoration: 'none', fontSize:"12px"}}>{t('loginWind.lost')}?</Form.Label>
                        <Form.Label className="mb-0" style={{color: '#212529',textDecoration: 'none', fontSize:"12px"}}>{t('loginWind.new')}?</Form.Label>
                        <Form.Label style={{fontSize:"13px"}}>{t('loginWind.contact')} - <a href="mailto:edgaras@gudema.ee" style={{color: '#212529', textDecoration: 'underline'}}>{props.requisites && props.requisites.email}</a></Form.Label>
                    </Form.Group>
                    </Form>
                    <Card style={{ width: '18rem' }}><span className="close-popup" onClick={props.hideAuthHandler}>&times;</span>
                        <Card.Body>
                            <Card.Title><b>{t('orderInHolland')}</b></Card.Title>
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
   requisites: state.header.requisites,
   specialOffer: state.header.specialOffer
});
  
  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(shopActions, dispatch),
    ...bindActionCreators(headerActions, dispatch),
  });
  
  export default connect (
    mapStateToProps,
    mapDispatchToProps,
  )(AuthForm);