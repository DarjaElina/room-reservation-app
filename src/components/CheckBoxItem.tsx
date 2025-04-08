import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';

interface CheckBoxItemProps {
  item: { value: string; label: string };
  isActive: boolean;
  updatedCheckedValues: string[];
  setUpdatedCheckedValues: React.Dispatch<React.SetStateAction<string[]>>;
  onChange: (newCheckedValues: string[]) => void;
}

export default function CheckBoxItem({
  item,
  isActive,
  updatedCheckedValues,
  setUpdatedCheckedValues,
  onChange,
}: CheckBoxItemProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const handlePress = () => {
    const newValues = isActive
      ? updatedCheckedValues.filter((v) => v !== item.value)
      : [...updatedCheckedValues, item.value];

    setUpdatedCheckedValues(newValues);
    onChange(newValues);
  };

  return (
    <TouchableOpacity
      style={[styles.checkbox, { borderColor: colors.text }]}
      onPress={handlePress}
    >
      <View style={[styles.iconTextContainer, { margin: 0 }]}>
        <MaterialIcons
          name={isActive ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={isActive ? colors.primary : colors.text}
        />
        <CustomText style={[styles.mediumText]}>{item.label}</CustomText>
      </View>
    </TouchableOpacity>
  );
}
