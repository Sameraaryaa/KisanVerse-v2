import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 60 = padding left + padding right + gap

export default function LanguageSelectionScreen({ navigation, onComplete }) {
    const [selectedLang, setSelectedLang] = useState(null);

    const languages = [
        {
            code: 'hi',
            name: 'हिन्दी',
            nameEn: 'Hindi',
            icon: '🇮🇳',
            gradient: ['#FF9933', '#138808'],
        },
        {
            code: 'en',
            name: 'English',
            nameEn: 'English',
            icon: '🌏',
            gradient: ['#3b82f6', '#1d4ed8'],
        },
        {
            code: 'pa',
            name: 'ਪੰਜਾਬੀ',
            nameEn: 'Punjabi',
            icon: '🌾',
            gradient: ['#f59e0b', '#d97706'],
        },
        {
            code: 'mr',
            name: 'मराठी',
            nameEn: 'Marathi',
            icon: '🏔️',
            gradient: ['#8b5cf6', '#6d28d9'],
        },
        {
            code: 'ta',
            name: 'தமிழ்',
            nameEn: 'Tamil',
            icon: '🌺',
            gradient: ['#ec4899', '#be185d'],
        },
        {
            code: 'te',
            name: 'తెలుగు',
            nameEn: 'Telugu',
            icon: '🌸',
            gradient: ['#06b6d4', '#0891b2'],
        },
    ];

    const handleSelect = (lang) => {
        setSelectedLang(lang.code);
        Speech.speak(lang.nameEn + ' selected', { language: 'en-US' });
    };

    const handleContinue = () => {
        if (selectedLang) {
            onComplete({ language: selectedLang });
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
                style={styles.background}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.emoji}>🌾</Text>
                        <Text style={styles.title}>Choose Language</Text>
                        <Text style={styles.subtitle}>भाषा चुनें</Text>

                        {/* Progress */}
                        <View style={styles.progressContainer}>
                            <View style={[styles.progressDot, styles.progressDotActive]} />
                            <View style={styles.progressDot} />
                            <View style={styles.progressDot} />
                        </View>
                    </View>

                    {/* Language Grid */}
                    <View style={styles.grid}>
                        {languages.map((lang) => {
                            const isSelected = selectedLang === lang.code;
                            return (
                                <TouchableOpacity
                                    key={lang.code}
                                    onPress={() => handleSelect(lang)}
                                    activeOpacity={0.7}
                                    style={styles.cardWrapper}
                                >
                                    <LinearGradient
                                        colors={isSelected ? lang.gradient : ['#ffffff', '#f9fafb']}
                                        style={styles.card}
                                    >
                                        <Text style={styles.cardIcon}>{lang.icon}</Text>
                                        <Text style={[styles.cardName, isSelected && styles.cardNameSelected]}>
                                            {lang.name}
                                        </Text>
                                        <Text style={[styles.cardNameEn, isSelected && styles.cardNameEnSelected]}>
                                            {lang.nameEn}
                                        </Text>
                                        {isSelected && (
                                            <View style={styles.check}>
                                                <Text style={styles.checkText}>✓</Text>
                                            </View>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Continue Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleContinue}
                            disabled={!selectedLang}
                            activeOpacity={0.8}
                            style={styles.buttonWrapper}
                        >
                            <LinearGradient
                                colors={selectedLang ? ['#10b981', '#059669'] : ['#d1d5db', '#9ca3af']}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Continue • आगे बढ़ें →</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    emoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#047857',
        marginBottom: 6,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#059669',
        marginBottom: 20,
        textAlign: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#d1d5db',
        marginHorizontal: 4,
    },
    progressDotActive: {
        backgroundColor: '#10b981',
        width: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: cardWidth,
        marginBottom: 16,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        minHeight: 150,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardIcon: {
        fontSize: 40,
        marginBottom: 12,
    },
    cardName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 4,
        textAlign: 'center',
    },
    cardNameSelected: {
        color: '#ffffff',
    },
    cardNameEn: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
    cardNameEnSelected: {
        color: 'rgba(255,255,255,0.9)',
    },
    check: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '700',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    buttonWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#10b981',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    button: {
        padding: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
    },
});
