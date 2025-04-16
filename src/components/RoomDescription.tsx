import CustomText from './CustomText';

interface DescriptionProp {
  text: string;
}

export default function RoomDescription({ text }: DescriptionProp) {
  return (
    <CustomText
      style={{
        padding: 5,
      }}
    >
      {text}
    </CustomText>
  );
}
