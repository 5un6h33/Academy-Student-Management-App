import React, { Component } from 'react'
import { Platform, Text } from 'react-native'
import {Modal} from 'react-native-modalbox'

export default class EditModal extends Component {

    render() {
        return (
            <Modal 
                style={{
                    justifyConteent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
            }}
                position='center'
                backdrop={true}
            >
                <Text>New Modal</Text>
            </Modal>
        )
    }
}
