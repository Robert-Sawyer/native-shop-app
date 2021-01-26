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
                <View>
                    <Image style={styles.image} source={{uri: props.image}}/>
                    <View style={styles.details}>
                        <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                        <View style={styles.priceContainer}>
                            <DefaultText>{props.price.toFixed(2)}</DefaultText>
                        </View>
                    </View>
                </View>
            </TouchableComp>
        </View>
    )
}

const styles = StyleSheet.create({
    prodItem: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        elevation: 9,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        backgroundColor: '#eae9e9',
        borderRadius: 9,
        margin: 8,
        height: 180,
        width: 150,
    },
    image: {
        width: 165,
        height: '70%',
        borderRadius: 8,
    },
    details: {
        alignItems: 'center',

    },
    title: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        marginVertical: 3,
        paddingHorizontal: 5,
    },
    priceContainer: {
        fontSize: 18,
        marginVertical: 3
    },
})

export default ProductItem
