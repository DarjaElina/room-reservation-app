import EquipmentList from '@/src/components/EquipmentList';
import { render } from '@testing-library/react-native';
jest.mock('expo-font', () => {
  const module: typeof import('expo-font') = {
    ...jest.requireActual('expo-font'),
    useFonts: () => [true, null],
    isLoaded: jest.fn(() => true),
    loadAsync: jest.fn(),
  };

  return module;
});
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

const equipment = [
  {
    name: 'violin',
    id: '1',
  },
  {
    name: 'piano',
    id: '2',
  },
  {
    name: 'guitar',
    id: '3',
  },
];

describe('EquipmentList Component', () => {
  it('renders equipment items correctly', async () => {
    const { findByText } = render(<EquipmentList equipment={equipment} />);

    expect(await findByText('violin')).toBeDefined();
    expect(await findByText('piano')).toBeDefined();
    expect(await findByText('guitar')).toBeDefined();
  });
});
