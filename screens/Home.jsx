import { View, Image, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicatorBase, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux"
import { Logo } from "../assets"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import MessageCard from "../components/Message/Message.Card"

export default function Home() {

    const user = useSelector((state) => state.user)
    const [isLoading, $isLoading] = useState(false)

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
                        <TouchableOpacity>
                            <Ionicons name="chatbox" size={24} color={"#555"} />
                        </TouchableOpacity>
                    </View>

                    {isLoading ?
                        <View className="w-full flex items-center justify-center">
                            <ActivityIndicator size={"large"} color={"#43c651"} />
                        </View>

                        : <View className="px-6">
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                            <MessageCard />
                        </View>
                    }

                </View>
            </ScrollView>

        </SafeAreaView>
    </View>
}