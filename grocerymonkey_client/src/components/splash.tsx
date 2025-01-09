import React from 'react';
import { Image, InputGroup, FormControl, Spinner} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './splash.css';
import '../functions/fetchfunctions';


interface IMyStateInterface {
    redoAuth: boolean;
}

interface IMyPropsInterface {
    isAuthenticated: boolean;
    authenticatePin: Function;
    isAdmin: boolean;
    logOff: Function;
    autoPIN: string;
    tryautoPIN: boolean;
    change_tryautoPIN: Function;
}

class Splash extends React.Component<IMyPropsInterface, IMyStateInterface>{
    private PIN: any;
    constructor(props: IMyPropsInterface) {
        super(props);    
        this.PIN = React.createRef();
        this.state = {
            redoAuth: this.props.isAuthenticated,
        };
        this.tryPin = this.tryPin.bind(this);
        this.tryPinQuick = this.tryPinQuick.bind(this);
    }

    tryPinQuick(pin: string):void {
        if (pin.length === 4) {this.tryPin(pin)}
    }

    tryPin(pin: string, callback?:Function):void {
        const cbTryPin = (authFlag: boolean):void => {
            if (this.PIN.current) {this.PIN.current.value = ''};
            if (!authFlag) { this.setState(() => { return { redoAuth: !authFlag } }) };
            if (this.props.tryautoPIN) { this.props.change_tryautoPIN() };
        }
        const cbTryPinB = cbTryPin.bind(this);
        this.props.authenticatePin(pin, cbTryPinB);
        if (callback) {callback()}
    }

    componentDidMount(): void {
        if (this.props.autoPIN && this.props.tryautoPIN) {
            setTimeout(() => { this.tryPin(this.props.autoPIN) },600)
        }
    }

    render() {
        return (
            !this.props.isAuthenticated ?
                < div className="Splash" >
                    <br />
                    <Image className="Image" src='./images/grocerymonkey.jpg' />
                    <br />
                    <br />
                    <h1>Grocery Monkey</h1>
                    <br />
                    <div style={{ display: "inline-block" }}>
                        {(this.props.tryautoPIN && this.props.autoPIN)
                            ?
                            <Spinner animation="border" variant="warning" />
                            :
                            <InputGroup >
                                <FormControl
                                    autoFocus
                                    ref={this.PIN}
                                    placeholder="User PIN"
                                    aria-label="User PIN"
                                    aria-describedby="basic-addon1"
                                    onChange={() => this.tryPinQuick(this.PIN.current.value)}
                                    style={{ textAlign: "center", width: "100px" }}
                                />
                                <InputGroup.Append style={{ cursor: "pointer" }} onClick={() => { this.tryPin(this.PIN.current.value) }}>
                                    <InputGroup.Text>Login</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        }
                        {(this.state.redoAuth) ? <><br /><span style={{ color: "darkred" }}><h3>INVALID PIN</h3></span></> : null}
                    </div>
                </div >
                :
                    this.props.isAdmin
                    ?
                    <Redirect to="/config" />
                    :
                    <Redirect to="/main" />
        )
    }
}

export default Splash;
