import { View, Image, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicatorBase, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Logo } from "../assets"
import { Ionicons } from "@expo/vector-icons"
import { useLayoutEffect, useState } from "react"
import MessageCard from "../components/Message/Message.Card"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { firebaseStore } from "../configs/firebase.config"

export default function Home() {

    const user = useSelector((state) => state.user)
    const [isLoading, $isLoading] = useState(true)
    const [messages, $messages] = useState(false)
    const nav = useNavigation()

    useLayoutEffect(() => {
        const $query = query(collection(firebaseStore, "chats"), orderBy("_id", "desc"))

        const unsubscribe = onSnapshot($query, (snapshot) => {
            const soup = snapshot.docs.map(doc => doc.data())

            console.log(soup)

            $messages(soup)
            $isLoading(false)
        })

        // tra ve de tam dung listening cac updates
        return unsubscribe
    }, [])

    const createMessage = () => {
        console.log(`Hello world`)
        nav.navigate("Messager")
    }

    return <View className="flex-1">
        <SafeAreaView>
            <View className="flex-row justify-between w-full items-center px-6 py-14 pb-6">
                <Image source={Logo} className="w-12 h-12" resizeMode="contain" />
                <TouchableOpacity className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center">
                    <Image source={{ uri: user?.user.avatar }} className="w-12 h-12" resizeMode="contain" />
                </TouchableOpacity>
            </View>

            <ScrollView className="w-full pt-8 h-auto">
                <View className="w-full">
                    <View className="flex-row w-full items-center justify-between px-6">
                        <Text className="text-primaryText text-lg font-extrabold pb-2">
                            Message
                        </Text>
                        <TouchableOpacity onPress={createMessage}>
                            <Ionicons name="chatbox" size={24} color={"#555"} />
                        </TouchableOpacity>
                    </View>

                    {isLoading ?
                        <View className="w-full flex items-center justify-center">
                            <ActivityIndicator size={"large"} color={"#43c651"} />
                        </View>

                        : <View className="px-6">
                            { messages && messages.map(i => <MessageCard key={i._id} data={i} />) }
                        </View>
                    }

                </View>
            </ScrollView>

        </SafeAreaView>
    </View>
}