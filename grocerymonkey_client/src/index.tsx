import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect, BrowserRouterProps } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import './index.css';

import Splash from './components/splash';
import Main from './components/main';
import User from './components/user';
import Config from './components/config';

import { validatePin, updateUser, getConfigInfo, getUsers } from './functions/fetchfunctions';
import { ImMonkeyData_Users, ImConfig, shared_Key } from './constants/constants';


interface IMyPropsInterface {
    autoPIN: string;
}

interface IMyStateInterface {
    auth: boolean;
    user: ImMonkeyData_Users;
    isAdmin: boolean;
    tryautoPIN: boolean;
    config?: ImConfig;
    users?: Array<ImMonkeyData_Users>;
};

interface PrivateRouteProps extends BrowserRouterProps {
    component: React.ReactType;
    path: string;
    isAuthenticated: boolean;
    authenticatePin?: Function;
    user?: ImMonkeyData_Users;
    isAdmin?: boolean;
    logOff?: Function;
    updateUser?: Function;
    config?: ImConfig;
    users?: Array<ImMonkeyData_Users>;
    getUserData?: Function;
};

const PrivateRoute: React.SFC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    return (
        <Route {...rest} render={() => (
            props.isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
};


class AppContainer extends React.Component<IMyPropsInterface, IMyStateInterface> {
    constructor(props: IMyPropsInterface) {
        super(props);
        this.state = {
            auth: false,
            user: {
                user_id: 0,
                name: '',
            },
            isAdmin: false,
            tryautoPIN: true,
        }
        this.authenticatePin = this.authenticatePin.bind(this);
        this.logOff = this.logOff.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    logOff():void {
        this.setState(() => {
            return {
                auth: false,
                isAdmin:false,
            }
        })
    }

    authenticatePin(pin: string, callback: Function): void {
        const userAuth = (authFlag: boolean, user: ImMonkeyData_Users) => {
            getConfigInfo((configJSON: ImConfig) => {
                getUsers((userJSON: Array<ImMonkeyData_Users>) => {
                    this.setState(() => ({
                        auth: authFlag,
                        user: user,
                        isAdmin: (user.user_id === -1),
                        config: configJSON,
                        users: userJSON,
                    }))
                    callback(authFlag);
                })
            })
        }
        validatePin(pin, userAuth.bind(this));
    }

    updateUser(params: ImMonkeyData_Users, callback: Function): void {
        const updateUserCB = (newUser: ImMonkeyData_Users): void => {
            this.setState(() => { return { user: newUser } });
            callback();
        }
        updateUser(params, updateUserCB.bind(this));
    }

    getUserData(callback: Function): void {
        getUsers((userJson: Array<ImMonkeyData_Users>) => {
            this.setState(() => ({ users: userJson }), callback());
        })
    }

    render(){
        return (
            <Router>
                <Route exact path="/" render={() => (<Splash autoPIN={this.props.autoPIN} tryautoPIN={this.state.tryautoPIN} change_tryautoPIN={() => { this.setState(() => ({tryautoPIN:false}))}} isAuthenticated={this.state.auth} authenticatePin={this.authenticatePin} isAdmin={this.state.isAdmin} logOff={this.logOff}/>)} />
                <PrivateRoute path="/config" component={Config} isAuthenticated={this.state.auth} isAdmin={this.state.isAdmin} logOff={this.logOff} config={this.state.config} users={this.state.users} getUserData={this.getUserData}/>
                <PrivateRoute path="/main" component={Main} isAuthenticated={this.state.auth} user={this.state.user} logOff={this.logOff} />
                <PrivateRoute path="/user" component={User} isAuthenticated={this.state.auth} user={this.state.user} updateUser={this.updateUser} />
            </Router>
            )
        }
}


function getAutoPIN(): string {
    let returnPIN: string  = '';
    let HTMLheadElement: HTMLElement = document.getElementsByName('m_auth')[0];
    if (HTMLheadElement) {
        let m_auth_attempt: string | null = HTMLheadElement.getAttribute('content');
        if (m_auth_attempt) {
            if (parseInt(m_auth_attempt)) {
                let m_auth_pin: string = parseInt(m_auth_attempt) ? (parseInt(m_auth_attempt) % shared_Key).toString() : ''
                if (m_auth_pin) { returnPIN = m_auth_pin };
            }
        }
    }
    return returnPIN;
};

ReactDOM.render(<AppContainer autoPIN={getAutoPIN()} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
