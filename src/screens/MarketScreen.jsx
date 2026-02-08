import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import VoiceNav from '../components/VoiceNav';
import TranslationService from '../services/TranslationService';

export default function MarketScreen({ navigation }) {
    const t = (key) => TranslationService.t(key);

    const speak = (text) => {
        const lang = TranslationService.lang === 'hi' ? 'hi-IN' : 'en-US';
        Speech.speak(text, { language: lang, rate: 0.9 });
    };

    const marketData = [
        { crop: t('rice'), price: 520, change: +12, icon: '🌾' },
        { crop: t('wheat'), price: 650, change: -8, icon: '🌾' },
        { crop: t('vegetables'), price: 30, change: +5, icon: '🥬' },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFF3E0', '#FFE0B2']}
                style={styles.background}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← {t('back')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>🏪 {t('market')}</Text>
                </View>

                <ScrollView style={styles.content}>
                    {/* Price Cards */}
                    {marketData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => speak(`${item.crop} ${t('price')} ${item.price}`)}
                        >
                            <LinearGradient
                                colors={['#FF9800', '#F57C00']}
                                style={styles.priceCard}
                            >
                                <Text style={styles.priceIcon}>{item.icon}</Text>
                                <View style={styles.priceInfo}>
                                    <Text style={styles.priceCrop}>{item.crop}</Text>
                                    <Text style={styles.priceValue}>₹ {item.price}{t('perQuintal')}</Text>
                                    <Text style={[
                                        styles.priceChange,
                                        item.change > 0 ? styles.priceUp : styles.priceDown
                                    ]}>
                                        {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}

                    {/* Sell Section */}
                    <View style={styles.sellCard}>
                        <Text style={styles.sellTitle}>{t('sellYourCrop')}</Text>
                        <Text style={styles.sellSubtitle}>{t('rice')}: 50 {t('quintals')}</Text>

                        <View style={styles.sellOptions}>
                            <TouchableOpacity
                                style={styles.sellButton}
                                onPress={() => speak(t('sellNow'))}
                            >
                                <LinearGradient
                                    colors={['#4CAF50', '#45a049']}
                                    style={styles.sellButtonGradient}
                                >
                                    <Text style={styles.sellButtonText}>{t('sellNow')}</Text>
                                    <Text style={styles.sellButtonValue}>₹ 26,000</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.sellButton}
                                onPress={() => speak(t('storeAndSell'))}
                            >
                                <LinearGradient
                                    colors={['#2196F3', '#1976D2']}
                                    style={styles.sellButtonGradient}
                                >
                                    <Text style={styles.sellButtonText}>{t('storeAndSell')}</Text>
                                    <Text style={styles.sellButtonSubtext}>{t('getBetterPrice')}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <VoiceNav navigation={navigation} currentScreen="Market" />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        fontSize: 18,
        color: '#E65100',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E65100',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    priceCard: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        elevation: 6,
        alignItems: 'center',
    },
    priceIcon: {
        fontSize: 48,
        marginRight: 15,
    },
    priceInfo: {
        flex: 1,
    },
    priceCrop: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    priceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    priceChange: {
        fontSize: 16,
        fontWeight: '600',
    },
    priceUp: {
        color: '#C8E6C9',
    },
    priceDown: {
        color: '#FFCDD2',
    },
    sellCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        marginBottom: 100,
        elevation: 4,
    },
    sellTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    sellSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    sellOptions: {
        gap: 15,
    },
    sellButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    sellButtonGradient: {
        padding: 20,
        alignItems: 'center',
    },
    sellButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    sellButtonValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    sellButtonSubtext: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
    },
});
