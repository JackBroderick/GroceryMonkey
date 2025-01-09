import React from 'react';
import { Navbar, Nav, NavItem, Form, InputGroup, ListGroup, Button, Image, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './main.css';
import { getAllMonkeyData, updateMonkeyData } from '../functions/fetchfunctions';
import MonkeyMessage from './message';
import MonkeyRace from './monkeyrace';
import MonkeyItemPhoto from './itemphoto';
import { ImMonkeyData, ImMonkeyData_State, ImMonkeyData_Lookup, ImMonkeyData_Status, ImMonkeyData_Users, ImMonkeyData_UpdateParams, ImEmojiLookup, IM_emoji, emojiModeConstants } from '../constants/constants';
// @ts-ignore
import Camera, { IMAGE_TYPES, FACING_MODES } from 'react-html5-camera-photo';
import { ItemEmojiConfig } from './itemconfig';
const emoji = require('node-emoji');
const emojiRegex = require('emoji-regex');
const dateFormat = require('dateformat');

interface IMyuiInterface {
    updateUser: boolean;
    monkeyChange: boolean;
    monkeyLoaded: boolean;
    showCamera: boolean;
    photoTaken: boolean;
    itemPhoto: any;
    itemStatusList: Array<ImMonkeyData_Status>;
    distinctItems: Array<ImMonkeyData_Lookup>;
    users: Array<ImMonkeyData_Users>;
    emojiLookup: Array<ImEmojiLookup>;
};

interface IMyPropsInterface {
    isAuthenticated: boolean;
    user: ImMonkeyData_Users;
    logOff():void;
};

interface IMyStateInterface {
    isAuthenticated: boolean;
    user: ImMonkeyData_Users;
    ui: IMyuiInterface;
    monkeyData: Array<ImMonkeyData_State>;
    monkeyDance: boolean;
    monkeyRace: boolean;
    monkeyItemPhoto: any;
    emojiConfig: boolean;
    selectedEmoji: ImMonkeyData_Lookup;
    selectedEmojiIndex: number;
};

class Main extends React.Component<IMyPropsInterface, IMyStateInterface> {
    private newItem: any;
    private addItem: any;
    constructor(props: IMyPropsInterface) {
        super(props);
        this.state = {
            isAuthenticated: props.isAuthenticated,
            user: props.user,
            monkeyDance: false,
            monkeyRace: false,
            monkeyItemPhoto:null,
            ui: {
                updateUser: false,
                monkeyChange: false,
                monkeyLoaded: false,
                showCamera: false,
                photoTaken: false,
                itemPhoto: null,
                itemStatusList: [],
                distinctItems: [],
                users: [],
                emojiLookup: [],
            },
            monkeyData: [],
            emojiConfig: false,
            selectedEmoji: { item: "", code: "" },
            selectedEmojiIndex: -1,
        }
        this.newItem = React.createRef();
        this.addItem = React.createRef();
        this.monkeyItemAction = this.monkeyItemAction.bind(this);
        this.monkeyItemAction_Do = this.monkeyItemAction_Do.bind(this);
        this.lookupStatus = this.lookupStatus.bind(this);
        this.addMonkeyItem = this.addMonkeyItem.bind(this);
        this.monkeyDo = this.monkeyDo.bind(this);
        this.monkeyAll = this.monkeyAll.bind(this);
        this.monkeyDanceToggle = this.monkeyDanceToggle.bind(this);
        this.monkeyRaceToggle = this.monkeyRaceToggle.bind(this);
        this.getBananaCount = this.getBananaCount.bind(this);
        this.onTakePhoto = this.onTakePhoto.bind(this);
        this.toggleCamera = this.toggleCamera.bind(this);
        this.getEmojiMatch = this.getEmojiMatch.bind(this);
        this.changeEmoji = this.changeEmoji.bind(this);
        this.changeSelectedEmoji = this.changeSelectedEmoji.bind(this);
        this.changeMonkeyQuantity = this.changeMonkeyQuantity.bind(this);

    }

    changeMonkeyQuantity(monkeyIndex: number, increment: number) {
        let newMonkeyDataState: Array<ImMonkeyData_State> = this.state.monkeyData;
        let newMonkeyUI: IMyuiInterface = this.state.ui;
        let newItemCount: number = this.state.monkeyData[monkeyIndex].itemCount + increment;
        if (newItemCount > 1) {
            newMonkeyDataState[monkeyIndex].itemCount = newItemCount
        } else {
            newMonkeyDataState[monkeyIndex].itemCount = 1
        }
        newMonkeyDataState[monkeyIndex].itemChanged = true;
        let statusLookup: ImMonkeyData_Status | undefined = this.state.ui.itemStatusList.find((e: ImMonkeyData_Status) => (e.status_active));
        if (!this.state.monkeyData[monkeyIndex].itemNew) {
            newMonkeyDataState[monkeyIndex].itemActionType = statusLookup ? statusLookup.action_type : 0
        }
        newMonkeyUI.monkeyChange = true;
        this.setState(() => ({
            monkeyData: newMonkeyDataState,
            ui: newMonkeyUI,
        }))
    }

    getEmojiMatch(itemName: string): string {
        let matchEmoji: ImMonkeyData_Lookup | undefined = this.state.ui.distinctItems.find((item)=>(item.item===itemName))        
        if (matchEmoji) {
            return matchEmoji.code;
        } else {
            let itemName_lcase: string = itemName.toLowerCase();
            if (itemName_lcase.substr(itemName_lcase.length - 1) === 's') { itemName_lcase = itemName_lcase.slice(0, -1) }
            let emojiLookupMatch: ImEmojiLookup | undefined = this.state.ui.emojiLookup.find((item) => (itemName_lcase.includes(item.key)));

            if (emojiLookupMatch) {
                return emojiLookupMatch.code;
            } else {
                let searchList: Array<IM_emoji> = emoji.search(itemName_lcase);
                if (searchList.length) {
                    return ':' + searchList[0].key + ':';
                } else {
                    return ':shopping_trolley:';
                }
            }
        }

    }

    onTakePhoto(dataURI: any): void {
        let tempUI: IMyuiInterface = this.state.ui;
        tempUI.photoTaken = true;
        tempUI.itemPhoto = dataURI;
        tempUI.showCamera = false;
        this.setState(() => { return { ui: tempUI } })
    }

    getBananaCount(user_id: number): number | undefined {
        var lookupUserBananas: Array<ImMonkeyData_Users>;
        lookupUserBananas = this.state.ui.users.filter((el) => (el.user_id === user_id));
        if (lookupUserBananas.length) {
            return lookupUserBananas[0].banana_count;
        } else {
            return 0;
        }
    }

    lookupStatus(status: string): any {
        var lookupStatus: Array<ImMonkeyData_Status>;
        lookupStatus = this.state.ui.itemStatusList.filter((el) => (el.statusID === parseInt(status)));
        return lookupStatus.length ? {
            actionType: lookupStatus[0].action_type,
            status: lookupStatus[0].status,
            status_verb: lookupStatus[0].status_verb,
            status_active: lookupStatus[0].status_active,
        }
            : { actionType: 0, status: 0, status_verb:'', status_active: false };
    }


    monkeyItemAction(event: any, eventitemOrdinal: number): void {
        event.preventDefault();
        this.monkeyItemAction_Do(event.target.value, eventitemOrdinal);
    }


    monkeyItemAction_Do(eventVal: string, eventitemOrdinal: number): void {
        const itemOrdinal: number = eventitemOrdinal;
        var newState: Array<ImMonkeyData_State> = this.state.monkeyData;
        var lookupObj: any = this.lookupStatus(eventVal);

        //console.log(lookupObj);
        newState[itemOrdinal].itemActionType = lookupObj.actionType;
        newState[itemOrdinal].itemStatus = lookupObj.status;
        newState[itemOrdinal].itemStatusID = parseInt(eventVal);
        newState[itemOrdinal].itemStatusVerb = lookupObj.status_verb;
        newState[itemOrdinal].itemStatusActive = lookupObj.status_active;
        newState[itemOrdinal].itemUserID = this.state.user.user_id;
        newState[itemOrdinal].itemUserName = this.state.user.name;
        newState[itemOrdinal].itemChanged = true;

        this.setState(() => {
            return {
                monkeyData: newState, ui: {
                    updateUser: this.state.ui.updateUser,
                    itemStatusList: this.state.ui.itemStatusList,
                    distinctItems: this.state.ui.distinctItems,
                    users: this.state.ui.users,
                    monkeyChange: true,
                    monkeyLoaded: true,
                    showCamera: false,
                    photoTaken: false,
                    itemPhoto: null,
                    emojiLookup: this.state.ui.emojiLookup,
                } } });
    }


    getMonkeyData(): void {
        const getMonkeyDataCB = (mData: ImMonkeyData) => {
            var new_monkeyData: Array<ImMonkeyData_State> = [];
            for (var i = 0; i < mData.groceryListItems.length; i++) {
                new_monkeyData.push(
                    {
                        itemNew: false,
                        itemActionType: 0,
                        itemID: mData.groceryListItems[i].grocery_list_id,
                        itemDate: mData.groceryListItems[i].date,
                        itemName: mData.groceryListItems[i].item,
                        itemCount: mData.groceryListItems[i].count,
                        itemCode: mData.groceryListItems[i].code,
                        itemNotes: mData.groceryListItems[i].notes,
                        itemStatusID: mData.groceryListItems[i].status_id,
                        itemStatus: mData.groceryListItems[i].status,
                        itemStatusVerb: mData.groceryListItems[i].status_verb,
                        itemStatusActive: mData.groceryListItems[i].status_active,
                        itemUserID: mData.groceryListItems[i].user_id,
                        itemUserName: mData.groceryListItems[i].username,
                        itemChanged: false,
                        itemPhoto: mData.groceryListItems[i].photo,
                        itemPhotoURI: mData.groceryListItems[i].photo_location,
                    }
                )
            }
            const new_ui: IMyuiInterface = {
                updateUser: false,
                monkeyChange: false,
                monkeyLoaded: true,
                showCamera: false,
                photoTaken: false,
                itemPhoto: null,
                itemStatusList: mData.groceryItemStatus,
                distinctItems: mData.distinctGroceryListItems,
                users: mData.users,
                emojiLookup: mData.emojilookup,
            };
            this.setState(() => { return { monkeyData: new_monkeyData, ui: new_ui } });
        }
        getAllMonkeyData(this.state.isAuthenticated, getMonkeyDataCB.bind(this));
    }

    addMonkeyItem(newItemString:string) {
        if (newItemString.length > 0 || this.state.ui.photoTaken) {
            let newItemStringTest: string = newItemString.length ? newItemString : "Photo Only";
            var newItemDetails: Array<string> = newItemStringTest.split(',');
            var newMonkeyItemList: Array<ImMonkeyData_State> = this.state.monkeyData;
            var newItemStrip: string = '';
            var newItem: string = '';
            var newQuantity: number = 0;
            var newNotes: string = '';

  //        var regex: RegExp = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

            let regex: RegExp = emojiRegex();

            newItemStrip = newItemDetails[0].replace(regex,'');
            newItem = newItemStrip.charAt(0).toUpperCase() + newItemStrip.slice(1).toLowerCase();

            if (newItemDetails.length === 2) { newItemDetails[1].length ? newQuantity = parseInt(newItemDetails[1]):newQuantity = 0 }
            else if (newItemDetails.length === 3) { newQuantity = parseInt(newItemDetails[1]); newNotes = newItemDetails[2] }

            newMonkeyItemList.push({
                itemNew: true,
                itemName: newItem,
                itemCount: newQuantity,
                itemNotes: newNotes,
                itemStatusID: 1,
                itemStatus: "NEW",
                itemStatusVerb: 'NEEDS',
                itemStatusActive: true,
                itemActionType: 1,
                itemUserID: this.state.user.user_id,
                itemUserName: this.state.user.name,
                // itemCode: searchEmoji(newItem),
                itemCode: this.getEmojiMatch(newItem),
                itemDate: dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),
                itemID: 0,
                itemChanged: false,
                itemPhoto: this.state.ui.photoTaken,
                itemPhotoURI: this.state.ui.photoTaken ? this.state.ui.itemPhoto : null,
            })

            this.newItem.getInstance().clear();
            this.setState(() => {
                return {
                    monkeyData: newMonkeyItemList,
                    ui: {
                        updateUser: this.state.ui.updateUser,
                        itemStatusList: this.state.ui.itemStatusList,
                        distinctItems: this.state.ui.distinctItems,
                        users: this.state.ui.users,
                        monkeyChange: true,
                        monkeyLoaded: true,
                        showCamera: false,
                        photoTaken: false,
                        itemPhoto: null,
                        emojiLookup: this.state.ui.emojiLookup,
                    }
                }
            })  
        }
    }

    monkeyDo(): void {
        if (this.state.ui.monkeyChange) {
            var monkeyDataVar: ImMonkeyData_UpdateParams = { userName: this.state.user.name, userID: this.state.user.user_id, monkeyData: this.state.monkeyData };
            console.log(monkeyDataVar);
            updateMonkeyData(monkeyDataVar, (success: boolean) => {
                if (success) {
                    this.getMonkeyData();
                    this.setState(() => { return { monkeyDance: true } })
                } else {
                    alert('Error updating database');
                }
            })
        } else {
            this.props.logOff();
        }
    }

    monkeyAll(): void {
        var newMonkeyState: Array<ImMonkeyData_State> = this.state.monkeyData;
        for (var i: number = 0; i < newMonkeyState.length; i++) {
            var monkeyAllStatus: number = this.state.ui.itemStatusList[this.state.ui.itemStatusList.length - 1].statusID;
            var lookupObj: any = this.lookupStatus(monkeyAllStatus.toString());

            newMonkeyState[i].itemActionType = lookupObj.actionType;
            newMonkeyState[i].itemStatus = lookupObj.status;
            newMonkeyState[i].itemStatusID = monkeyAllStatus;
            newMonkeyState[i].itemStatusVerb = lookupObj.status_verb;
            newMonkeyState[i].itemStatusActive = lookupObj.status_active;
            newMonkeyState[i].itemUserID = this.state.user.user_id;
            newMonkeyState[i].itemUserName = this.state.user.name;
            newMonkeyState[i].itemChanged = true;
        }

        this.setState(() => {
            return {
                monkeyData: newMonkeyState, ui: {
                    updateUser: this.state.ui.updateUser,
                    itemStatusList: this.state.ui.itemStatusList,
                    distinctItems: this.state.ui.distinctItems,
                    users: this.state.ui.users,
                    monkeyChange: true,
                    monkeyLoaded: true,
                    showCamera: false,
                    photoTaken: false,
                    itemPhoto: null,
                    emojiLookup: this.state.ui.emojiLookup,
                } } });
    }

    toggleCamera(arg:boolean) {
        let newUI: IMyuiInterface = this.state.ui;
        newUI.showCamera = arg;
        newUI.photoTaken = false;
        newUI.itemPhoto = null;
        this.setState(() => {
            return {ui:newUI}
            }
        )
    }

    changeSelectedEmoji(itemIndex: number): void {
        if (itemIndex >= 0) {
            this.setState(() => (
                {
                    emojiConfig: true,
                    selectedEmoji: { code: this.state.monkeyData[itemIndex].itemCode, item: this.state.monkeyData[itemIndex].itemName },
                    selectedEmojiIndex: itemIndex,
                }
            ))
        }
    }

    changeEmoji(newEmoji: IM_emoji): void {
        let newMonkeyData_State: Array<ImMonkeyData_State> = this.state.monkeyData;
        newMonkeyData_State[this.state.selectedEmojiIndex].itemCode = ':' + newEmoji.key + ':'
        this.setState(() => (
            {
                emojiConfig: false,
                monkeyData: newMonkeyData_State,
                selectedEmoji: { code: "", item: "" },
                selectedEmojiIndex: -1,
            }
        ))

    }

    monkeyDanceToggle() {
        this.setState(() => { return { monkeyDance: !this.state.monkeyDance } })
    }

    monkeyRaceToggle() {
        this.setState(() => { return { monkeyRace: !this.state.monkeyRace } })
    }

    componentDidMount() {
        this.getMonkeyData();
    }

    render() {
        return (    
            <div className="Main" style={{display:"inline-block"}}>
                <MonkeyMessage show={this.state.monkeyDance} monkeyDanceToggle={this.monkeyDanceToggle} logOff={this.props.logOff} />
                <MonkeyRace show={this.state.monkeyRace} users={this.state.ui.users} monkeyRaceToggle={this.monkeyRaceToggle} logOff={this.props.logOff} />
                <MonkeyItemPhoto itemPhotoLocation={this.state.monkeyItemPhoto} showItemToggle={() => { this.setState(() => { return { monkeyItemPhoto: null } })}}/>
                <ItemEmojiConfig show={this.state.emojiConfig} toggleEmojiConfig={() => { this.setState(() => ({ emojiConfig: !this.state.emojiConfig })) }} mode={emojiModeConstants.select} selectedItem={this.state.selectedEmoji} selectNewEmoji={this.changeEmoji}/>
                <Navbar fixed="top" sticky="top" bg="light" expand="xl" style={{ textAlign: "left", verticalAlign: "middle", flexDirection: "row" }} onToggle={() => { this.toggleCamera(false) }} >
                    <Navbar.Brand  >
                        <Image
                            src="/images/favicon.ico"
                            style={{ width: "30px", height: "30px", cursor: "pointer" }}
                            onClick={() => (this.props.logOff())}
                        />
                        <span style={{ visibility: "hidden" }}>X</span>
                        <label>{'   Grocery Monkey - ' + this.state.user.name}</label>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ width: "100%" }}>
                        <div style={{ width: "100%", display: "flex", textAlign: "left", float: "left", clear:"left" }}>
                            <InputGroup style={{ width: "100%" }}>
                                <InputGroup.Prepend>
                                    < Button variant={this.state.ui.photoTaken ? "primary" : "outline-primary"} onClick={() => { this.toggleCamera(!this.state.ui.showCamera); }} >
                                        {emoji.emojify(this.state.ui.photoTaken ? ":camera_with_flash:" : ":camera:")}

{/* Uses picture in lieu of emoji
                                        <Image
                                            roundedCircle
                                            src="/images/camera.png"
                                            style={{ width: "20px", height: "20px", cursor:"pointer" }}
                                        />
*/}


                                    </Button>
                                </InputGroup.Prepend>
                                <Typeahead                                              
                                        id="groceryTypeahead"
                                        selectHintOnEnter
                                        options={this.state.ui.distinctItems.map((el: any, k: number) => { return emoji.emojify(el.code) + el.item })}
                                        placeholder="Item, Quantity, Notes"
                                        clearButton
                                        labelKey="item"
                                        emptyLabel=""
                                        ref={(typeahead: any) => this.newItem = typeahead}
                                />
                                <InputGroup.Append>
                                    {/*< Button variant="outline-info" ref={this.addItem} onClick={() => (this.addMonkeyItem(this.newItem.getInstance().getInput().value))}> {emoji.emojify(":fork_and_knife:")}</Button>*/}
                                    < Button variant="outline-success" ref={this.addItem} onClick={() => (this.addMonkeyItem(this.newItem.getInstance().getInput().value))} >{emoji.emojify(":heavy_plus_sign:")}</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                <div >
                    {this.state.ui.showCamera ?
                        <div style={{ width: "100%", height: "25%" }}>
                            <Camera
                                onTakePhoto={(dataUri: any) => { this.onTakePhoto(dataUri); }}
                                imageType={IMAGE_TYPES.JPG}
                                imageCompression={0.97}
                                isMaxResolution={false}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                isDisplayStartCameraError={true}
                                isImageMirror={false}
                            />
                            <br />
                        </div>

                        : null
                    }             
                    {this.state.monkeyData.length ?
                        <ListGroup style={{width:"100%"}}>
                            {this.state.monkeyData.map((item: ImMonkeyData_State, i: number) => {
                                return (
                                    <ListGroupItem key={i} style={{ display: "flex", width: "100%", alignItems: "center", backgroundColor: this.state.monkeyData[i].itemChanged ? "Gainsboro" : "Transparent" }}>
                                        <div style={{width:"100%", display:"inline-block"}}>
                                            <div
                                                style={{
                                                    width: "20%",
                                                    textAlign: "center",
                                                    display: "inline-block",
                                                    backgroundColor: "Transparent",
                                                    cursor: item.itemPhoto ? "pointer" : "default",
                                                }}
                                            >
                                                <Image className="list_profile_img"
                                                    src={item.itemPhoto ?
                                                        item.itemNew ? item.itemPhotoURI : './images/items/' + item.itemPhotoURI + '.jpg'
                                                        : './images/users/' + item.itemUserID + '.jpg#' + new Date().getTime()}
                                                    roundedCircle
                                                    onClick={() => {
                                                        this.setState(() => {
                                                            return {
                                                                monkeyItemPhoto: item.itemPhoto ?
                                                                    item.itemNew ? item.itemPhotoURI : './images/items/' + item.itemPhotoURI + '.jpg'
                                                                    : './images/users/' + item.itemUserID + '.jpg#' + new Date().getTime()
                                                            }
                                                        })
                                                    }}
                                                    style={{height:"60px", width:"60px"}}
                                                />
                                                <br />
                                                {item.itemUserName}
                                            </div>
                                            <div style={{ width: "10%", textAlign: "center", display: "inline-block", verticalAlign:"top" }}>
                                                <label style={{ cursor: "pointer" }} onClick={() => { this.changeSelectedEmoji(i) }}>
                                                    {emoji.emojify(item.itemCode)}
                                                </label>
                                            </div>
                                            <div style={{ width: "70%", textAlign: "left", display: "inline-block", verticalAlign:"top" }}>  
                                                <label style={{ cursor: "pointer", display:"inline-block", width:"100%" }}  >
                                                    <span style={{ fontWeight: "bold", wordWrap:"break-word" }} onClick={!this.state.monkeyData[i].itemNew ? () => { this.monkeyItemAction_Do((this.state.ui.itemStatusList.length).toString(), i) } : () => { }}>{item.itemName}</span>
                                                    <br />
                                                    Quantity: <span style={{ fontWeight: "bold", display:"inline" }}>{item.itemCount ? item.itemCount : "1"}</span>
                                                    <span style={{ visibility: "hidden" }}>XXX</span>
                                                    <label style={{ display: "inline" }} onClick={() => { this.changeMonkeyQuantity(i,1)}}>{emoji.emojify(":heavy_plus_sign:")}</label>
                                                    <span style={{ visibility: "hidden" }}>X</span>
                                                    <label style={{ display: "inline" }} onClick={() => { this.changeMonkeyQuantity(i,-1)}}>{item.itemCount > 1 ? emoji.emojify(":heavy_minus_sign:") : ""}</label>
                                                    <br />
                                                    Notes: <span style={{fontWeight:"bold", wordWrap:"break-word", display:"inline"}}>{item.itemNotes}</span>
                                                </label>
                                            </div>
                                            <div style={{ width: "100%", textAlign: "right" }}>
                                                <div style={{ width: "63%", textAlign: "center", display: "inline-block" }}>
                                                    <span style={{ fontWeight: "bold" }}>
                                                        <i>
                                                            {this.state.monkeyData[i].itemChanged ? this.state.monkeyData[i].itemUserName + " " + this.state.monkeyData[i].itemStatusVerb + " it!": ""}
                                                        </i>
                                                    </span>
                                                </div>
                                                <div style={{ width: "37%", display: "inline-block"}}>
                                                    <Form>
                                                        <Form.Control style={{ width: "100%", textAlign:"center", textAlignLast:"center" }} as="select" value={item.itemStatusID.toString()} onChange={(event: any) => this.monkeyItemAction(event, i)} >
                                                            {this.state.ui.itemStatusList.filter((el) => {
                                                                const isSame: boolean = (this.state.user.user_id === item.itemUserID) || el.action_sameuser;
                                                                return (item.itemNew ? el.action_new && isSame : isSame)
                                                            })
                                                                .map((lookup_item: ImMonkeyData_Status, k: number) => {
                                                                    return <option key={k} value={lookup_item.statusID.toString()} > {lookup_item.status}</option>
                                                                })}
                                                        </Form.Control>
                                                    </Form>    
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                        : this.state.ui.monkeyLoaded && !this.state.ui.showCamera ?
                            <div style={{ width: "100%", alignContent: "center", textAlign:"center" }}>
                                <br /><br />
                                <Image id="sad_fridge" src='./images/sad_fridge.gif' />
                                <h4><i>Ain't nobody need nothin....</i></h4>
                           </div>
                            :null
                        }
                        <br /><br/>
                    </div>
                    <Navbar bg="dark" variant="dark" sticky="bottom" fixed="bottom" >
                            <Nav style={{ textAlign: "left", width: "32%" }}>
                                <div style={{ width: "100%", verticalAlign: "center" }}>
                                    <NavItem as={Link} to='/user'>
                                        <Image
                                    alt=""
                                    src={'./images/users/' + this.state.user.user_id + '.jpg#' + new Date().getTime()}
                                            width="40"
                                            height="40"
                                            className="profile_Image"
                                            roundedCircle                              
                                        />
                                    </NavItem>
                                    <span style={{ visibility: "hidden" }}>X</span>
                                    <span style={{ color: "white", fontWeight: "bold", cursor:"pointer" }} onClick={()=>(this.monkeyRaceToggle())} >
                                        {emoji.emojify(":banana:") + '(' + this.getBananaCount(this.state.user.user_id) + ')'}
                                    </span>                           
                                </div>
                            </Nav>
                            <Nav style={{ textAlign:"right",width:"68%" }}>
                                <div style={{ width: "100%", textAlign: "right" }}>
                                    <Button variant="light" onClick={() => this.monkeyAll()}>Monkey All</Button>
                                    <span>{"  "}</span>
                                    <Button variant="light" onClick={() => this.monkeyDo()} >
                                        {this.state.ui.monkeyChange? 'Monkey Do' : 'Logoff'}
                                    </Button>
                                </div>
                            </Nav>
                        </Navbar>
                    </div> 
        )
    }   
}

export default Main;