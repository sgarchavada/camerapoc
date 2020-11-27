import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';



class ImageViewers extends Component {
    render() {
        const data = this.props.data;
        const images = [
            {
              url: data
            },
          ]
        return (
            <Modal visible={this.props.visible} transparent={true}>
                <View style={{ flex: 1, backgroundColor: '#000000', paddingBottom: 50 }}>
                    <TouchableOpacity
                        style={{ justifyContent: 'flex-end', marginTop: 50, marginLeft: 20 }}
                        onPress={this.props.close}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>
                    </TouchableOpacity>
                    <ImageViewer imageUrls={images} />
                </View>
            </Modal>
        )
    }
}

export default ImageViewers;