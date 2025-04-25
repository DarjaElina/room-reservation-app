import { gql } from '@/__generated__';

export const AUTHENTICATE = gql(`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      accessToken
      refreshToken
    }
  }
`);

export const CREATE_BOOKING = gql(`
  mutation CreateBooking($roomId: ID!, $bookingTime: [Date!]!, $title: String) {
    createBooking(roomId: $roomId, bookingTime: $bookingTime, title: $title) {
      title
      id
      bookingTime {
        value
      }
      user {
        familyName
        givenName
      }
      room {
        code
      }
    }
  }
`);

export const CANCEL_BOOKING = gql(`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      id
      message
    }
  }
`);

export const UPDATE_BOOKING = gql(`
  mutation UpdateBooking($bookingId: ID!, $bookingTime: [Date!]!, $title: String, $roomId: ID!) {
    updateBooking(bookingId: $bookingId, bookingTime: $bookingTime, title: $title, roomId: $roomId) {
      title
      id
      bookingTime {
        value
      }
    }
  }
`);

export const REFRESH_TOKEN = gql(`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
    }
  }
`);

export const TOGGLE_FAVORITE = gql(`
  mutation ToggleFavorite($roomId: ID!) {
    toggleFavorite(roomId: $roomId ) {
      message
      success
      id
      isFavoriteNow
    }
  }
`);
