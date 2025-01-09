import React from 'react';
import { Modal, Image } from 'react-bootstrap';


interface Im_ItemProps{
    showItemToggle: Function;
    itemPhotoLocation: any;
}


class MonkeyItemPhoto extends React.Component<Im_ItemProps, {}> {


    render() {
        return (
            <div style={{ width: "90%", height: "50%" }}>
                <Modal animation centered show={this.props.itemPhotoLocation} size="xl" onHide={() => { this.props.showItemToggle() }}>
                    <Modal.Body style={{ textAlign: "center" }}>
                        <div style={{ width: "100%}" }}>
                            <Image fluid style={{ width: "100%", height: "100%" }} src={this.props.itemPhotoLocation} onClick={() => { this.props.showItemToggle() }}/>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default MonkeyItemPhoto;
