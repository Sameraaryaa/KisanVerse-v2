import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TranslationService from '../services/TranslationService';

export default function DigitalLockerScreen({ navigation }) {
    const t = (key) => TranslationService.t(key);
    const isHindi = TranslationService.lang === 'hi';

    const documents = [
        { id: 1, name: 'Land Record (7/12)', nameHi: 'भूमि रिकॉर्ड (7/12)', type: 'PDF', date: '12 Jan 2025', status: 'verified' },
        { id: 2, name: 'Aadhar Card', nameHi: 'आधार कार्ड', type: 'JPG', date: '10 Feb 2024', status: 'verified' },
        { id: 3, name: 'Soil Health Card', nameHi: 'मृदा स्वास्थ्य कार्ड', type: 'PDF', date: '05 Mar 2025', status: 'pending' },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#E0F7FA', '#B2EBF2']}
                style={styles.background}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← {t('back')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>📁 {t('digitalLocker')}</Text>
                </View>

                <ScrollView style={styles.content}>
                    <Text style={styles.subtitle}>{t('myDocuments') || 'My Documents'}</Text>

                    <View style={styles.docList}>
                        {documents.map((doc) => (
                            <View key={doc.id} style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <Text style={{ fontSize: 32 }}>📄</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{isHindi ? doc.nameHi : doc.name}</Text>
                                    <Text style={styles.cardSubtitle}>{doc.type} • {doc.date}</Text>
                                </View>
                                <View style={styles.cardStatus}>
                                    {doc.status === 'verified' ? (
                                        <Text style={styles.verified}>✓ {t('verified') || 'Verified'}</Text>
                                    ) : (
                                        <Text style={styles.pending}>⏳ {t('pending') || 'Pending'}</Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.uploadButton}>
                        <LinearGradient
                            colors={['#0097A7', '#00838F']}
                            style={styles.uploadGradient}
                        >
                            <Text style={styles.uploadText}>+ {t('uploadDocument') || 'Upload Document'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        color: '#006064',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#006064',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#00838F',
        marginBottom: 15,
    },
    docList: {
        gap: 15,
        marginBottom: 100,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardIcon: {
        width: 50,
        height: 50,
        backgroundColor: '#E0F2F1',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    cardStatus: {
        marginLeft: 10,
    },
    verified: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 12,
    },
    pending: {
        color: '#FF9800',
        fontWeight: 'bold',
        fontSize: 12,
    },
    uploadButton: {
        marginTop: 20,
        marginBottom: 40,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 6,
    },
    uploadGradient: {
        padding: 16,
        alignItems: 'center',
    },
    uploadText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
