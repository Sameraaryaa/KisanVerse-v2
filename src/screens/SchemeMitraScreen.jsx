import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import TranslationService from '../services/TranslationService';

export default function SchemeMitraScreen({ navigation }) {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const t = (key) => TranslationService.t(key);
    const isHindi = TranslationService.lang === 'hi';

    useEffect(() => {
        loadSchemes();
        const introText = isHindi ? 'स्कीम मित्र। सरकारी योजनाएं देखें।' : 'Scheme Mitra. View government schemes.';
        const lang = isHindi ? 'hi-IN' : 'en-US';
        Speech.speak(introText, { language: lang, rate: 0.9 });
    }, []);

    const loadSchemes = () => {
        // Real Indian farmer schemes
        const realSchemes = [
            {
                id: 1,
                name: 'PM-KISAN',
                nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
                icon: '💰',
                amount: '₹6,000/year',
                amountHindi: '₹6,000/वर्ष',
                description: 'Direct income support of ₹6000 per year in 3 installments',
                descriptionHindi: 'प्रति वर्ष ₹6000 की सीधी आय सहायता',
                eligibility: 'All farmer families with cultivable land',
                eligibilityHindi: 'खेती योग्य भूमि वाले सभी किसान परिवार',
                applyUrl: 'https://pmkisan.gov.in',
                status: 'eligible'
            },
            {
                id: 2,
                name: 'PMFBY',
                nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
                icon: '☔',
                amount: 'Crop Insurance',
                amountHindi: 'फसल बीमा',
                description: 'Crop insurance against natural disasters',
                descriptionHindi: 'प्राकृतिक आपदाओं से फसल बीमा',
                eligibility: 'All farmers growing notified crops',
                eligibilityHindi: 'अधिसूचित फसलें उगाने वाले सभी किसान',
                applyUrl: 'https://pmfby.gov.in',
                status: 'apply'
            },
            {
                id: 3,
                name: 'Kisan Credit Card',
                nameHindi: 'किसान क्रेडिट कार्ड',
                icon: '💳',
                amount: 'Loan up to ₹3L',
                amountHindi: 'ऋण ₹3 लाख तक',
                description: 'Short term credit up to ₹3 lakh at 4% interest',
                descriptionHindi: '4% ब्याज पर ₹3 लाख तक का अल्पकालिक ऋण',
                eligibility: 'Farmers with land ownership documents',
                eligibilityHindi: 'भूमि स्वामित्व दस्तावेज वाले किसान',
                applyUrl: 'https://www.india.gov.in/spotlight/kisan-credit-card-kcc',
                status: 'apply'
            },
            {
                id: 4,
                name: 'Soil Health Card',
                nameHindi: 'मृदा स्वास्थ्य कार्ड',
                icon: '🌱',
                amount: 'Free',
                amountHindi: 'निःशुल्क',
                description: 'Free soil testing and recommendations',
                descriptionHindi: 'निःशुल्क मिट्टी परीक्षण और सिफारिशें',
                eligibility: 'All farmers',
                eligibilityHindi: 'सभी किसान',
                applyUrl: 'https://soilhealth.dac.gov.in/',
                status: 'eligible'
            },
            {
                id: 5,
                name: 'PM Kisan Maandhan',
                nameHindi: 'पीएम किसान मानधन',
                icon: '👴',
                amount: '₹3,000/month',
                amountHindi: '₹3,000/माह पेंशन',
                description: 'Pension of ₹3000/month after 60 years',
                descriptionHindi: '60 वर्ष के बाद ₹3000/माह पेंशन',
                eligibility: 'Small & marginal farmers (18-40 years)',
                eligibilityHindi: 'लघु और सीमांत किसान (18-40 वर्ष)',
                applyUrl: 'https://maandhan.in/',
                status: 'apply'
            },
            {
                id: 6,
                name: 'e-NAM',
                nameHindi: 'राष्ट्रीय कृषि बाजार',
                icon: '🏪',
                amount: 'Online Market',
                amountHindi: 'ऑनलाइन बाजार',
                description: 'Online trading platform for agricultural produce',
                descriptionHindi: 'कृषि उपज के लिए ऑनलाइन ट्रेडिंग',
                eligibility: 'All farmers',
                eligibilityHindi: 'सभी किसान',
                applyUrl: 'https://www.enam.gov.in',
                status: 'eligible'
            },
            {
                id: 7,
                name: 'SMAM Kisan Yojana',
                nameHindi: 'कृषि यंत्र सब्सिडी',
                icon: '🚜',
                amount: '50-80% Subsidy',
                amountHindi: '50-80% सब्सिडी',
                description: 'Subsidy on farm machinery & equipment',
                descriptionHindi: 'कृषि मशीनरी और उपकरणों पर सब्सिडी',
                eligibility: 'All farmers',
                eligibilityHindi: 'सभी किसान',
                applyUrl: 'https://agrimachinery.nic.in/',
                status: 'apply'
            },
            {
                id: 8,
                name: 'Kisan Rath',
                nameHindi: 'किसान रथ',
                icon: '🚚',
                amount: 'Transport Help',
                amountHindi: 'परिवहन सहायता',
                description: 'Transport service for farmers to move produce',
                descriptionHindi: 'उपज परिवहन के लिए सेवा',
                eligibility: 'All farmers',
                eligibilityHindi: 'सभी किसान',
                applyUrl: 'https://kisanrath.nic.in/',
                status: 'eligible'
            }
        ];

        setSchemes(realSchemes);
        setLoading(false);
    };

    const openScheme = (scheme) => {
        const text = isHindi
            ? `${scheme.nameHindi} के लिए आवेदन खोल रहे हैं`
            : `Opening application for ${scheme.name}`;
        const lang = isHindi ? 'hi-IN' : 'en-US';
        Speech.speak(text, { language: lang });
        Linking.openURL(scheme.applyUrl);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'eligible': return ['#4CAF50', '#45a049'];
            case 'apply': return ['#2196F3', '#1976D2'];
            case 'applied': return ['#FF9800', '#F57C00'];
            default: return ['#9E9E9E', '#757575'];
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'eligible': return t('eligible') + ' ✓';
            case 'apply': return t('apply');
            case 'applied': return t('applied');
            default: return t('check');
        }
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
                    <Text style={styles.title}>📋 {t('schemeMitra')}</Text>
                    <Text style={styles.subtitle}>{t('govtSchemes')}</Text>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{schemes.filter(s => s.status === 'eligible').length}</Text>
                        <Text style={styles.statLabel}>{t('eligible')}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{schemes.filter(s => s.status === 'apply').length}</Text>
                        <Text style={styles.statLabel}>{t('apply')}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>{t('applied')}</Text>
                    </View>
                </View>

                {/* Schemes List */}
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {schemes.map((scheme) => (
                        <TouchableOpacity
                            key={scheme.id}
                            onPress={() => openScheme(scheme)}
                            activeOpacity={0.9}
                        >
                            <View style={styles.schemeCard}>
                                <LinearGradient
                                    colors={getStatusColor(scheme.status)}
                                    style={styles.schemeHeader}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.schemeIcon}>{scheme.icon}</Text>
                                    <View style={styles.schemeHeaderText}>
                                        <Text style={styles.schemeName}>
                                            {isHindi ? scheme.nameHindi : scheme.name}
                                        </Text>
                                        <Text style={styles.schemeNameEn}>
                                            {isHindi ? scheme.name : scheme.nameHindi}
                                        </Text>
                                    </View>
                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>{getStatusText(scheme.status)}</Text>
                                    </View>
                                </LinearGradient>

                                <View style={styles.schemeBody}>
                                    <View style={styles.schemeRow}>
                                        <Text style={styles.label}>{t('benefits')}:</Text>
                                        <Text style={styles.amount}>
                                            {isHindi && scheme.amountHindi ? scheme.amountHindi : scheme.amount}
                                        </Text>
                                    </View>

                                    <Text style={styles.description}>
                                        {isHindi ? scheme.descriptionHindi : scheme.description}
                                    </Text>

                                    <View style={styles.divider} />

                                    <Text style={styles.eligibilityLabel}>{t('eligibility')}:</Text>
                                    <Text style={styles.eligibility}>
                                        {isHindi ? scheme.eligibilityHindi : scheme.eligibility}
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.applyButton}
                                        onPress={() => openScheme(scheme)}
                                    >
                                        <Text style={styles.applyButtonText}>
                                            {scheme.status === 'eligible' ? '✓ ' + t('viewDetails') : '→ ' + t('applyNow')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>💡 {t('moreInfo')}:</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.india.gov.in/topics/agriculture')}>
                            <Text style={styles.footerLink}>india.gov.in/agriculture →</Text>
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
        paddingTop: 50,
        paddingHorizontal: 20,
        marginBottom: 15,
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
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#2E7D32',
        opacity: 0.8,
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 10,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        elevation: 2,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    schemeCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    schemeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    schemeIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    schemeHeaderText: {
        flex: 1,
    },
    schemeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 2,
    },
    schemeNameEn: {
        fontSize: 12,
        color: 'white',
        opacity: 0.9,
    },
    statusBadge: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
    schemeBody: {
        padding: 15,
    },
    schemeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        fontWeight: '600',
    },
    descriptionEn: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 12,
    },
    eligibilityLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 5,
    },
    eligibility: {
        fontSize: 13,
        color: '#333',
        marginBottom: 15,
    },
    applyButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    footer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        marginTop: 10,
        elevation: 2,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    footerLink: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: '600',
    },
});
