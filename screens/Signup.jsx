import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { BGImage, Logo, avatars } from "../assets"
import UserInput from "../components/UserInput";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseStore } from "../configs/firebase.config";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {

    const screenWidth = Math.round(Dimensions.get("window").width)
    const screenHeight = Math.round(Dimensions.get("window").height)
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const navigation = useNavigation()

    const [currentAvatar, $currentAvatar] = useState(avatars[0].uri)
    const [showAvatarSelector, $showAvatarSelector] = useState(false)

    const handleChangeAvatar = (i) => {
        $currentAvatar(i.uri)
        $showAvatarSelector(false)
    }

    const handleSignup = async () => {
        try {
            // Valid values first
            let { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            
            const res = {
                _id: user.uid,
                fullName: name,
                avatar: currentAvatar,
                providerData: user.providerData[0]
            }

            await setDoc(doc(firebaseStore, 'users', user.uid), res)

            navigation.navigate("Signin")
        } catch (err) {
            console.log(err)
        }
    }

    return <View className="flex-1 items-center justify-start relative">
        <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidth }} />

        {showAvatarSelector && <View className="absolute top-0 left-0 inset-0 z-10" style={{ width: screenWidth, height: screenHeight }}>
            <ScrollView>
                <BlurView className="py-24 flex-row flex-wrap items-center justify-center"
                    tint="light" intensity={60}
                    style={{ width: screenWidth, height: screenHeight }}
                >
                    {avatars.map(i => {
                        return <TouchableOpacity key={i.name} onPress={() => handleChangeAvatar(i)} className="w-20 m-3 h-20 p-1 rounded-full border-2 border-primary relative">
                            <Image source={{ uri: i.uri }} className="w-full h-full" resizeMode="contain" />
                        </TouchableOpacity>
                    })}

                </BlurView>
            </ScrollView>
        </View>}

        <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start p-6 space-y-6">
            <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
            <Text className="pt-2 text-primaryText text-xl font-semibold">Join with us!</Text>

            <View className="w-full flex items-center justify-center relative -my-2">
                <TouchableOpacity onPress={() => $showAvatarSelector(true)} className="w-20 h-20 rounded-full border-2 border-primary relative">
                    <Image source={{ uri: currentAvatar }} className="w-full h-full" resizeMode="contain" />
                    <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
                        <MaterialIcons name="edit" size={18} color={"#fff"} />
                    </View>
                </TouchableOpacity>
            </View>

            <View className="w-full flex items-center justify-center">
                <UserInput placeholder="Email"
                    isPassword={false}
                    setStateValue={setEmail}
                />

                <UserInput placeholder="Full name"
                    isPassword={false}
                    setStateValue={setName}
                />

                <UserInput placeholder="Password"
                    isPassword={true}
                    setStateValue={setPassword}
                />

                <TouchableOpacity onPress={handleSignup} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
                    <Text className="py-2 text-white text-xl font-semibold">Sign up</Text>
                </TouchableOpacity>

                <View className="w-full py-12 flex-row items-center justify-center space-x-2">
                    <Text>Have an account?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text className="font-semibold">Sign in</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    </View>
}