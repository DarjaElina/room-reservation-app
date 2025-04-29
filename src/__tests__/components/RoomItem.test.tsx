import Room from '@/src/components/RoomItem';
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
jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {
        AVAILABLE: () => 'Available',
        OCCUPIED: () => 'Occupied',
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

describe('RoomItem Component', () => {
  it('renders room code and venue', async () => {
    const { findByText } = render(
      <Room code="R-123" venue="R-Building" isFree={true} />
    );

    expect(await findByText('R-123')).toBeDefined();
    expect(await findByText('R-Building')).toBeDefined();
  });

  it('renders available status when isFree is true', async () => {
    const { findByTestId } = render(
      <Room code="R-123" venue="R-Building" isFree={true} />
    );
    expect(await findByTestId('available-icon')).toBeDefined();
  });

  it('renders occupied status when isFree is false', async () => {
    const { findByTestId } = render(
      <Room code="R-123" venue="R-Building" isFree={false} />
    );
    expect(await findByTestId('occupied-icon')).toBeDefined();
  });
});
