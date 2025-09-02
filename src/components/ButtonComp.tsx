import React from "react";
import {
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { AppFont, Colors, Metrix } from "../config";

type ButtonCompProps = {
  title: string;
  Icon?: React.ComponentType<any>;
  disabled?: boolean;
  loading?: boolean;
  propstyle?: ViewStyle | ViewStyle[]; 
  onPress?: () => void;
};

const ButtonComp: React.FC<ButtonCompProps> = ({
  title,
  Icon,
  disabled = false,
  loading = false,
  propstyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: "100%",
          // paddingVertical: Metrix.VerticalSize(18),
          height: Metrix.VerticalSize(50),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: disabled ? Colors.gray400 : Colors.primary,
          borderRadius: 12,
          flexDirection: "row",
        },
        propstyle,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {Icon ? <Icon /> : null}
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Text
          style={{
            color: Colors.white,
            fontSize: Metrix.customFontSize(14),
            fontFamily: AppFont.LexendRegular,
            fontWeight: 'heavy'
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComp;
