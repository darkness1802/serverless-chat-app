import { View, Text, Image, ActivityIndicator } from "react-native"
import { doc, getDoc } from "firebase/firestore";
import { firebaseAuth, firebaseStore } from "../configs/firebase.config";
import { Logo, cat } from "../assets"
import { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions";

export default function Splash() {

    const nav = useNavigation()
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        userAuthChecker()
    }, [])

    const userAuthChecker = async () => {
        try {
            firebaseAuth.onAuthStateChanged(async (credential) => {
                if (credential?.uid) {
                    try {
                        let snap = await getDoc(doc(firebaseStore, 'users', credential?.uid))

                        if (snap.exists()) {
                            console.log(snap.data())
                            dispatch(SET_USER(snap.data()))
                        }

                        setTimeout(() => {
                            nav.replace("Home")
                        }, 2000)

                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    nav.replace("Signin")
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return <View className="flex-1 items-center justify-center space-y-20">
        <Image source={Logo} className="w-24 h-24" resizeMode="contain" />
        <ActivityIndicator size={"large"} color={"#43c651"} />
    </View>
}