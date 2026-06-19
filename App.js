// ============================================================
// 🏆 DASHBOARD DA COPA 2026 — Boilerplate único (App.js)
// Hackathon: useState + useEffect + FlatList
//
// Este arquivo contém o resultado final (Sprint 3), com comentários
// marcando o que foi adicionado em cada sprint. Use como referência/
// gabarito do instrutor — não entregue pronto ao aluno.
//
// ⚠️ TROQUE A URL ABAIXO pela URL "Raw" do SEU db.json no GitHub!
// Exemplo: https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPO/main/db.json
// ============================================================

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Image, 
    Alert,
    TouchableOpacity,
} from 'react-native';

const URL_DADOS = 'https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPO/main/db.json';

export default function App() {

    const [selecoes, setSelecoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        fetch(URL_DADOS)
            .then((resposta) => resposta.json())
            .then((dadosJson) => {
                console.log(dadosJson);
                setSelecoes(dadosJson);
                setCarregando(false);
            })
            .catch((erroRequisicao) => {
                console.log('Erro ao buscar dados:', erroRequisicao);
                setErro(erroRequisicao.message);
                setCarregando(false);
            });
    }, []);
    function renderizarItem({ item }) {
        return (
            <View style={styles.card}>

                <Image source={{ uri: item.bandeira }} style={styles.bandeira} />

                <View style={styles.bolaGrupo}>
                    <Text style={styles.bolaGrupoTexto}>{item.grupo}</Text>
                </View>

                <Text style={styles.nomeSelecao}>{item.selecao}</Text>

                <TouchableOpacity
                    style={styles.botaoApostar}
                    onPress={() => Alert.alert(`Você apostou no ${item.selecao}!`)}>
                    <Text style={styles.botaoApostarTexto}>Apostar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (carregando) {
        return (
            <View style={styles.containerCentralizado}>
                <ActivityIndicator size="large" />
                <Text>Carregando seleções...</Text>
            </View>
        );
    }

    if (erro) {
        return (
            <View style={styles.containerCentralizado}>
                <Text>Erro ao carregar: {erro}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>🏆 Dashboard da Copa 2026</Text>


            <FlatList
                data={selecoes}
                keyExtractor={(item) => item.id}
                renderItem={renderizarItem}
                numColumns={2}
                columnWrapperStyle={styles.linhaGrid}
                contentContainerStyle={styles.listaConteudo}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, backgroundColor: '#F4F6F8' },
    containerCentralizado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    listaConteudo: { paddingBottom: 24 },
    linhaGrid: { justifyContent: 'space-between' },

    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        padding: 12,
        marginBottom: 10,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    bandeira: {
        width: 60,
        height: 40,
        borderRadius: 4,
        marginBottom: 8,
    },
    bolaGrupo: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#1E6F46',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    bolaGrupoTexto: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
    nomeSelecao: { fontSize: 14, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
    botaoApostar: {
        backgroundColor: '#1E6F46',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    botaoApostarTexto: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 },
});
