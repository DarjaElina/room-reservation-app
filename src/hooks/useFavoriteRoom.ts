import { useMutation } from '@apollo/client';
import { TOGGLE_FAVORITE } from '@/src/graphql/mutations';
import { FIND_ROOM } from '../graphql/queries';

const useFavoriteRoom = ({ roomId }: { roomId: string }) => {
  const [mutate, { loading }] = useMutation(TOGGLE_FAVORITE, {
    update: (cache, { data }) => {
      if (!data?.toggleFavorite.id) return;
      cache.updateQuery(
        {
          query: FIND_ROOM,
          variables: {
            roomId: data?.toggleFavorite.id,
          },
          broadcast: false,
        },
        (data) => ({
          findRoom: {
            ...data?.findRoom,
            isFavorite: !data?.findRoom?.isFavorite,
          },
        })
      );
    },
  });

  const toggleFavoriteRoom = async () => {
    try {
      const { data } = await mutate({
        variables: { roomId },
      });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { toggleFavoriteRoom, loading };
};

export default useFavoriteRoom;
