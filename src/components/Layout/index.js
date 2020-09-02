import React, { Component } from 'react'
import Navbar from '../Navbar/index';
import { checkCredentials } from '../Auth/index';
import { Helmet as Head } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';



export class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: null,
        }
    }
    componentDidMount(){
        if(checkCredentials()){
            this.setState({isLoggedIn: true});
        } else{
            this.setState({isLoggedIn: false});
        }
    }
    render() {
        if(this.props.isAuth){
            if(this.state.isLoggedIn === false){
                return <Redirect to={this.props.fallBack || "/"} />;
            }
        }
        return (
             <div> 
                <Head>
                    <title>{this.props.title || ":)"} | NightKit</title>
                </Head>
                <Navbar isLoggedIn={this.state.isLoggedIn} />
       
                {this.props.children}
            
            </div>
        )
    }
}

export default Layout
