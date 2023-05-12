import { 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'

const RadioButtons = (props) => {

  const radioPress = () => {
    props.setChecked(props?.val)
  }

  return (
    <View >
      <TouchableOpacity 
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin:5,
        }}
        onPress={radioPress}
        >
        <View 
          style={{
            height: 20,
            width: 20,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: props?.style?.buttonColor || '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
          { 
            props?.checked == props?.val 
              ?<View 
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: props?.style?.buttonCheckedColor || '#000',
                }} 
                />
              : null 
            }
        </View>
        <Text 
          style={{
            marginLeft: 5,
            fontSize:20,
            textTransform: props?.style?.textTransform || 'capitalize',
            color: props?.style?.color
          }}>
          {props?.label}
        </Text>
      </TouchableOpacity>
    </View>
 )
}

export default RadioButtons