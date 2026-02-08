import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import * as Speech from 'expo-speech';
import TranslationService from '../services/TranslationService';

export default function VoiceNav({ navigation, currentScreen }) {
    const [isListening, setIsListening] = useState(false);
    const [pulseAnim] = useState(new Animated.Value(1));
    const t = (key) => TranslationService.t(key);

    const speak = (text) => {
        const isHindi = TranslationService.lang === 'hi';
        Speech.speak(text, {
            language: isHindi ? 'hi-IN' : 'en-US',
            pitch: 1.0,
            rate: 0.9
        });
    };

    const handleVoicePress = () => {
        setIsListening(true);

        // Pulse animation
        Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 1.3,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();

        // Speak current screen info
        const screenInfo = {
            Home: t('voiceNavHome'),
            Farm: t('voiceNavFarm'),
            Market: t('voiceNavMarket'),
            Cooperative: t('voiceNavCooperative'),
            // Add other screens if needed
        };

        const message = screenInfo[currentScreen] || t('welcomeApp');
        speak(message);

        setTimeout(() => setIsListening(false), 2000);
    };

    const navigateByVoice = (destination) => {
        const isHindi = TranslationService.lang === 'hi';
        const navText = isHindi
            ? `${destination} ${t('navigatingTo')}`
            : `${t('navigatingTo')} ${destination}`;

        speak(navText);
        navigation.navigate(destination);
    };

    return (
        <View style={styles.container}>
            {/* Main Voice Button */}
            <Animated.View style={[styles.voiceButton, { transform: [{ scale: pulseAnim }] }]}>
                <TouchableOpacity
                    onPress={handleVoicePress}
                    style={[
                        styles.voiceButtonInner,
                        isListening && styles.voiceButtonActive
                    ]}
                >
                    <Text style={styles.voiceIcon}>{isListening ? '🎤' : '🔊'}</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Quick Voice Nav Buttons */}
            {currentScreen === 'Home' && (
                <View style={styles.quickNav}>
                    <TouchableOpacity
                        style={styles.quickButton}
                        onPress={() => navigateByVoice('Farm')}
                    >
                        <Text style={styles.quickIcon}>🚜</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickButton}
                        onPress={() => navigateByVoice('Market')}
                    >
                        <Text style={styles.quickIcon}>🏪</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickButton}
                        onPress={() => navigateByVoice('Cooperative')}
                    >
                        <Text style={styles.quickIcon}>👥</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
    },
    voiceButton: {
        marginBottom: 10,
    },
    voiceButtonInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    voiceButtonActive: {
        backgroundColor: '#FF5722',
    },
    voiceIcon: {
        fontSize: 32,
    },
    quickNav: {
        flexDirection: 'row',
        gap: 10,
    },
    quickButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    quickIcon: {
        fontSize: 24,
    },
});
