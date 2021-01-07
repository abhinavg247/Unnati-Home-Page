// NavLogo should be a react-scroll-link when the user is on the homepage , however it should be a react router link to redirect the user
// to the homepage of the website

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import GoToDashboardButton from '../go-to-dashboard-button-link/go-to-dashboard-button-link.component';
import SignInButton from '../sign-in-button-link/sign-in-button-link.component';
// import { ImBook } from 'react-icons/im';
import { FaBars } from 'react-icons/fa';
import { ReactComponent as UnnatiLogo } from '../../icons/UnnatiTree.svg';
import './homepage-navbar.css';

import {
  Nav,
  NavbarContainer,
  NavbarMiddle,
  NavLogo,
  NavName,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavbarRight,
  NavBtnLink,
} from './homepage-navbar.styles';

class HomePageNavbar extends React.Component {
  constructor() {
    super();

    this.state = {
      scrollPos: 0,
      changedColor: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // const { scrollPos } = this.state;
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      changedColor: document.body.getBoundingClientRect().top < -20,
    });
  };
  render() {
    const { user, toggle } = this.props;
    const { changedColor } = this.state;
    return (
      <>
        <Nav scrollOn={changedColor}>
          <NavbarContainer>
            <MobileIcon onClick={toggle} scrollOn={changedColor}>
              <FaBars />
            </MobileIcon>
            <NavbarMiddle>
              <NavLogo
                to='home'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={-120}
              >
                {/* <img
                  src={UnnatiLogo}
                  alt='UnnatiLogo'
                  style={{ height: '60px' }}
                /> */}
                <UnnatiLogo style={{ height: '60px' }} />
                <NavName scrollOn={changedColor}>UNNATI</NavName>
              </NavLogo>
              <NavMenu>
                <NavItem scrollOn={changedColor}>
                  <NavLinks
                    to='home'
                    className='home'
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-120}
                    scrollOn={changedColor}
                  >
                    Home
                  </NavLinks>
                </NavItem>
                <NavItem scrollOn={changedColor}>
                  <NavLinks
                    to='about'
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-50}
                    scrollOn={changedColor}
                  >
                    About Us
                  </NavLinks>
                </NavItem>
                <NavItem scrollOn={changedColor}>
                  <NavLinks
                    to='courses'
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-70}
                    scrollOn={changedColor}
                  >
                    Courses
                  </NavLinks>
                </NavItem>
                <NavItem scrollOn={changedColor}>
                  <NavLinks
                    to='testimonials'
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-100}
                    scrollOn={changedColor}
                  >
                    Student Stories
                  </NavLinks>
                </NavItem>
                <NavItem scrollOn={changedColor}>
                  <NavLinks
                    to='footer'
                    className='contact'
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact='true'
                    offset={-120}
                    scrollOn={changedColor}
                  >
                    Contact Us
                  </NavLinks>
                </NavItem>
              </NavMenu>
            </NavbarMiddle>
            <NavbarRight>
              {/* <NavBtnLink to='/signin'>Sign In</NavBtnLink> */}
              {user ? (
                <GoToDashboardButton
                  scrollClass={this.state.changedColor ? true : false}
                />
              ) : (
                <SignInButton
                  scrollClass={this.state.changedColor ? true : false}
                />
              )}
            </NavbarRight>
          </NavbarContainer>
        </Nav>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePageNavbar);
