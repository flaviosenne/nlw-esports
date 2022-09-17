
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as Toggle from '@radix-ui/react-toggle-group'
import axios from 'axios'

import { Check, GameController } from 'phosphor-react'
import { Input } from './Form/Input'
import { FormEvent, useEffect, useState } from 'react'
import { Game } from '../App'

export function CreateAdModal() {

    const weekDays = [
        { name: "Domingo", sigla: "D" },
        { name: "Segunda", sigla: "S" },
        { name: "Terça", sigla: "T" },
        { name: "Quarta", sigla: "Q" },
        { name: "Quinta", sigla: "Q" },
        { name: "Sexta", sigla: "S" },
        { name: "Sábado", sigla: "S" }
    ]

    const [games, setGames] = useState<Game[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)
    const [days, setDays] = useState<string[]>([])


    async function handlCreatAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const data = Object.fromEntries(formData)
        console.log(data)

        try {

            await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: days.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel,
            })

            alert('anúncio enviado com sucesso')
        } catch (error) {
            alert('deu erro')
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/games')
            .then(json => setGames(json.data))
    }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">

                <Dialog.Title className="text-3xl font-black"> Publique um anúncio </Dialog.Title>

                <form onSubmit={handlCreatAd} className="mt-8 flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold" htmlFor="game">Qual o game?</label>

                        <select
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                            id="game"
                            name="game"
                            placeholder=""
                            defaultValue=""
                        >
                            <option disabled value="">Selecione o game que deseja jogar</option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>

                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos</label>
                            <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input name="discord" id="discord" placeholder="Usuario#0000" />
                        </div>

                    </div>

                    <div className="flex gap-6">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>
                            <Toggle.Root type="multiple" className="grid grid-cols-4 gap-2" value={days} onValueChange={setDays}>

                                {weekDays.map((day, index) => {
                                    return <Toggle.Item
                                        key={day.name}
                                        value={index.toString()}
                                        className={`w-8 h-8 rounded ${days.includes(index.toString()) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title={day.name}>{day.sigla}
                                    </Toggle.Item>
                                })}
                            </Toggle.Root>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="hourStart">Qual horário do dia</label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                            <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                        </div>
                    </div>


                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900">
                            <Checkbox.Indicator >
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                        <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>

            </Dialog.Content>

        </Dialog.Portal >
    )
}