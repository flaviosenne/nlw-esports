import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes, convertMinutesToHourString } from "../utils";

export class AdsController {

    private connect

    constructor() {
        this.connect = new PrismaClient({ log: ['query'] })
    }

    async create(req: Request, res: Response): Promise<Response> {
        const gameId = req.params['gameId']
        const body: any = req.body

        const ad = await this.connect.ad.create({
            data: {
                gameId,
                name: body.name,
                yearsPlaying: body.yearsPlaying,
                discord: body.discord,
                weekDays: body.weekDays.join(','),
                hourStart: convertHourStringToMinutes(body.hourStart),
                hourEnd: convertHourStringToMinutes(body.hourEnd) ,
                useVoiceChannel: body.useVoiceChannel,
            }
        })

        return res.status(201).end()
    }

    async getByGame(req: Request, res: Response): Promise<Response> {
        const gameId = req.params['gameId']

        const ads = await this.connect.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                gameId
            }
        })

        return res.json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart),
                hourEnd: convertMinutesToHourString(ad.hourEnd),
            }
        }))
    }

    async getDiscrod(req: Request, res: Response): Promise<Response> {
        const id = req.params['id']

        const ad = await this.connect.ad.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                discord: true
            }
        })

        return res.json({ discord: ad.discord })
    }
}