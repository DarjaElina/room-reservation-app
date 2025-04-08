import CustomText from './CustomText';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

interface DescriptionProp {
  text: string;
}

export default function RoomDescription({ text }: DescriptionProp) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <CustomText
      style={[
        styles.mediumText,
        {
          color: colors.text,
          padding: 5,
        },
      ]}
    >
      {text}
    </CustomText>
  );
}
