import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    ImageBackground
} from 'react-native'
import DefaultText from "./DefaultText";

const ProductItem = props => {

    let TouchableComp = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback
    }

    return (
        <View style={styles.prodItem}>
            <TouchableComp onPress={props.onSelect}>
                <View>
                    <View style={styles.image}>
                        {/*<ImageBackground source={{uri: props.image}}/>*/}
                    </View>
                    <View style={styles.titleContainer}>
                        <DefaultText>{props.title}</DefaultText>
                    </View>
                    <View style={styles.priceContainer}>
                        <DefaultText>{props.price}</DefaultText>
                    </View>
                </View>
            </TouchableComp>
        </View>
    )
}

const styles = StyleSheet.create({
    prodItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    titleContainer: {},
    priceContainer: {},
})

export default ProductItem
