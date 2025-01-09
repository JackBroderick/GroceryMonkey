import React, { FunctionComponent, useState, useEffect, useRef, ReactElement, useCallback } from 'react';
import { ListGroup, InputGroup, Form, Modal, Button } from 'react-bootstrap';
import { ImMonkeyData, ImMonkeyData_Lookup, emojiModeConstants, IM_emoji, ImEmojiLookup, ImMonkeyData_Status} from '../constants/constants';
import { getAllMonkeyData, updateGroceryItem, deleteGroceryItem, getEmojiLookup, createEmojiLookup, deleteEmojiLookup, updateGroceryItemStatus } from '../functions/fetchfunctions';
import { ListGroupItem } from 'react-bootstrap';
const emoji = require('node-emoji');


interface Im_emojiProps {
    show: boolean;
    toggleEmojiConfig: Function;
    selectedItem: ImMonkeyData_Lookup;
    mode: number;
    selectNewEmoji?: Function;
}

export const ItemCleanup: FunctionComponent<{ isAuthenticated: boolean }> = function ({ isAuthenticated }): React.ReactElement {

    const initialItems: Array<ImMonkeyData_Lookup> = [];
    const initialSelectedItem: ImMonkeyData_Lookup = {item:"",code:""};
    const initialFilter: string = "";

    const filterRef = useRef<HTMLInputElement>(null);
    const updateRef = useRef<HTMLInputElement>(null);

    const [loading, updateloading] = useState(true);
    const [groceryItems, updategroceryItems] = useState(initialItems);
    const [filterString, updatefilterString] = useState(initialFilter);
    const [selectedItem, setselectedItem] = useState(initialSelectedItem);
    const [selectItemChange, setSelectedItemChange] = useState(false);
    const [show_emoji, toggle_emoji] = useState(false);

    const getItems: Function = useCallback(() => {
        getAllMonkeyData(isAuthenticated, (resultJSON: ImMonkeyData) => {
            if (resultJSON) {
                updategroceryItems(resultJSON.distinctGroceryListItems);
                setselectedItem(initialSelectedItem);
            } else {
                updategroceryItems([]);
            }
        })
    }, [isAuthenticated, initialSelectedItem])


    function updateItem() {
        if (updateRef.current) {
            let params: ImMonkeyData_Lookup = {
                item: selectedItem.item,
                code: selectedItem.code,
                itemUpdate: updateRef.current.value,
            }

            updateGroceryItem(params, (success:boolean) => {
                if (success) {
                    setselectedItem(initialSelectedItem);
                    getItems();
                } else {
                    alert("Error updating grocery item");

                }

            })

        }
    }

    function deleteItem(item: ImMonkeyData_Lookup) {
        if (window.confirm("Delete " + item.item + " from the list of grocery items?\n\nThis cannot be undone")) {
            deleteGroceryItem(item, (success: boolean) => {
                if (success) {
                    setselectedItem(initialSelectedItem);
                    getItems();
                } else {
                    alert("Error deleting grocery item");
                }
            })
        }
    }

    useEffect(() => {
        if (loading) {
            updateloading(false);
            getItems();
        }
    }, [loading, getItems])

    useEffect(() => {
        if (updateRef.current) { updateRef.current.focus() }
    })

    return (
        <>
            {
                show_emoji
                    ? <ItemEmojiConfig show={show_emoji} toggleEmojiConfig={() => { getItems();toggle_emoji(!show_emoji) }} selectedItem={selectedItem} mode={emojiModeConstants.modify} />
                    : <></>
            }

            <div style={{ width: "100%" }}>
                <br />
                <InputGroup >
                    <Form.Control ref={filterRef} onChange={() => { setselectedItem(initialSelectedItem); if (filterRef.current) { updatefilterString(filterRef.current.value) } }} placeholder="Enter Filter Criteria" />
                    <InputGroup.Append>
                        <InputGroup.Text onClick={() => { if (filterRef.current) { updatefilterString(""); filterRef.current.value = "" } }} style={{ cursor: "pointer" }}>
                            X
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <br />
            {
                groceryItems.length
                    ?
                    <ListGroup style={{ width: "100%" }} variant="flush">
                        {
                            groceryItems.filter((el: ImMonkeyData_Lookup) => {
                                let regexMatch: RegExp = new RegExp("\\b" + filterString, "i")
                                return (regexMatch.test(el.item))
                            })
                                .map((item: ImMonkeyData_Lookup, i: number) => (
                                    <ListGroupItem key={i} style={{ display: "flex", width: "100%", alignItems: "center", backgroundColor: (JSON.stringify(selectedItem) === JSON.stringify(item)) ? "Gainsboro" : "Transparent" }} >
                                            <div style={{ width: "10%", textAlign: "left" }}>
                                                <label onClick={() => { setselectedItem(item); toggle_emoji(true) }} style={{ cursor: "pointer" }}>
                                                    {emoji.emojify(item.code)} 
                                                </label>
                                            </div>
                                            <div style={{ width: "78%", textAlign: "left" }} onClick={() => { setselectedItem(item); setSelectedItemChange(false) }}>
                                                {
                                                    (JSON.stringify(item) === JSON.stringify(selectedItem))
                                                        ? <input type="text" ref={updateRef} onChange={() => { if (updateRef.current && (selectedItem.item !== updateRef.current.value)) { setSelectedItemChange(true) } }} defaultValue={item.item} style={{ width: "100%", border: 0, backgroundColor: "Transparent", color: "darkblack" }} />
                                                        : <label><span style={{visibility:"hidden"}}>x</span>{item.item}</label>
                                                }
                                            </div>
                                            <div style={{ width: "10%", textAlign: "right" }}>
                                            {
                                                (JSON.stringify(item) === JSON.stringify(selectedItem))
                                                    ? selectItemChange
                                                        ?
                                                                <label onClick={() => { updateItem() }} style={{ cursor: "pointer" }} >
                                                                    { emoji.emojify(':floppy_disk:') }
                                                                </label>
                                                            : <></>

                                                        :
                                                            <label onClick={() => { deleteItem(item) }} style={{ cursor: "pointer" }}>
                                                                {emoji.emojify(':wastebasket:')}
                                                            </label>
                                                    }
                                            </div>
                                    </ListGroupItem>))
                        }
                    </ListGroup>
                    : <label>No Items</label>
            }    
        </>
    )
}


export const ItemEmojiConfig: FunctionComponent<Im_emojiProps> = function (props: Im_emojiProps): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null);
    const [emojiArray, searchemojiArray] = useState(emoji.search(""));

    function searchemojis(event: React.FormEvent): void {
        event.preventDefault();
        if (searchRef.current) {
            searchemojiArray(emoji.search(searchRef.current.value.toLowerCase()))
            searchRef.current.value = "";
            window.scrollTo(0, 0);
        }
    }

    function changeemoji(newemoji: IM_emoji): void {
        if (props.mode === emojiModeConstants.modify) {
            if (window.confirm("Make the following emoji change?\n\n" + props.selectedItem.item + ": " + newemoji.emoji)) {
                let params: ImMonkeyData_Lookup = {
                    item: props.selectedItem.item,
                    code: ":" + newemoji.key + ":",
                    itemUpdate: props.selectedItem.item,
                }

                updateGroceryItem(params, (success: boolean) => {
                    if (success) {
                        props.toggleEmojiConfig();
                    } else {
                        alert("Error updating grocery items");
                    }
                })

            }
        } else if(props.mode === emojiModeConstants.select){
            if (props.selectNewEmoji) { props.selectNewEmoji(newemoji) };
        }

    }

    return (
        <Modal size="lg" show={props.show} scrollable onHide={() => { props.toggleEmojiConfig() }}>
            <Modal.Header translate closeButton >
                <Modal.Title>
                    {
                        props.mode === emojiModeConstants.modify
                            ? props.selectedItem.item + ": " + emoji.emojify(props.selectedItem.code)
                            : "Select New emoji"
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    emojiArray.length
                        ?
                        emojiArray.map((el: IM_emoji, i: number) => (
                            <label key={i} style={{ fontSize: "40px", cursor: "pointer" }} onClick={() => { changeemoji(el) }} title={ el.key }>
                                    {el.emoji}
                            </label>
                                ))
                        :
                        <label>No matches found</label>
                }
            </Modal.Body>
            <Modal.Footer>
                <Form onSubmit={(event: React.FormEvent) => { searchemojis(event) }} >
                    <InputGroup >
                        <Form.Control ref={searchRef} placeholder="Enter Search Criteria" />
                        <InputGroup.Append>
                            <Button type="submit">
                                Search
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Modal.Footer>
        </ Modal>
    )
}

export const EmojiKeyPair: FunctionComponent = function (): ReactElement {

    const newRef = useRef<HTMLInputElement>(null);

    const initialnewKey: string= '';
    const initialEmojiKeyes: Array<ImEmojiLookup> = [];
    const initialSelectedemoji: IM_emoji = {emoji:'', key:''};

    const [newKey, updateNewKey] = useState(initialnewKey);
    const [emojiKeys, updateemojiKeys] = useState(initialEmojiKeyes);
    const [selectedEmoji, updateselectedEmoji] = useState(initialSelectedemoji);
    const [showEmojiSelect, updateShowEmojiSelect] = useState(false);

    function newEmojiPair(event: React.FormEvent): void {
        event.preventDefault();
        let params: ImEmojiLookup = {
            code: ':' + selectedEmoji.key + ':',
            key: newKey.toLowerCase(),
        }
        createEmojiLookup(params, (success: boolean) => {
            if (success) {
                if (newRef && newRef.current) { newRef.current.value = '' };
                updateselectedEmoji(initialSelectedemoji);
                getEmojiLookup_Keys();
            } else {
                alert("Error adding emoji lookup");
            }
        })
    }

    function deleteEmojiPair(emojiItem: ImEmojiLookup): void {
        if (window.confirm("Delete the below emoji lookup?\n\n" + emojiItem.key + ": " + emoji.emojify(emojiItem.code))) {
            deleteEmojiLookup(emojiItem, (success: boolean) => {
                if (success) {
                    getEmojiLookup_Keys();
                } else {
                    alert("Error deleting emoji lookup");
                }
            })
        }
    }

    function getEmojiLookup_Keys():void {
        getEmojiLookup((data:Array<ImEmojiLookup>) => {
            updateemojiKeys(data)
        })
    }

    function newKeyChange(): void {
        const newKeyString:string = newRef && newRef.current ? newRef.current.value : '';
        updateNewKey(newKeyString);
    }

    function selectedEmojiUpdate(newSelectedEmoji: IM_emoji): void {
        updateselectedEmoji(newSelectedEmoji);
        updateShowEmojiSelect(false);
    }

    useEffect(() => {
        getEmojiLookup_Keys();
    },[])

    return (
        <>
            <ItemEmojiConfig show={showEmojiSelect} toggleEmojiConfig={() => { updateShowEmojiSelect(!showEmojiSelect) }} selectedItem={{item:'', code:''}} mode={emojiModeConstants.select} selectNewEmoji={selectedEmojiUpdate}/>
            <div style={{ width: "100%" }}>
                <br />
                <Form onSubmit={(event: React.FormEvent) => { newEmojiPair(event) }} >
                    <InputGroup >
                        <InputGroup.Prepend>
                            <InputGroup.Text onClick={() => { updateShowEmojiSelect(true) }}>{selectedEmoji.emoji.length?selectedEmoji.emoji:'...'}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control ref={newRef} placeholder="Enter New emoji Key" onChange={() => { newKeyChange() }}/>
                        <InputGroup.Append>
                            <Button type="submit" disabled={newKey.length===0 || selectedEmoji.emoji.length===0}>
                                New
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <br />
            </div>
                {
                    emojiKeys.length
                        ?
                        <ListGroup style={{ width: "100%" }} variant="flush">
                            {

                                emojiKeys.map((el: ImEmojiLookup, i: number) => (
                                    <ListGroupItem key={i} style={{ display: "flex", width: "100%", alignItems: "center" }} >
                                        <div style={{ width: "10%", textAlign:"left" }}>
                                            {emoji.emojify(el.code)}
                                        </div>
                                        <div style={{ width: "78%", textAlign:"center" }}>
                                            {el.key}
                                        </div>
                                        <div style={{ width: "10%", textAlign:"right" }}>
                                            <label onClick={() => { deleteEmojiPair(el)}}>
                                                {emoji.emojify(':wastebasket:')}
                                            </label>
                                        </div>
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                        :
                        <label>No emoji Match Keys</label>
                }
        </>
    )
}

export const ItemsVerbs: FunctionComponent<{ isAuthenticated: boolean }> = function ({ isAuthenticated }): ReactElement {

    const itemInput = useRef<HTMLInputElement>(null);
    const verbInput = useRef<HTMLInputElement>(null);
    const initVerb: Array<ImMonkeyData_Status> = [];
    const [refresh, updaterefresh] = useState(true);
    const [verbs, getVerbs] = useState(initVerb);
    const [selectedIndex, updateselectedIndex] = useState(-1);
    const [verbChanged, updateverbChanged] = useState(false);

    function getEmojiType(actionType:number):string {
        switch (actionType) {
            case 2:
                return ":heavy_check_mark:"
            case 3:
                return ":x:";
            default:
                return ":question:";
        }
    }

    function updateVerb(verbIndex: number): void {
        let params: ImMonkeyData_Status = verbs[verbIndex];
        if (itemInput && itemInput.current) { params.status = itemInput.current.value }
        if (verbInput && verbInput.current) { params.status_verb = verbInput.current.value }
        updateGroceryItemStatus(params, (success: boolean) => {
            if (success) {
                updateselectedIndex(-1);
                updateverbChanged(false);
                updaterefresh(true);
            } else {
                alert("Error updating verb status");
            }
        })
    }

    useEffect(() => {
        if (refresh) {
            getAllMonkeyData(isAuthenticated, (resultJSON: ImMonkeyData) => {
                resultJSON ? getVerbs(resultJSON.groceryItemStatus) : getVerbs([])
            })
            updaterefresh(false);
        }
        }, [verbs, isAuthenticated, refresh])

    return (
        <div style={{ width: "100%", display: "block" }}>
            {verbs.length
                ?
                < div style={{ width: "100%", display: "inline-block" }}>       
                    <ListGroup style={{ width: "100%" }} variant="flush">
                        {verbs.map((e: ImMonkeyData_Status, i: number) => (
                            <ListGroupItem onClick={() => { updateselectedIndex(i); updateverbChanged(false) }} style={{ backgroundColor: (selectedIndex === i) ? "Gainsboro" : "Transparent"}}>
                                <div style={{ width: "100%", display: "inline-block"}}>
                                    <div style={{ width: "10%", display: "inline-block", textAlign: "center" }}>
                                        {emoji.emojify(getEmojiType(e.action_type))}
                                    </div>
                                    <div style={{ width: "40%", display:"inline-block", textAlign:"center"}}>
                                        {
                                            selectedIndex === i
                                                ?
                                                <input type="text" ref={itemInput} onChange={() => { if (itemInput.current && (e.status !== itemInput.current.value)) { updateverbChanged(true) } }} defaultValue={e.status} style={{ width: "95%", border: 0, textAlign:"center", backgroundColor: "Transparent", color: "darkblack" }} />
                                                :
                                                <span>{e.status}</span>

                                        }
                                    </div>
                                    <div style={{ width: "40%", display: "inline-block", textAlign: "center"}}>
                                        {
                                            selectedIndex === i
                                                ?
                                                <input type="text" ref={verbInput} onChange={() => { if (verbInput.current && (e.status_verb !== verbInput.current.value)) { updateverbChanged(true) } }} defaultValue={e.status_verb} style={{ width: "95%", border: 0, textAlign:"center", backgroundColor: "Transparent", color: "darkblack" }} />
                                                :
                                                <span>{e.status_verb}</span>

                                        }
                                    </div>
                                    <div style={{ width: "10%", display: "inline-block", textAlign: "center" }}>
                                        {
                                            selectedIndex === i && verbChanged
                                                ?
                                                <span onClick={() => { updateVerb(i)}}>{emoji.emojify(":floppy_disk:")}</span>
                                                :
                                                <></>
                                        }
                                    </div>
                                </div>
                            </ListGroupItem>
                        ))
                            }
                    </ListGroup>
                    <br />
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Button onClick={() => { updateselectedIndex(-1);updateverbChanged(false)}}>Cancel</Button>
                    </div>
                </div>
                : <><br /><span style={{textAlign:"center"}}>No Verbs Exist</span></>
            }
        </div>
    )
}
