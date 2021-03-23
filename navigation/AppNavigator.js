import React from 'react'
import {useSelector} from "react-redux"
import {NavigationContainer} from "@react-navigation/native"
import {AdminNavigator, OrdersNavigator, ProductsNavigator} from "./ShopNavigator";

const AppNavigator = props => {

    //podwójny wykrzyknik oznacza, że jeśli tokenu nie ma to będzie false a jesli jest to bedzie true
    const isAuth = useSelector(state => !!state.auth.token)


    return (
        <NavigationContainer>
            <ProductsNavigator/>
            <OrdersNavigator/>
            <AdminNavigator/>
        </NavigationContainer>
    )
}


export default AppNavigator

//===== KOMENTARZE I POMOCE Z WERSJI REACT NAVIGATION 4 =====

//tworzę ten komponent po to, żeby zawinąć w nim mój wspólny navigator i umieścić go wewnątrz Providera w App
//to wszystko po to, żeby uzyskać dostep do stanu reduxa, bowiem w poprzedniej konfiguracji nie byłoby to możliwe
//tak więc chcę, żeby w tym kontenerze pewne funkcje sprawdzały, czy token istnieje, bo w przeciwnym razie nawet
//gdy token wygaśnie poprzez expiration time to bez przeładowania aplikacji nic sie nie zmieni i user nadal będzie
//mogł nawigować do aplikacji, dlatego gdy token wygaśnie ten komponent od razu zainicjuje akcję przekierowania na
//ekran logowania, co wykona się wewnątrz useeffect

//ref daje mi możliwość operowania na elemencie renderowanym jako jsx. nie mogę dostac sie do propsów
//i metod typ navigate() udostępniamych przez navigatora więc poprzez refy pobiorę dispatcha tutaj
// const navRef = useRef()

// useEffect(() => {
//     if (!isAuth) {
//         //dispatch jest metodą udostepnioną przez navigatora i dzięki NavigationActions mogę nawigować mimo, że
//         //jestem na zewnątrz navigatora
//         navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
//     }
// }, [isAuth])

//return <Shop Navigator ref={navRef}/>
