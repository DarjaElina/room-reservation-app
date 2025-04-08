import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';
import CustomText from './CustomText';

interface EquipmentProp {
  name: string;
}

export default function EquipmentItem({ name }: EquipmentProp) {
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <View
      style={[
        styles.equipmentItemContainer,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <CustomText style={[styles.smallText]}>{name}</CustomText>
    </View>
  );
}
