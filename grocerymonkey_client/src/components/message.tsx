import React from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
const monkeyDir: string = '/images/monkey';


interface Im_MonkeyMessage_Props {
    show: boolean;
    monkeyDanceToggle: any;
    logOff: any;
}

interface Im_MonkeyMessage_State {
    monkeyImage: string;
}


class MonkeyMessage extends React.Component<Im_MonkeyMessage_Props, Im_MonkeyMessage_State> {
    constructor(props: Im_MonkeyMessage_Props) {
        super(props);
        this.state = { monkeyImage: ''};
        this.getMonkeyImage = this.getMonkeyImage.bind(this);
    }

    getMonkeyImage(): string {
        var monkeyImageString: string;
        var monkeyImageDirLength: number = 1;
        monkeyImageString = monkeyDir + '/monkey' + Math.floor(1+(Math.random() * monkeyImageDirLength)).toString() + '.gif';
        return monkeyImageString;
    }

    componentDidMount() {
        this.setState(() => { return { monkeyImage: this.getMonkeyImage() } });
    }

    render() {
        return (
            <div style={{width:"90%",height:"50%"}}>
                <Modal animation centered show={this.props.show} >
                        <Modal.Header translate>
                            <Modal.Title>You are a Grocery Monkey!</Modal.Title>
                        </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                        <div style={{ width: "100%}" }}>
                            <Image fluid roundedCircle src={this.state.monkeyImage} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.monkeyDanceToggle}>
                            More Monkey Stuff
                        </Button>
                        <Button variant="primary" onClick={this.props.logOff}>
                            No More Monkey
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default MonkeyMessage;
