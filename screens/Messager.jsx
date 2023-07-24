import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { firebaseStore } from "../configs/firebase.config"

export default function Messager() {

    const nav = useNavigation()
    const user = useSelector((state) => state.user)
    const [text, $text] = useState("")

    const createChat = async () => {
        try {
            let id = `${Date.now()}`
            let _doc = {
                _id: id,
                user: user,
                chatName: text
            }
            if (text !== "") {
                await setDoc(doc(firebaseStore, "chats", id), _doc)
                $text(""); nav.replace("Home")
            } else throw new Error("Text must not empty")
        } catch (err) {
            console.log(err)
            alert("Error", toString(err))
        }
    }

    return <View className="flex-1">
        <View className="w-full bg-primary px-4 py-4 flex-[0.2]">
            <View className="flex-row items-center justify-between w-full px-4 py-12">

                {/* go back */}
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <MaterialIcons name="chevron-left" size={30} color={"#fbfbfb"} />
                </TouchableOpacity>

                <View className="flex-row items-center justify-center space-x-3">
                    <Image className="w-12 h-12" source={{ uri: user?.user.avatar }} resizeMode="contain" />
                </View>
            </View>
        </View>
        <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
            <View className="w-full px-4 py-4">
                <View className="w-full px-4 py-2 flex-row items-center justify-between rounded-xl border border-gray-200 space-x-3">
                    <Ionicons name="chatbubbles" size={24} color={"#777"} />

                    <TextInput className="flex-1 pt-3 text-lg text-primaryText -mt-3 h-12 w-full"
                        placeholder="Create a chat" placeholderTextColor={"#999"}
                        value={text} onChangeText={(value) => $text(value)}
                    />

                    <TouchableOpacity onPress={createChat}>
                        <FontAwesome name="send" size={24} color={"#777"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
}