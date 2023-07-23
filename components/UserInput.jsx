import { TextInput, TouchableOpacity, View } from "react-native"
import { Entypo, MaterialIcons } from "@expo/vector-icons"
import { useLayoutEffect, useState } from "react"

const UserInput = ({placeholder, isPassword, setStateValue}) => {

    const [value, setValue] = useState()
    const [showPassword, setShowPassword] = useState(true)
    const [icon, $icon] = useState(null)
    const onChangeText = (text) => {
        setValue(text)
        setStateValue(text)
    }

    useLayoutEffect(() => {
        switch(placeholder) {
            case "Full name":
                return $icon("person")
            case "Email":
                return $icon("email")
            case "Password":
                return $icon("lock")
        }
    }, [])

    return <View className={`border rounded-2xl px-4 py-6 flex-row items-center
    justify-between space-x-4 my-2 border-gray-200`}>
        <MaterialIcons name={icon} size={24} color={"#6c6d83"} />
        <TextInput value={value}
            onChangeText={onChangeText}
            className="flex-1 text-base text-primaryText font-semibold -mt-1" 
            placeholder={placeholder}
            secureTextEntry={isPassword && showPassword}
            autoCapitalize="none"
            />
    
        {isPassword && (
            <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                <Entypo name={`${showPassword ? 'eye':'eye-with-line'}`} size={20} color={"#6c6d83"} />
            </TouchableOpacity>
        )}
    
    </View>
}

export default UserInput