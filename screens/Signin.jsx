import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { BGImage, Logo } from "../assets"
import UserInput from "../components/UserInput";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Signin() {

    const screenWidth = Math.round(Dimensions.get("window").width)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigation = useNavigation()

    return <View className="flex-1 items-center justify-start">
        <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidth }} />
        <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start p-6 space-y-6">
            <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
            <Text className="py-2 text-primaryText text-xl font-semibold">Welcome Back!</Text>

            <View className="w-full flex items-center justify-center">
                <UserInput placeholder="Email"
                    isPassword={false}
                    setStateValue={setEmail}
                />

                <UserInput placeholder="Password"
                    isPassword={true}
                    setStateValue={setPassword}
                />

                <TouchableOpacity className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
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