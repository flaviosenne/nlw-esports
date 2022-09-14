import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

export class GameController{
    private readonly connect

    constructor(){
        this.connect = new PrismaClient({log: ['query']})
    }

    async store(req: Request, res: Response): Promise<Response>{
        const games = await this.connect.game.findMany({
            include:{
                _count: {
                    select: {
                        ads: true
                    }
                }
            }
        })
        return res.json(games)
    }
}