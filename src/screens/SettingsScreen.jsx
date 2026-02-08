import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslationService from '../services/TranslationService';

export default function SettingsScreen({ navigation }) {
    const [lang, setLang] = useState(TranslationService.lang);
    const t = (key) => TranslationService.t(key);

    const handleLanguageChange = async (newLang) => {
        TranslationService.setLanguage(newLang);
        setLang(newLang);

        try {
            const userData = await AsyncStorage.getItem('user_data');
            if (userData) {
                const parsed = JSON.parse(userData);
                parsed.language = newLang;
                await AsyncStorage.setItem('user_data', JSON.stringify(parsed));
            } else {
                await AsyncStorage.setItem('user_data', JSON.stringify({ language: newLang }));
            }
            Alert.alert(t('success') || 'Success', t('languageChanged') || 'Language updated. Please restart the app or navigate to Home.');
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            t('logout'),
            t('confirmLogout') || 'Are you sure?',
            [
                { text: t('cancel') || 'Cancel', style: 'cancel' },
                {
                    text: t('logout') || 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.clear();
                        // Ideally restart app, but here we can just go back or show alert
                        Alert.alert('Logged out', 'Please restart the app');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#F3E5F5', '#E1BEE7']}
                style={styles.background}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← {t('back')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>⚙️ {t('settings')}</Text>
                </View>

                <ScrollView style={styles.content}>
                    {/* Language Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('language') || 'Language'}</Text>
                        <View style={styles.card}>
                            <TouchableOpacity
                                style={[styles.langOption, lang === 'en' && styles.selectedLang]}
                                onPress={() => handleLanguageChange('en')}
                            >
                                <Text style={[styles.langText, lang === 'en' && styles.selectedLangText]}>English</Text>
                                {lang === 'en' && <Text style={styles.check}>✓</Text>}
                            </TouchableOpacity>
                            <View style={styles.divider} />
                            <TouchableOpacity
                                style={[styles.langOption, lang === 'hi' && styles.selectedLang]}
                                onPress={() => handleLanguageChange('hi')}
                            >
                                <Text style={[styles.langText, lang === 'hi' && styles.selectedLangText]}>हिंदी (Hindi)</Text>
                                {lang === 'hi' && <Text style={styles.check}>✓</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Profile Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('profile') || 'Profile'}</Text>
                        <View style={styles.card}>
                            <View style={styles.profileRow}>
                                <View style={styles.avatar}>
                                    <Text style={{ fontSize: 24, color: 'white' }}>👤</Text>
                                </View>
                                <View>
                                    <Text style={styles.profileName}>Kisan User</Text>
                                    <Text style={styles.profileDetail}>+91 9876543210</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editText}>{t('editProfile') || 'Edit Profile'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Logout */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>{t('logout') || 'Logout'}</Text>
                    </TouchableOpacity>

                    <Text style={styles.version}>Version 1.0.0</Text>
                </ScrollView>
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
        color: '#6A1B9A',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6A1B9A',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A148C',
        marginBottom: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    langOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    selectedLang: {
        backgroundColor: '#F3E5F5',
    },
    langText: {
        fontSize: 16,
        color: '#333',
    },
    selectedLangText: {
        fontWeight: 'bold',
        color: '#6A1B9A',
    },
    check: {
        color: '#6A1B9A',
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#AB47BC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    profileDetail: {
        color: '#666',
    },
    editButton: {
        padding: 12,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    editText: {
        color: '#6A1B9A',
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#FFEBEE',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    logoutButtonText: {
        color: '#D32F2F',
        fontWeight: 'bold',
        fontSize: 16,
    },
    version: {
        textAlign: 'center',
        color: '#999',
        fontSize: 12,
        marginBottom: 20,
    },
});
