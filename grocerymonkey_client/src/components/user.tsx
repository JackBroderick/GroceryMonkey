import React from 'react';
import { Image, Card, Form, Col, Button, Row, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './user.css';
import '../functions/fetchfunctions';
import { ImMonkeyData_Users } from '../constants/constants';
import 'react-html5-camera-photo/build/css/index.css';
// @ts-ignore
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import { updateUserSelfie } from '../functions/fetchfunctions';




interface IMyStateInterface {
    changeUser: boolean;
    newSelfie: boolean;
    userSelfie: any;
    selfieChange: boolean;
}

interface IMyPropsInterface {
    auth: boolean;
    user: ImMonkeyData_Users;
    updateUser: Function;
}

class User extends React.Component<IMyPropsInterface, IMyStateInterface>{
    private userSelfieSubmit: any;
    private userName: any;
    private PIN: any;
    private email: any;
    private sms: any;
    private notify: any;
    constructor(props: IMyPropsInterface) {
        super(props);
        this.userSelfieSubmit = React.createRef();
        this.userName = React.createRef();
        this.PIN = React.createRef();
        this.email = React.createRef();
        this.sms = React.createRef();
        this.notify = React.createRef();
        this.state = { changeUser: false, newSelfie: false, userSelfie: './images/users/' + props.user.user_id + '.jpg#' + new Date().getTime(), selfieChange:false };
        this.needSave = this.needSave.bind(this);
        this.updateUserLocal = this.updateUserLocal.bind(this);
        this.toggleSelfie = this.toggleSelfie.bind(this);
        this.onTakePhoto = this.onTakePhoto.bind(this);
    }

    needSave(): void {
        if (!this.state.changeUser) { this.setState(() => { return { changeUser: true } }) };
    }

    updateUserLocal(event: any): void {
        event.preventDefault();
        const params = {
            user_id: this.props.user.user_id,
            name: this.userName.current.value,
            pin: this.PIN.current.value,
            email: this.email.current.value,
            sms: this.sms.current.value,
            notify: this.notify.current.checked
        };

        if (this.state.selfieChange) { updateUserSelfie(this.props.user.user_id + "", this.state.userSelfie, (success: boolean) => { console.log('File uploaded: ' + success) }) };
        this.props.updateUser(params, () => (this.setState(() => { return { changeUser: false, selfieChange:false } })));
    }

    onTakePhoto(dataURI: any): void {
        //alert(dataURI);
        this.setState(() => {
            return { userSelfie: dataURI, newSelfie: false, changeUser: true, selfieChange:true }
        });
    }

    toggleSelfie(): void {
        this.setState(() => { return { newSelfie: !this.state.newSelfie } });
    }

    render() {
        return (
            <div style={{ width: "100%", textAlign: "center" }}>
                <div style={{ width: "90%", display: "inline-block" }}>
                    <MonkeyPicture show={this.state.newSelfie} user={this.props.user} onTakePhoto={this.onTakePhoto} toggleSelfie={this.toggleSelfie} />
                    <br />
                    <Form onSubmit={this.updateUserLocal}>
                        <Card bg="light" style={{ width: "100%", textAlign: "left" }}>
                            <Card.Header>

                                <div style={{ width: "100%", display:"inline-block" }}>
                                    <div style={{ display: "inline-block", textAlign: "left", width: "50%" }}>
                                        <Image roundedCircle style={{ width: "40px", height: "40px", cursor: "pointer" }} src={this.state.userSelfie} onClick={() => { this.toggleSelfie() }} />
                                        <span style={{ visibility: "hidden" }}>X</span><span style={{ fontWeight: "bold" }}>{ this.props.user.name }</span>
                                    </div>
                                    <div style={{display:"inline-block",width:"50%",textAlign:"right"}}>
                                        <Form.Group>  
                                            <Link to='/main'><Button >Back</Button></Link>
                                            <span style={{ visibility: "hidden" }}>{'  '}</span>
                                            <Button disabled={!this.state.changeUser} type="submit" >Save</Button>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group as={Row} controlId="formHorizontalName">
                                    <Form.Label column sm={2}>
                                        User Name
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control ref={this.userName} onChange={() => this.needSave()} placeholder="User Name" defaultValue={this.props.user.name} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPIN">
                                    <Form.Label column sm={2}>
                                        PIN
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control ref={this.PIN} onChange={() => this.needSave()} type="password" placeholder="PIN" defaultValue={this.props.user.pin} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalCheck">
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Form.Check ref={this.notify} onChange={() => this.needSave()} label="Grocery Monkey Notifications" defaultChecked={this.props.user.notify} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Email
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control ref={this.email} onChange={() => this.needSave()} type="email" placeholder="Email" defaultValue={this.props.user.email} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} type="email" controlId="formHorizontalSMS">
                                    <Form.Label column sm={2}>
                                        SMS 
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control ref={this.sms} onChange={() => this.needSave()} placeholder="SMS" defaultValue={this.props.user.sms} />
                                    </Col>
                                </Form.Group>

                            </Card.Body>
                        </Card>
                    </Form>
                </div>
            </div>
        )
    }
}

interface IM_MonkeyPicture_Props {
    show: boolean;
    user: ImMonkeyData_Users;
    onTakePhoto: Function;
    toggleSelfie: Function;
}

interface IM_MonkeyPicture_State {}

class MonkeyPicture extends React.Component<IM_MonkeyPicture_Props, IM_MonkeyPicture_State> {
    render() {
        return (
            <Modal size="lg" show={this.props.show} animation centered onHide={() => { this.props.toggleSelfie() }}>
                <Modal.Header translate closeButton >
                    <Image fluid roundedCircle style={{ width: "40px", height: "40px" }} src={'./images/users/' + this.props.user.user_id + '.jpg'} />
                    <span style={{ visibility: "hidden" }}>X</span>
                    <Modal.Title>{this.props.user.name + "'s new selfie"} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Camera
                        onTakePhoto={(dataUri: any) => { this.props.onTakePhoto(dataUri); }}
                        imageType={IMAGE_TYPES.JPG}
                        imageCompression={0.97}
                        isMaxResolution={false}
                    />
                </Modal.Body>
            </ Modal>
        )
    }
}


export default User;
