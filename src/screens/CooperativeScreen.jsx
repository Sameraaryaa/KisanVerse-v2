import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import VoiceNav from '../components/VoiceNav';
import TranslationService from '../services/TranslationService';

export default function CooperativeScreen({ navigation }) {
    const t = (key) => TranslationService.t(key);

    const speak = (text) => {
        const lang = TranslationService.lang === 'hi' ? 'hi-IN' : 'en-US';
        Speech.speak(text, { language: lang, rate: 0.9 });
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#E3F2FD', '#BBDEFB']}
                style={styles.background}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← {t('back')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>👥 {t('cooperative')}</Text>
                </View>

                <ScrollView style={styles.content}>
                    {/* Savings Card */}
                    <LinearGradient
                        colors={['#2196F3', '#1976D2']}
                        style={styles.card}
                    >
                        <Text style={styles.cardIcon}>💰</Text>
                        <Text style={styles.cardTitle}>{t('mySavings')}</Text>
                        <Text style={styles.cardValue}>₹ 5,000</Text>
                        <Text style={styles.cardSubtitle}>{t('weekly')}: ₹ 200</Text>
                    </LinearGradient>

                    {/* Reputation */}
                    <View style={styles.reputationCard}>
                        <Text style={styles.reputationTitle}>{t('reputationScore')}</Text>
                        <Text style={styles.reputationValue}>⭐⭐⭐⭐☆</Text>
                        <Text style={styles.reputationText}>{t('veryGood')} (4/5)</Text>
                    </View>

                    {/* Loan Options */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('loanOptions')}</Text>

                        <TouchableOpacity
                            onPress={() => speak(t('cooperativeLoan'))}
                        >
                            <LinearGradient
                                colors={['#4CAF50', '#45a049']}
                                style={styles.loanCard}
                            >
                                <Text style={styles.loanTitle}>{t('cooperativeLoan')}</Text>
                                <Text style={styles.loanRate}>6% {t('interestRate')}</Text>
                                <Text style={styles.loanAmount}>{t('available')}: ₹ 50,000</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => speak(t('bankLoan'))}
                        >
                            <LinearGradient
                                colors={['#FF9800', '#F57C00']}
                                style={styles.loanCard}
                            >
                                <Text style={styles.loanTitle}>{t('bankLoan')}</Text>
                                <Text style={styles.loanRate}>8% {t('interestRate')}</Text>
                                <Text style={styles.loanAmount}>{t('available')}: ₹ 1,00,000</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Community Activities */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('communityActivities')}</Text>

                        <View style={styles.activityCard}>
                            <Text style={styles.activityIcon}>🌾</Text>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>{t('newInvestment')}</Text>
                                <Text style={styles.activityText}>{t('coldStorage')} - ₹ 50,000</Text>
                            </View>
                        </View>

                        <View style={styles.activityCard}>
                            <Text style={styles.activityIcon}>👨‍🌾</Text>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>{t('newMembers')}</Text>
                                <Text style={styles.activityText}>Ram Kumar {t('joined')}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <VoiceNav navigation={navigation} currentScreen="Cooperative" />
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
        color: '#0D47A1',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0D47A1',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        elevation: 8,
        alignItems: 'center',
    },
    cardIcon: {
        fontSize: 48,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        color: 'white',
        opacity: 0.9,
        marginBottom: 5,
    },
    cardValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.8,
    },
    reputationCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
        alignItems: 'center',
    },
    reputationTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    reputationValue: {
        fontSize: 32,
        marginBottom: 5,
    },
    reputationText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    loanCard: {
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        elevation: 4,
    },
    loanTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    loanRate: {
        fontSize: 16,
        color: 'white',
        opacity: 0.9,
        marginBottom: 5,
    },
    loanAmount: {
        fontSize: 14,
        color: 'white',
        opacity: 0.8,
    },
    activityCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },
    activityIcon: {
        fontSize: 32,
        marginRight: 15,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 3,
    },
    activityText: {
        fontSize: 14,
        color: '#666',
    },
});
