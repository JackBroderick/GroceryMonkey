import React from 'react';
import { Image, Card, Form, Col, Button, Row, Tabs, Tab} from 'react-bootstrap';
import './config.css';
import { ImMonkeyData_Users, ImConfig } from '../constants/constants';
import { updateConfigInfo, updateUser, createUser, deleteUser } from '../functions/fetchfunctions';
import { ItemCleanup, EmojiKeyPair, ItemsVerbs } from './itemconfig';
const emoji = require('node-emoji');

interface IMUser_Refs {
    name: any;
    pin: any;
    email: any;
    sms: any;
    notify: any;
}

interface IMyStateInterface {
    changeConfig: boolean;
    userChange: Array<boolean>;
    newChange: boolean;
}

interface IMyPropsInterface {
    isAuthenticated: boolean;
    isAdmin: boolean;
    logOff: Function;
    config: ImConfig;
    users: Array<ImMonkeyData_Users>;
    getUserData: Function;
}

class Config extends React.Component<IMyPropsInterface, IMyStateInterface>{
    private adminPin: any;
    private notifications: any;
    private emailUserName: any;
    private emailUserPassword: any;
    private smtpServer: any;
    private portNumber: any;
    private ssl: any;
    private domain: any;
    private emailAlias: any;
    private appURL: any;
    private httpPort: any;
    private httpsPort: any;

    private userRefs: Array<IMUser_Refs>;

    private newName: any;
    private newPIN: any;

    constructor(props: IMyPropsInterface) {
        super(props);
        this.adminPin = React.createRef();
        this.notifications = React.createRef();
        this.emailUserName = React.createRef();
        this.emailUserPassword = React.createRef();
        this.smtpServer = React.createRef();
        this.portNumber = React.createRef();
        this.ssl = React.createRef();
        this.domain = React.createRef();
        this.emailAlias = React.createRef();
        this.appURL = React.createRef();
        this.httpPort = React.createRef();
        this.httpsPort = React.createRef();
        this.newName = React.createRef();
        this.newPIN = React.createRef();
        this.userRefs = [];

        this.state = {
            changeConfig: false,
            userChange: this.setRefs(),
            newChange: false,
        };

        this.needSave = this.needSave.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.userChange = this.userChange.bind(this);
        this.newUser = this.newUser.bind(this);
        this.deleteUserData = this.deleteUserData.bind(this);
        this.setRefs = this.setRefs.bind(this);
    }

    setRefs(): Array<boolean> {
        this.userRefs = [];
        let userChanges = [];

        for (let i = 0; i < this.props.users.length; i++) {
            this.userRefs.push({
                name: React.createRef(),
                pin: React.createRef(),
                email: React.createRef(),
                sms: React.createRef(),
                notify: React.createRef(),
            })
            userChanges.push(false)
        }

        return userChanges;
    }

    needSave(): void {
        if (!this.state.changeConfig) { this.setState(() => { return { changeConfig: true } }) };
    }

    newUser(): void {
        if (this.newName.current.value.length && this.newPIN.current.value.length) {
            let params: ImMonkeyData_Users = {
                user_id: -1,
                name: this.newName.current.value,
                pin: this.newPIN.current.value,
                email: "",
                sms: "",
                notify: false,
            }
            createUser(params, (success: boolean) => {
                if (success) {
                    this.userRefs.push({
                        name: React.createRef(),
                        pin: React.createRef(),
                        email: React.createRef(),
                        sms: React.createRef(),
                        notify: React.createRef(),
                    })
                    let userChangeArray: Array<boolean> = this.state.userChange;
                    userChangeArray.push(false);
                    this.props.getUserData(() => {
                        this.setState(() => ({ newChange: false}))
                    })
                } else {
                    alert("Error adding user");
                }
            })
        } else {
            alert("Please enter User Name and PIN");
        }
    }

    deleteUserData(userIndex: number): void {
        if (window.confirm("Delete " + this.props.users[userIndex].name + " and all of " + this.props.users[userIndex].name + "'s grocery list items?\n\nThis cannot be undone")) {
            deleteUser(this.props.users[userIndex], (success: boolean) => {
                if (success) {
                    this.props.getUserData(() => {
                        this.setState(() => ({ newChange: false, userChange: this.setRefs() }))
                    })
                } else {
                    alert("Error deleting user");
                }
            })
        }
    }

    userChange(userElement: number): void {
        let userChangeArray: Array<boolean> = this.state.userChange;
        userChangeArray[userElement] = true;
        this.setState(() => ({ userChange: userChangeArray }));
    }

    updateUserInfo(userIndex: number): void {
        let params: ImMonkeyData_Users = {
            user_id: this.props.users[userIndex].user_id,
            name: this.userRefs[userIndex].name.current.value,
            pin: this.userRefs[userIndex].pin.current.value,
            email: this.userRefs[userIndex].email.current.value,
            sms: this.userRefs[userIndex].sms.current.value,
            notify: this.userRefs[userIndex].notify.current.checked,
        };

        updateUser(params, (userResult:ImMonkeyData_Users) => {
            if (userResult) {
                let cur_userChanges: Array<boolean> = this.state.userChange;
                cur_userChanges[userIndex] = false;
                this.setState(() => (
                    { userChange: cur_userChanges}))
            }
        })

    }

    updateConfig(event: any): void {
        event.preventDefault();
        const params: ImConfig = {
            configID: this.props.config.configID,
            adminPin: this.adminPin.current.value,
            notifications: this.notifications.current.checked,
            emailUserName: this.emailUserName.current.value,
            emailUserPassword: this.emailUserPassword.current.value,
            smtpServer: this.smtpServer.current.value,
            portNumber: parseInt(this.portNumber.current.value),
            ssl: this.ssl.current.checked,
            domain: this.domain.current.value,
            emailAlias: this.emailAlias.current.value,
            appURL: this.appURL.current.value,
            httpPort: parseInt(this.httpPort.current.value),
            httpsPort: parseInt(this.httpsPort.current.value),
        };
        updateConfigInfo(params, (success: boolean) => {
            if (!success) { alert("Error updating configuration") };
            this.props.logOff();
        })
    }

    componentWillUnmount() {
        this.props.logOff();
    }

    render() {
        return (
            <>
                <br />
                <Tabs style={{width:"99%"}} defaultActiveKey="config" id="main_tab">
                    <Tab eventKey="config" title="config">
                        <div style={{ width: "100%", textAlign: "center" }}>
                            <div style={{ width: "90%", display: "inline-block" }}>
                                <br />
                                <Form onSubmit={this.updateConfig}>
                                    <Card bg="light" style={{ width: "100%", textAlign: "left" }}>
                                        <Card.Header>
                                            <div style={{ width: "100%", display: "inline-block" }}>
                                                <div style={{ display: "inline-block", textAlign: "left", width: "50%" }}>
                                                    <Image roundedCircle src="/images/favicon.ico" style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                                                    <span style={{ visibility: "hidden" }}>X</span><span style={{ fontWeight: "bold" }}>Settings</span>
                                                </div>
                                                <div style={{ display: "inline-block", width: "50%", textAlign: "right" }}>
                                                    <Form.Group>
                                                        <Button onClick={() => { this.props.logOff() }} > Log Off</Button>
                                                        <span style={{ visibility: "hidden" }}>{'  '}</span>
                                                        <Button disabled={!this.state.changeConfig} type="submit" >Save</Button>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group as={Row} controlId="formHorizontalAdminPin">
                                                <Form.Label column sm={2}>
                                                    Admin PIN
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.adminPin} onChange={() => this.needSave()} placeholder="Admin PIN" type="password" defaultValue={this.props.config.adminPin} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formNotifications">
                                                <Col sm={{ span: 10, offset: 2 }}>
                                                    <Form.Check ref={this.notifications} onChange={() => this.needSave()} label="Enable User Notifications" defaultChecked={this.props.config.notifications} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formEmailUserName">
                                                <Form.Label column sm={2}>
                                                    Source Email
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.emailUserName} onChange={() => this.needSave()} type="email" placeholder="Source Email" defaultValue={this.props.config.emailUserName} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formEmailUserPassword">
                                                <Form.Label column sm={2}>
                                                    Source Email Password
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.emailUserPassword} onChange={() => this.needSave()} placeholder="Source Email Password" type="password" defaultValue={this.props.config.emailUserPassword} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formsmtpServer">
                                                <Form.Label column sm={2}>
                                                    SMTP Server
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.smtpServer} onChange={() => this.needSave()} placeholder="SMTP Server" defaultValue={this.props.config.smtpServer} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formportNumber">
                                                <Form.Label column sm={2}>
                                                    Port Number
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.portNumber} onChange={() => this.needSave()} placeholder="Port Number" defaultValue={this.props.config.portNumber + ""} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formssl">
                                                <Col sm={{ span: 10, offset: 2 }}>
                                                    <Form.Check ref={this.ssl} onChange={() => this.needSave()} label="SSL" defaultChecked={this.props.config.ssl} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formdomain">
                                                <Form.Label column sm={2}>
                                                    Domain
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.domain} onChange={() => this.needSave()} placeholder="Domain" defaultValue={this.props.config.domain} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formemailAlias">
                                                <Form.Label column sm={2}>
                                                    Email Alias
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.emailAlias} onChange={() => this.needSave()} placeholder="Email Alias" defaultValue={this.props.config.emailAlias} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formappURL">
                                                <Form.Label column sm={2}>
                                                    App URL
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.appURL} onChange={() => this.needSave()} placeholder="App URL" defaultValue={this.props.config.appURL} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formhttpPort">
                                                <Form.Label column sm={2}>
                                                    HTTP Port
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.httpPort} onChange={() => this.needSave()} placeholder="HTTP Port" defaultValue={this.props.config.httpPort + ""} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formhttpsPort">
                                                <Form.Label column sm={2}>
                                                    HTTPS Port (Cert Required)
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control ref={this.httpsPort} onChange={() => this.needSave()} placeholder="HTTPS Port" defaultValue={this.props.config.httpsPort + ""} />
                                                </Col>
                                                </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Form>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="users" title="users">
                        <div style={{ width: "100%", textAlign: "center", alignContent:"center" }}>
                            <div style={{ width: "90%", display: "inline-block", textAlign:"center" }}>
                                <br />
                                    <Card bg="light" style={{ width: "100%", textAlign: "left" }}>
                                        <Card.Header>
                                            <div style={{ width: "100%", display: "inline-block" }}>
                                                <div style={{ display: "inline-block", textAlign: "left", width: "50%" }}>
                                                    <Image roundedCircle src="/images/favicon.ico" style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                                                    <span style={{ visibility: "hidden" }}>X</span><span style={{ fontWeight: "bold" }}>Users</span>
                                                </div>
                                                <div style={{ display: "inline-block", width: "50%", textAlign: "right" }}>
                                                <Form.Group>
                                                    <Button onClick={() => { this.props.logOff() }} > Log Off</Button>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Card.Header>
                                    <br />
                                    <div style={{ width: "98%",  alignSelf:"Center" }}>
                                        {this.props.users.map((user: ImMonkeyData_Users, i: number) => {
                                            return (
                                                <>
                                                    <Card style={{ width: "100%" }} key={i}>
                                                        <Card.Img src={"./images/users/" + user.user_id + ".jpg"} />
                                                        <Card.Body>
                                                            <Card.Title>{user.name}</Card.Title>
                                                            <Card.Text>
                                                                {"Banana count for this month: " + emoji.emojify(":banana:") + "(" + user.banana_count + ")"}
                                                            </Card.Text>
                                                            <Form  >
                                                                <Form.Group as={Row} controlId="formUserName">
                                                                    <Form.Label column sm={2}>
                                                                        User Name
                                                                    </Form.Label>
                                                                    <Col sm={10}>
                                                                        <Form.Control ref={this.userRefs[i].name} onChange={() => {this.userChange(i) }}  placeholder="User Name" defaultValue={user.name} />
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row} controlId="formHorizontalPIN">
                                                                    <Form.Label column sm={2}>
                                                                        PIN
                                                                </Form.Label>
                                                                    <Col sm={10}>
                                                                        <Form.Control ref={this.userRefs[i].pin} onChange={() => { this.userChange(i) }}  placeholder="PIN" defaultValue={user.pin} />
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row} controlId="formHorizontalCheck">
                                                                    <Col sm={{ span: 10, offset: 2 }}>
                                                                        <Form.Check ref={this.userRefs[i].notify} onChange={() => { this.userChange(i) }} label="Grocery Monkey Notifications" defaultChecked={user.notify} />
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                                                    <Form.Label column sm={2}>
                                                                        Email
                                                                </Form.Label>
                                                                    <Col sm={10}>
                                                                        <Form.Control ref={this.userRefs[i].email} onChange={() => { this.userChange(i) }} type="email" placeholder="Email" defaultValue={user.email} />
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row} type="email" controlId="formHorizontalSMS">
                                                                    <Form.Label column sm={2}>
                                                                        SMS
                                                                    </Form.Label>
                                                                    <Col sm={10}>
                                                                        <Form.Control ref={this.userRefs[i].sms} onChange={() => { this.userChange(i) }} placeholder="SMS" defaultValue={user.sms} />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Button variant="primary" onClick={() => { this.deleteUserData(i) }} >{"Delete " + user.name}</Button>
                                                                <span style={{ visibility: "hidden" }}>{'    '}</span>
                                                                <Button variant="primary" onClick={() => { this.updateUserInfo(i) }} disabled={!this.state.userChange[i]}>Save Changes</Button>
                                                            </Form>
                                                            
                                                        </Card.Body>
                                                    </Card>
                                                    <br />
                                                </>
                                            )
                                        })}
                                        <Card style={{ width: "100%" }} >
                                            <Card.Img src={"./images/users/new_user.png"} />
                                            <Card.Body>
                                                <Card.Title>New User</Card.Title>
                                                <Form  >
                                                    <Form.Group as={Row} controlId="formUserName">
                                                        <Form.Label column sm={2}>
                                                            User Name
                                                                    </Form.Label>
                                                        <Col sm={10}>
                                                            <Form.Control ref={this.newName} onChange={() => { this.setState(() => ({ newChange: true })) }}  placeholder="User Name"  />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formHorizontalPIN">
                                                        <Form.Label column sm={2}>
                                                            PIN
                                                                </Form.Label>
                                                        <Col sm={10}>
                                                            <Form.Control ref={this.newPIN} onChange={() => { this.setState(() => ({ newChange: true })) } } placeholder="PIN"  />
                                                        </Col>
                                                    </Form.Group>
                                                    <Button variant="primary" onClick={() => { this.newUser() }} disabled={!this.state.newChange}>Add User</Button>
                                                </Form>

                                            </Card.Body>
                                        </Card>


                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="items" title="item">
                        <div style={{ width: "100%", textAlign: "center", alignContent: "center" }}>
                            <div style={{ width: "90%", display: "inline-block" }}>
                                <br />
                                <Card>
                                    <Card.Header>
                                        <div style={{ width: "100%", display: "inline-block" }}>
                                            <div style={{ display: "inline-block", textAlign: "left", width: "60%" }}>
                                                <Image roundedCircle src="/images/favicon.ico" style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                                                <span style={{ visibility: "hidden" }}>X</span><span style={{ fontWeight: "bold" }}>Item Cleanup</span>
                                            </div>
                                            <div style={{ display: "inline-block", width: "40%", textAlign: "right" }}>
                                                <Form.Group>
                                                    <Button onClick={() => { this.props.logOff() }} > Log Off</Button>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Card.Header>
                                </Card>
                                <ItemCleanup isAuthenticated={this.props.isAuthenticated} />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="emojis" title="emoji">
                        <div style={{ width: "100%", textAlign: "center", alignContent: "center" }}>
                            <div style={{ width: "90%", display: "inline-block" }}>
                                <br />
                                <Card>
                                    <Card.Header>
                                        <div style={{ width: "100%", display: "inline-block" }}>
                                            <div style={{ display: "inline-block", textAlign: "left", width: "60%" }}>
                                                <Image roundedCircle src="/images/favicon.ico" style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                                                <span style={{ visibility: "hidden" }}>X</span><span style={{ fontWeight: "bold" }}>emoji Lookup</span>
                                            </div>
                                            <div style={{ display: "inline-block", width: "40%", textAlign: "right" }}>
                                                <Form.Group>
                                                    <Button onClick={() => { this.props.logOff() }} > Log Off</Button>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Card.Header>
                                </Card>
                                <EmojiKeyPair />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="verbs" title="verb">
                        <div style={{ width: "100%", textAlign: "center", alignContent: "center" }}>
                            <div style={{ width: "90%", display: "inline-block" }}>
                                <br />
                                <Card>
                                    <Card.Header>
                                        <div style={{ width: "100%", display: "inline-block" }}>
                                            <div style={{ display: "inline-block", textAlign: "left", width: "60%" }}>
                                                <Image roundedCircle src="/images/favicon.ico" style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                                                <span style={{ visibility: "hidden" }}>X</span><span style={{ fontWeight: "bold" }}>verb Config</span>
                                            </div>
                                            <div style={{ display: "inline-block", width: "40%", textAlign: "right" }}>
                                                <Form.Group>
                                                    <Button onClick={() => { this.props.logOff() }} > Log Off</Button>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Card.Header>
                                </Card>
                                <ItemsVerbs isAuthenticated={this.props.isAuthenticated} />
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </>
    )
    }
}



export default Config;
