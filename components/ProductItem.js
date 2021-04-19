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

const ProductItem = ({onSelect, imgHeight, image, detailsHeight, title, price, actionHeight, children}) => {

    let TouchableComp = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback
    }

    return (
        <View style={styles.prodItem}>
            <TouchableComp onPress={onSelect}>
                <View style={styles.insideContainer}>
                    <View style={{...styles.imgContainer, ...{height: imgHeight}}}>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>
                    <View style={{...styles.details, ...{height: detailsHeight}}}>
                        <Text numberOfLines={1} style={styles.title}>{title}</Text>
                        <View style={styles.priceContainer}>
                            <DefaultText>{price.toFixed(2)} zł</DefaultText>
                        </View>
                    </View>
                    <View style={{...styles.action, ...{height: actionHeight}}}>
                        {children}
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
        marginVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})

export default ProductItem
