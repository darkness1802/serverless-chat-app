import { FontAwesome5 } from "@expo/vector-icons"
import { View, Text, TouchableOpacity } from "react-native"

const MessageCard = () => {
    return <TouchableOpacity className="w-full flex-row items-center justify-start py-2">
        <View className="w-16 h-16 rounded-full flex items-center border-2 border-primary p-1 justify-center">
            <FontAwesome5 name="users" size={24} color={"#555"} />   
        </View>

        <View className="flex-1 flex items-start justify-center ml-4">
            <Text className="text-base text-[#333] font-semibold capitalize">
                Message Title
            </Text>

            <Text className="text-sm text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi...
            </Text>
        </View>

        <Text className="text-primary text-base font-semibold">22 min</Text>

    </TouchableOpacity>
}

export default MessageCard