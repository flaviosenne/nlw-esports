import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { GameParams } from "../../@types/navigation";


import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";


import logImg from '../../assets/logo-nlw-esports.png'
import { styles } from "./styles";
import { THEME } from "../../theme";
import { useEffect, useState } from "react";
import { DuoMatch } from "../../components/DuoMatch";


export function Game() {

    const route = useRoute()
    const game = route.params as GameParams
    const navigation = useNavigation()
    const [duos, setDuo] = useState<DuoCardProps[]>([])
    const [discordDuoSelected, setDiscordDuoSelected] = useState('')


    function handleGoBack() {
        navigation.goBack()
    }

    async function getDiscordUser(adsId: string) {
        fetch(`http://192.168.100.47:3000/games/ads/${adsId}/discord`)
            .then(res => res.json())
            .then(data => setDiscordDuoSelected(data.discord))
    }

    useEffect(() => {
        fetch(`http://192.168.100.47:3000/games/${game.id}/ads`)
            .then(res => res.json())
            .then(data => setDuo(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>

                    <Image source={logImg} style={styles.logo} />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comce a jogar!"
                />

                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <DuoCard
                                data={item}
                                onConnect={() => getDiscordUser(item.id)} />
                        )
                    }}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[duos.length > 0 ?
                        styles.contentList :
                        styles.emptyListContent
                    ]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            N??o h?? anuncios publicados ainda.
                        </Text>
                    )}
                />

                <DuoMatch
                    visible={discordDuoSelected.length > 0}
                    discord={discordDuoSelected}
                    onClose={() => setDiscordDuoSelected('')}
                />
            </SafeAreaView>
        </Background>
    )
}