import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
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


export function Game() {

    const route = useRoute()
    const game = route.params as GameParams
    const navigation = useNavigation()
    const [duos, setDuo] = useState<DuoCardProps[]>([])


    function handleGoBack() {
        navigation.goBack()
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
                            <DuoCard data={item} onConnect={()=> {}}/>
                        )
                    }}
                    horizontal
                    contentContainerStyle={styles.contentList}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
        </Background>
    )
}