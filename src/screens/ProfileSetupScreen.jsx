import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import TranslationService from '../services/TranslationService';

export default function ProfileSetupScreen({ onComplete }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const t = (key) => TranslationService.t(key);
    const isHindi = TranslationService.lang === 'hi';

    const states = [
        '🌾 Punjab', '🌾 Haryana', '🌾 Uttar Pradesh', '🌾 Maharashtra',
        '🌾 Karnataka', '🌾 Tamil Nadu', '🌾 Gujarat', '🌾 Rajasthan',
        '🌾 Madhya Pradesh', '🌾 Bihar', '🌾 West Bengal', '🌾 Andhra Pradesh'
    ];

    const farmSizes = [
        { label: 'Small (< 2 acres)', labelHindi: 'छोटा (< 2 एकड़)', value: 'small', icon: '🌱' },
        { label: 'Medium (2-10 acres)', labelHindi: 'मध्यम (2-10 एकड़)', value: 'medium', icon: '🌾' },
        { label: 'Large (> 10 acres)', labelHindi: 'बड़ा (> 10 एकड़)', value: 'large', icon: '🚜' },
    ];

    const handleComplete = () => {
        if (name && location && farmSize) {
            const successText = isHindi
                ? 'प्रोफ़ाइल सेटअप पूर्ण हुआ। स्वागत है किसानवर्स में!'
                : 'Profile setup complete. Welcome to KisanVerse!';
            const lang = isHindi ? 'hi-IN' : 'en-US';
            Speech.speak(successText, { language: lang });
            onComplete({ name, location, farmSize });
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
                        <Text style={styles.emoji}>👨‍🌾</Text>
                        <Text style={styles.title}>{t('setUpProfile')}</Text>
                        <Text style={styles.subtitle}>{t('createProfile')}</Text>
                        <View style={styles.progressDots}>
                            <View style={styles.dot} />
                            <View style={[styles.dot, styles.dotActive]} />
                            <View style={styles.dot} />
                        </View>
                    </View>

                    {/* Name Input */}
                    <View style={styles.section}>
                        <Text style={styles.label}>{t('yourName')}</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputIcon}>👤</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('enterName')}
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                    </View>

                    {/* Location Selection */}
                    <View style={styles.section}>
                        <Text style={styles.label}>{t('yourState')}</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.statesScroll}
                        >
                            {states.map((state, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setLocation(state)}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={location === state ? ['#10b981', '#059669'] : ['#ffffff', '#f9fafb']}
                                        style={styles.stateChip}
                                    >
                                        <Text style={[
                                            styles.stateText,
                                            location === state && styles.stateTextSelected
                                        ]}>
                                            {state}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Farm Size */}
                    <View style={styles.section}>
                        <Text style={styles.label}>{t('farmSize')}</Text>
                        <View style={styles.farmSizeGrid}>
                            {farmSizes.map((size, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setFarmSize(size.value)}
                                    activeOpacity={0.8}
                                    style={styles.farmSizeCard}
                                >
                                    <LinearGradient
                                        colors={farmSize === size.value ? ['#10b981', '#059669'] : ['#ffffff', '#f9fafb']}
                                        style={styles.farmSizeGradient}
                                    >
                                        <Text style={styles.farmSizeIcon}>{size.icon}</Text>
                                        <Text style={[
                                            styles.farmSizeLabel,
                                            farmSize === size.value && styles.farmSizeLabelSelected
                                        ]}>
                                            {isHindi ? size.labelHindi : size.label}
                                        </Text>
                                        <Text style={[
                                            styles.farmSizeLabelEn,
                                            farmSize === size.value && styles.farmSizeLabelEnSelected
                                        ]}>
                                            {isHindi ? size.label : size.labelHindi}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Complete Button */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={handleComplete}
                            disabled={!name || !location || !farmSize}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={(name && location && farmSize) ? ['#10b981', '#059669'] : ['#d1d5db', '#9ca3af']}
                                style={styles.completeButton}
                            >
                                <Text style={styles.completeText}>{t('completeSetup')} ✓</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    emoji: {
        fontSize: 64,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#047857',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#059669',
        marginBottom: 24,
    },
    progressDots: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#d1d5db',
    },
    dotActive: {
        backgroundColor: '#10b981',
        width: 24,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: '#047857',
        marginBottom: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    inputIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1f2937',
    },
    statesScroll: {
        paddingRight: 20,
        gap: 8,
    },
    stateChip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    stateText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
    },
    stateTextSelected: {
        color: 'white',
    },
    farmSizeGrid: {
        gap: 12,
    },
    farmSizeCard: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    farmSizeGradient: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    farmSizeIcon: {
        fontSize: 32,
        marginRight: 16,
    },
    farmSizeLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
    },
    farmSizeLabelSelected: {
        color: 'white',
    },
    farmSizeLabelEn: {
        fontSize: 13,
        color: '#6b7280',
    },
    farmSizeLabelEnSelected: {
        color: 'rgba(255,255,255,0.9)',
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    completeButton: {
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    completeText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginBottom: 4,
    },
    completeTextHindi: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
});
