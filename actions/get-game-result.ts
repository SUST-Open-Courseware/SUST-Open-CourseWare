import { db } from "@/lib/db";

interface GetGameResultProps {
    gameId: string;
};

export const getGameResult = async ({
    gameId
}: GetGameResultProps) => {
    try {
        const results = await db.gameResult.findMany({
            where: {
                gameId: gameId
            }
        });

        return {
            results
        }
    }
    catch (error) {
        console.log("[GET_GAME]", error);
        return {
            results: null
        }
    }
}