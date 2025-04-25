import { useMutation } from '@apollo/client';
import { TOGGLE_FAVORITE } from '@/src/graphql/mutations';
import { FIND_ROOM, ALL_ROOMS } from '../graphql/queries';

const useFavoriteRoom = ({ roomId }: { roomId: string }) => {
  const [mutate, { loading }] = useMutation(TOGGLE_FAVORITE, {
    update: (cache, { data: toggleData }) => {
      if (!toggleData?.toggleFavorite.id) return;
      cache.updateQuery(
        {
          query: FIND_ROOM,
          variables: {
            roomId: toggleData?.toggleFavorite.id,
          },
          broadcast: false,
        },
        (data) => {
          if (!data || !data.findRoom) return;
          return {
            findRoom: {
              ...data.findRoom,
              isFavorite: !data.findRoom?.isFavorite,
            },
          };
        }
      );

      const roomData = cache.readQuery({
        query: ALL_ROOMS,
      });

      if (!roomData) return;

      const roomToAddOrDelete = roomData.rooms.edges.find(
        (r) => r.node.id === toggleData.toggleFavorite.id
      );

      if (roomToAddOrDelete) {
        if (toggleData.toggleFavorite.isFavoriteNow) {
          cache.writeQuery({
            query: ALL_ROOMS,
            variables: {
              showFavorites: true,
            },
            data: {
              rooms: {
                ...roomData.rooms,
                edges: roomData.rooms.edges.concat(roomToAddOrDelete),
                pageInfo: roomData.rooms.pageInfo,
              },
            },
            broadcast: false,
          });
        } else {
          cache.writeQuery({
            query: ALL_ROOMS,
            variables: {
              showFavorites: true,
            },
            data: {
              rooms: {
                ...roomData.rooms,
                edges: roomData.rooms.edges.filter(
                  (r) => r.node.id !== roomToAddOrDelete.node.id
                ),
                pageInfo: roomData.rooms.pageInfo,
              },
            },
            broadcast: false,
          });
        }
      }
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
