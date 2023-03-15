import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingScreen from './screens/ShippingScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import Button from 'react-bootstrap/esm/Button';
import { Row, Col } from 'react-bootstrap';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            style={{ backgroundColor: '#8e44ad' }}
            variant="dark"
            className="justify-content-between"
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    src={'/logo.png'}
                    alt="Logo"
                    width="90px"
                    height="50px"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Nav>
                <Link to="/cart" className="nav-link">
                  <img
                    src={'/cart.png'}
                    alt="Cart"
                    width="25px"
                    height="25px"
                  />
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    <Button className="my-button" variant="primary">
                      Sign In
                    </Button>
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/forget-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordScreen />}
              />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="footer mt-10">
          <Container className="mt-3">
            <Row className="justify-content-center">
              <Col md={2}>
                <h5>About Us</h5>
                <p>
                  IUTCart is as ecommerce platform where IUTIANS can buy and
                  sell goodies.
                </p>
              </Col>
              <Col md={2}>
                <h5>Customer Service</h5>
                <ul>
                  <li>FAQ</li>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Use</li>
                </ul>
              </Col>
              <Col md={2}>
                <h5>Follow Us</h5>
                <ul>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                </ul>
              </Col>
              <Col md={2} auto>
                <img src={'/logo.png'} alt="Logo" width="90px" height="50px" />
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
