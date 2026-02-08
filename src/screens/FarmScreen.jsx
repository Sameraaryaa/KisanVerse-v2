import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import VoiceNav from '../components/VoiceNav';
import TranslationService from '../services/TranslationService';

export default function FarmScreen({ navigation }) {
    const t = (key) => TranslationService.t(key);

    const speak = (text) => {
        const lang = TranslationService.lang === 'hi' ? 'hi-IN' : 'en-US';
        Speech.speak(text, { language: lang, rate: 0.9 });
    };

    const cropData = {
        name: t('cropName'),
        stage: t('growingStage'),
        health: 85,
        days: 45,
        totalDays: 90,
        expectedYield: '50' + t('perQuintal'),
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#E8F5E9', '#C8E6C9']}
                style={styles.background}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← {t('back')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>🚜 {t('myFarm')}</Text>
                </View>

                <ScrollView style={styles.content}>
                    {/* Crop Card */}
                    <LinearGradient
                        colors={['#4CAF50', '#45a049']}
                        style={styles.cropCard}
                    >
                        <Text style={styles.cropIcon}>🌾</Text>
                        <Text style={styles.cropName}>{cropData.name}</Text>
                        <Text style={styles.cropStage}>{cropData.stage}</Text>

                        {/* Health Bar */}
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>{t('health')}:</Text>
                            <View style={styles.bar}>
                                <View style={[styles.barFill, { width: `${cropData.health}%` }]} />
                            </View>
                            <Text style={styles.statValue}>{cropData.health}%</Text>
                        </View>

                        {/* Progress */}
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>{t('days')}:</Text>
                            <View style={styles.bar}>
                                <View style={[styles.barFill, { width: `${(cropData.days / cropData.totalDays) * 100}%` }]} />
                            </View>
                            <Text style={styles.statValue}>{cropData.days}/{cropData.totalDays}</Text>
                        </View>

                        <Text style={styles.yield}>{t('expectedYield')}: {cropData.expectedYield}</Text>
                    </LinearGradient>

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => speak(t('waterCrop'))}
                        >
                            <Text style={styles.actionIcon}>💧</Text>
                            <Text style={styles.actionText}>{t('waterCrop')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => speak(t('addFertilizer'))}
                        >
                            <Text style={styles.actionIcon}>🌱</Text>
                            <Text style={styles.actionText}>{t('addFertilizer')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => speak(t('buyInsurance'))}
                        >
                            <Text style={styles.actionIcon}>☔</Text>
                            <Text style={styles.actionText}>{t('buyInsurance')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <VoiceNav navigation={navigation} currentScreen="Farm" />
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
        color: '#1B5E20',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1B5E20',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    cropCard: {
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        elevation: 8,
    },
    cropIcon: {
        fontSize: 64,
        textAlign: 'center',
        marginBottom: 15,
    },
    cropName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 5,
    },
    cropStage: {
        fontSize: 16,
        color: 'white',
        opacity: 0.9,
        textAlign: 'center',
        marginBottom: 20,
    },
    stat: {
        marginBottom: 15,
    },
    statLabel: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
        marginBottom: 5,
    },
    bar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 5,
    },
    barFill: {
        height: '100%',
        backgroundColor: 'white',
    },
    statValue: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    yield: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 100,
    },
    actionButton: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 4,
    },
    actionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    actionText: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '600',
    },
});
