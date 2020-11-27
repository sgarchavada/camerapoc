/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View, Image, Dimensions, TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageViewers from './ImageViewer';

const { height, width } = Dimensions.get('screen');

class App extends Component {

  state = {
    captureData: [],
    visible: false,
    previewData: ''
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      const arrayData = this.state.captureData;
      arrayData.unshift(data.uri);
      this.setState({ captureData: arrayData });
    }
  }

  closeModal = () => {
    this.setState({ visible: false })
  }

  render() {
    const { container, preview, capture, frame, snap, circle } = styles;
    return (
      <SafeAreaView style={container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          <View style={capture}>
            {this.renderCaptureData()}
          </View>
          <View style={frame}>
            {this.renderFrame()}
          </View>

          <View style={snap}>
            <TouchableOpacity style={circle} onPress={this.takePicture} />
          </View>
        </RNCamera>

        <ImageViewers close={this.closeModal} visible={this.state.visible} data={this.state.previewData} />
      </SafeAreaView>
    );
  }

  // Captured image thumbnails
  renderCaptureData = () => {
    const { thumbnail } = styles;
    return this.state.captureData.slice(0, 4).map((item, index) => (
      <TouchableOpacity
        key={`index-${index}`}
        style={thumbnail}
        onPress={() => this.setState({ visible: true, previewData: item })}>
        <Image style={{ width: 60, height: 80 }} resizeMode="contain" source={{ uri: item }} />
      </TouchableOpacity>
    ))
  }

  // Camera Frame
  renderFrame = () => {
    return (
      <View>
        <View style={{
          height: 50,
          width: 50,
          position: 'absolute',
          borderColor: 'white',
          borderTopWidth: 4,
          borderLeftWidth: 4,
          borderTopLeftRadius: 22,
          top: -4,
          left: -4
        }} />
        <View style={{
          height: 50,
          width: 50,
          position: 'absolute',
          borderColor: 'white',
          borderBottomWidth: 4,
          borderLeftWidth: 4,
          borderBottomLeftRadius: 22,
          bottom: -4,
          left: -4
        }} />
        <View style={{
          height: 50,
          width: 50,
          position: 'absolute',
          borderColor: 'white',
          borderTopWidth: 4,
          borderRightWidth: 4,
          borderTopRightRadius: 22,
          top: -4,
          right: -4
        }} />
        <View style={{
          height: 50,
          width: 50,
          position: 'absolute',
          borderColor: 'white',
          borderBottomWidth: 4,
          borderRightWidth: 4,
          borderBottomRightRadius: 22,
          bottom: -4,
          right: -4
        }} />
        <View style={{
          borderColor: '#30A9DE',
          borderWidth: 2,
          height: height / 1.68,
          width: width - 60,
          borderRadius: 18
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  capture: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  thumbnail: {
    height: 80,
    width: 60,
    borderWidth: 1,
    borderColor: '#FFF',
    borderStyle: 'dashed',
    marginLeft: 15
  },
  frame: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#90000000'
  },
  snap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  circle: {
    backgroundColor: 'green',
    height: 70,
    width: 70,
    borderRadius: 70
  }
});

export default App;
