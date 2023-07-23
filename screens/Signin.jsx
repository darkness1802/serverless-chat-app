import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth, firebaseStore } from "../configs/firebase.config";
import { BGImage, Logo } from "../assets"
import UserInput from "../components/UserInput";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions";

export default function Signin() {

    const screenWidth = Math.round(Dimensions.get("window").width)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [alert, $alert] = useState()
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleSignin = async () => {
        try {
            let { user } = await signInWithEmailAndPassword(firebaseAuth, email, password)
            let snap = await getDoc(doc(firebaseStore, 'users', user.uid))
            if (snap.exists()) {
                console.log(snap.data())
                dispatch(SET_USER(snap.data()))
            }
        } catch(err) {
            console.log(err)
            $alert({ success: false, message: err.message })

            setTimeout(() => {
                $alert(null)
            }, 3000)
        }
    }

    return <View className="flex-1 items-center justify-start">
        <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidth }} />
        <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start p-6 space-y-6">
            <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
            <Text className="py-2 text-primaryText text-xl font-semibold">Welcome Back!</Text>

            { alert?.message && <Text className="text-red-500">{alert.message}</Text> }

            <View className="w-full flex items-center justify-center">
                <UserInput placeholder="Email"
                    isPassword={false}
                    setStateValue={setEmail}
                />

                <UserInput placeholder="Password"
                    isPassword={true}
                    setStateValue={setPassword}
                />

                <TouchableOpacity onPress={handleSignin} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
                    <Text className="py-2 text-white text-xl font-semibold">Sign in</Text>
                </TouchableOpacity>

                <View className="w-full py-12 flex-row items-center justify-center space-x-2">
                    <Text>Dont have account?</Text>

                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                        <Text className="font-semibold">Click here</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    </View>
}