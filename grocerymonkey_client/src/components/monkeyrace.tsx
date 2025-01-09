import React from 'react';
import { Button, Modal, Image, ListGroup, ListGroupItem, Tabs, Tab } from 'react-bootstrap';
import { ImMonkeyData_Users, ImMonkeyBanana_History } from '../constants/constants';
import { getBananaWinnerHistory } from '../functions/fetchfunctions';
import { getBananaMoochHistory } from '../functions/fetchfunctions';
const emoji = require('node-emoji');
const dateFormat = require('dateformat');



interface Im_MonkeyMessage_Props {
    show: boolean;
    monkeyRaceToggle: any;
    users: Array<ImMonkeyData_Users>;
    logOff: any;
}

interface Im_MonkeyMessage_State {
    monkeyImage: string;
    monkeyMonth: string;
    bananaHistory: Array<ImMonkeyBanana_History>;
}

class MonkeyRace extends React.Component<Im_MonkeyMessage_Props, Im_MonkeyMessage_State> {
    constructor(props: Im_MonkeyMessage_Props) {
        super(props);
        this.state = {
            monkeyImage: './images/monkey/monkey_running.gif',
            monkeyMonth: dateFormat(new Date(), 'mmmm'),
            bananaHistory: [],
        };
        this.getBananas = this.getBananas.bind(this);
        this.getBananaHistory = this.getBananaHistory.bind(this);
    }

    getBananas(bananaCount: number|undefined): string {
        let bananaCountString: string = '';
        if (bananaCount) {
            for (var i: number = 1; i <= bananaCount; i++) {
                bananaCountString = bananaCountString + emoji.emojify(":banana:");
            }
            return bananaCountString;
        } else {
            return '';
        }
    }

    getBananaHistory(eventKey:string | null): void {
        const callback = (bananaData: Array<ImMonkeyBanana_History>): void => {
            this.setState(() => { return { bananaHistory: bananaData } })
        }
        if (eventKey === "monkeys") {
            getBananaWinnerHistory(callback.bind(this));
        } else if (eventKey === "mooches") {
            getBananaMoochHistory(callback.bind(this));
        } else {
            this.setState(() => { return { monkeyMonth: dateFormat(new Date(), 'mmmm') } });
        }
    }

    render() {
        return (
            <div style={{width:"90%",height:"95%"}}>
                <Modal animation scrollable centered show={this.props.show} >
                    <Modal.Header translate>
                        <Modal.Title>
                            <Image fluid roundedCircle width="60" height="60" src={this.state.monkeyImage} />
                            {'The Monkey Race!'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>
                        <Tabs defaultActiveKey="current" id="main_tab" onSelect={(eventKey: string |null , e: React.SyntheticEvent<unknown>) => { this.getBananaHistory(eventKey) }}>
                            <Tab eventKey="current" title={this.state.monkeyMonth}>
                                <div style={{ width: "100%}" }}>
                                    <ListGroup>
                                        {this.props.users.map((user: ImMonkeyData_Users, i: number) => {
                                            return (
                                                <ListGroupItem key={i} style={{ display: "flex", alignItems: "center" }}>
                                                    <div style={{ width: "20%", textAlign: "center", display: "inline-block"}}>
                                                        <Image width="40" height="40" src={'./images/users/' + user.user_id + '.jpg'} roundedCircle />
                                                        <br />
                                                        {user.name}
                                                    </div>
                                                    <div style={{ width: "80%", textAlign: "left", display: "inline-block" }}>
                                                        {'Banana Count: (' + user.banana_count + ')  ' + this.getBananas(user.banana_count)}
                                                    </div>
                                                </ListGroupItem>
                                            )
                                        })}
                                    </ListGroup>
                                </div>
                            </Tab>
                            <Tab eventKey="monkeys" title="Monkeys" >
                                <MonkeyTab label="Bananas" emoji=":banana:" gif_image="./images/star.gif" data={this.state.bananaHistory} />
                            </Tab>
                            <Tab eventKey="mooches" title="Mooches" >
                                <MonkeyTab label="Requests" emoji=":speak_no_evil:" gif_image="./images/question.gif" data={this.state.bananaHistory} />
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.monkeyRaceToggle}>
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

interface IM_MonkeyTab_Props {
    label: string;
    emoji: string;
    gif_image: string;
    data: Array<ImMonkeyBanana_History>;
}

class MonkeyTab extends React.Component<IM_MonkeyTab_Props, {}> {
    render() {
        return (
            <div style={{ width: "100%" }}>
                <ListGroup>
                    {this.props.data.map((bananaHistory: ImMonkeyBanana_History, i: number) => {
                        return (
                            <ListGroupItem key={i} style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "22%", textAlign: "center", display: "inline-block" }}>
                                    <Image width="50" height="50" src = {this.props.gif_image} />
                                    <br />
                                    {dateFormat(new Date(bananaHistory.banMonth), 'mmmm')}
                                </div>
                                <div style={{ width: "32%", textAlign: "center", display: "inline-block", cursor:"pointer" }}>
                                    <Image width="40" height="40" src={'./images/users/' + bananaHistory.banUserID + '.jpg'} roundedCircle />
                                    <br />
                                    {bananaHistory.banUserName}
                                </div>
                                <div style={{ width: "46%", textAlign: "center", display: "inline-block" }}>
                                    {this.props.label + ': ' + emoji.emojify(this.props.emoji) + "(" + bananaHistory.banCount + ")"}
                                </div>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </div>
        )
    }
}

export default MonkeyRace;
