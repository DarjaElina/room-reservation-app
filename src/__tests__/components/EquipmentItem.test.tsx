import EquipmentItem from '@/src/components/EquipmentItem';
import { render } from '@testing-library/react-native';
jest.mock('@react-navigation/native', () => {
  return {
    useTheme: () => ({
      dark: false,
      colors: {
        primary: 'blue',
        background: 'white',
        card: 'gray',
        text: 'black',
        border: 'green',
        error: 'red',
        success: 'green',
      },
    }),
  };
});
jest.mock('expo-font', () => {
  const module: typeof import('expo-font') = {
    ...jest.requireActual('expo-font'),
    useFonts: () => [true, null],
    isLoaded: jest.fn(() => true),
    loadAsync: jest.fn(),
  };

  return module;
});

describe('EquipmentItem Component', () => {
  it('renders equipment name correctly', async () => {
    const { findByText } = render(<EquipmentItem name="violin" />);
    expect(await findByText('violin')).toBeDefined();
  });
});
