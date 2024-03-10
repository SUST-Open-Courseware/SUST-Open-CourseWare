import { db } from "@/lib/db";

interface GetGameProps {
    userId: string,
    gameId: string;
};

export const getGame = async ({
    userId,
    gameId
}: GetGameProps) => {
    try {
        const game = await db.game.findUnique({
            where: {
                userId: userId,
                id: gameId
            }
        });

        return {
            game
        }
    }
    catch (error) {
        console.log("[GET_GAME]", error);
        return {
            game: null
        }
    }
}