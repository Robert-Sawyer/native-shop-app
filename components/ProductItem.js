import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Image
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
                    <View style={styles.insideContainer}>
                        <View style={{...styles.imgContainer, ...{height: props.imgHeight}}}>
                            <Image style={styles.image} source={{uri: props.image}}/>
                        </View>
                        <View style={{...styles.details, ...{height: props.detailsHeight}}}>
                            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                            <View style={styles.priceContainer}>
                                <DefaultText>{props.price.toFixed(2)}</DefaultText>
                            </View>
                        </View>
                        <View style={{...styles.action, ...{height: props.actionHeight}}}>
                            {props.children}
                        </View>
                    </View>
            </TouchableComp>
        </View>
    )
}

const styles = StyleSheet.create({
    prodItem: {
        flex: 1,
        alignItems: 'center',
        elevation: 9,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        backgroundColor: '#eae9e9',
        borderRadius: 9,
        margin: 8,
        height: 230,
        width: 150,
        overflow: 'hidden',
    },
    wrapper: {
        width: '100%',
        height: '100%',
    },
    insideContainer: {
        width: '100%',
        height: '100%',
    },
    imgContainer: {
        width: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        height: '25%',
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        fontFamily: 'open-sans-bold',
        marginVertical: 3,
        paddingHorizontal: 5,
        // letterSpacing: 1,
    },
    priceContainer: {
        fontSize: 18,
        marginVertical: 3,
        fontFamily: 'open-sans',
    },
    action: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})

export default ProductItem
