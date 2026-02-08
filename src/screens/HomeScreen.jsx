import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslationService from '../services/TranslationService';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const t = (key) => TranslationService.t(key);

    const features = [
        {
            icon: '🚜',
            title: t('farm'),
            subtitle: t('manageCrops'),
            screen: 'Farm',
            gradient: ['#10b981', '#059669'],
            iconBg: '#d1fae5'
        },
        {
            icon: '📋',
            title: t('schemes'),
            subtitle: t('govtBenefits'),
            screen: 'SchemeMitra',
            gradient: ['#3b82f6', '#2563eb'],
            iconBg: '#dbeafe'
        },
        {
            icon: '🏪',
            title: t('market'),
            subtitle: t('sellProduce'),
            screen: 'Market',
            gradient: ['#f59e0b', '#d97706'],
            iconBg: '#fef3c7'
        },
        {
            icon: '👥',
            title: t('community'),
            subtitle: t('connectSave'),
            screen: 'Cooperative',
            gradient: ['#8b5cf6', '#7c3aed'],
            iconBg: '#ede9fe'
        },
    ];

    const quickStats = [
        { label: t('savings'), value: '₹5,000', color: '#10b981', icon: '💰' },
        { label: t('loans'), value: '₹0', color: '#ef4444', icon: '📊' },
        { label: t('crops'), value: '2', color: '#f59e0b', icon: '🌾' },
    ];

    const menuItems = [
        { icon: '🚜', title: t('farmManagement'), screen: 'Farm' },
        { icon: '🤖', title: t('aiCropDoctor'), screen: 'CropDoctor' },
        { icon: '📋', title: t('schemeMitra'), screen: 'SchemeMitra' },
        { icon: '🏪', title: t('smartMarketplace'), screen: 'Marketplace' },
        { icon: '🚁', title: t('logisticsServices'), screen: 'Logistics' },

        { icon: '👥', title: t('community'), screen: 'Cooperative' },
        { icon: '💰', title: t('financeLoans'), screen: 'Cooperative' },
        { icon: '📁', title: t('digitalLocker'), screen: 'DigitalLocker' },
        { icon: '🎁', title: t('rewards'), screen: 'Rewards' },
        { icon: '⚙️', title: t('settings'), screen: 'Settings' },
    ];

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.clear();
                        // You'll need to add navigation to restart the app
                        // For now, we'll just close menu
                        setMenuOpen(false);
                        Alert.alert('Logged out', 'Please restart the app');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
                style={styles.background}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setMenuOpen(true)}
                    >
                        <View style={styles.menuIconContainer}>
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.greeting}>{t('greeting')}</Text>
                        <Text style={styles.headerTitle}>{t('appName')}</Text>
                    </View>

                    <TouchableOpacity style={styles.profileButton}>
                        <LinearGradient
                            colors={['#10b981', '#059669']}
                            style={styles.profileGradient}
                        >
                            <Text style={styles.profileText}>K</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Wallet Card */}
                    <View style={styles.walletContainer}>
                        <LinearGradient
                            colors={['rgba(16, 185, 129, 0.95)', 'rgba(5, 150, 105, 0.95)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.walletCard}
                        >
                            <View style={styles.walletHeader}>
                                <View>
                                    <Text style={styles.walletLabel}>{t('totalBalance')}</Text>
                                </View>
                                <View style={styles.walletIconCircle}>
                                    <Text style={styles.walletIcon}>💰</Text>
                                </View>
                            </View>

                            <Text style={styles.walletAmount}>₹ 25,000</Text>

                            <View style={styles.statsRow}>
                                {quickStats.map((stat, index) => (
                                    <View key={index} style={styles.statItem}>
                                        <View style={[styles.statIconCircle, { backgroundColor: `${stat.color}20` }]}>
                                            <Text style={styles.statIcon}>{stat.icon}</Text>
                                        </View>
                                        <Text style={styles.statValue}>{stat.value}</Text>
                                        <Text style={styles.statLabel}>{stat.label}</Text>
                                    </View>
                                ))}
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Section Title */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('quickAccess')}</Text>
                    </View>

                    {/* Features Grid */}
                    <View style={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <View
                                key={index}
                                style={styles.featureCardContainer}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => navigation.navigate(feature.screen)}
                                >
                                    <LinearGradient
                                        colors={[...feature.gradient, `${feature.gradient[1]}ee`]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.featureCard}
                                    >
                                        <View style={[styles.featureIconCircle, { backgroundColor: feature.iconBg }]}>
                                            <Text style={styles.featureIcon}>{feature.icon}</Text>
                                        </View>
                                        <Text style={styles.featureTitle}>{feature.title}</Text>
                                        <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                                        <View style={styles.featureArrow}>
                                            <Text style={styles.arrowText}>→</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Season Progress */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('seasonProgress')}</Text>
                    </View>

                    <View style={styles.seasonCard}>
                        <View style={styles.seasonHeader}>
                            <View style={styles.seasonIconCircle}>
                                <Text style={styles.seasonIcon}>🌱</Text>
                            </View>
                            <View style={styles.seasonInfo}>
                                <Text style={styles.seasonTitle}>{t('kharifSeason')}</Text>
                            </View>
                            <View style={styles.seasonBadge}>
                                <Text style={styles.seasonBadgeText}>45 {t('days')}</Text>
                            </View>
                        </View>

                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <LinearGradient
                                    colors={['#10b981', '#059669']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.progressFill, { width: '37.5%' }]}
                                />
                            </View>
                            <Text style={styles.progressText}>37% {t('complete')}</Text>
                        </View>

                        <View style={styles.cropStatus}>
                            <Text style={styles.cropStatusText}>🌾 {t('riceGrowing')}</Text>
                        </View>
                    </View>

                    {/* Alert Card */}
                    <TouchableOpacity
                        style={styles.alertCard}
                        onPress={() => navigation.navigate('SchemeMitra')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#fef3c7', '#fde68a']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.alertGradient}
                        >
                            <View style={styles.alertIconCircle}>
                                <Text style={styles.alertIcon}>📢</Text>
                            </View>
                            <View style={styles.alertContent}>
                                <Text style={styles.alertTitle}>{t('newScheme')}</Text>
                                <Text style={styles.alertSubtitle}>{t('pmKisanReleased')}</Text>
                            </View>
                            <View style={styles.alertArrow}>
                                <Text style={styles.alertArrowText}>→</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ height: 100 }} />
                </ScrollView>

                {/* Floating Voice Button */}
                <View style={styles.voiceButton}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#8b5cf6', '#7c3aed']}
                            style={styles.voiceGradient}
                        >
                            <Text style={styles.voiceIcon}>🎤</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Side Menu */}
                <Modal
                    visible={menuOpen}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setMenuOpen(false)}
                >
                    <View style={styles.modalOverlay}>
                        <TouchableOpacity
                            style={styles.modalBg}
                            activeOpacity={1}
                            onPress={() => setMenuOpen(false)}
                        />
                        <View style={styles.menuDrawer}>
                            <LinearGradient
                                colors={['#10b981', '#059669']}
                                style={styles.menuHeader}
                            >
                                <View>
                                    <Text style={styles.menuTitle}>{t('appName')}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setMenuOpen(false)}>
                                    <View style={styles.closeButton}>
                                        <Text style={styles.closeText}>✕</Text>
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>

                            <ScrollView style={styles.menuScroll} bounces={false}>
                                {menuItems.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.menuItem}
                                        onPress={() => {
                                            setMenuOpen(false);
                                            if (item.screen === 'Settings') {
                                                navigation.navigate('Settings');
                                            } else if (item.screen !== 'Home') {
                                                navigation.navigate(item.screen);
                                            }
                                        }}
                                    >
                                        <View style={styles.menuItemIcon}>
                                            <Text style={styles.menuItemIconText}>{item.icon}</Text>
                                        </View>
                                        <View style={styles.menuItemText}>
                                            <Text style={styles.menuItemTitle}>{item.title}</Text>
                                        </View>
                                        <Text style={styles.menuItemArrow}>→</Text>
                                    </TouchableOpacity>
                                ))}

                                {/* Logout Button */}
                                <TouchableOpacity
                                    style={[styles.menuItem, styles.logoutItem]}
                                    onPress={handleLogout}
                                >
                                    <View style={[styles.menuItemIcon, styles.logoutIcon]}>
                                        <Text style={styles.menuItemIconText}>🚪</Text>
                                    </View>
                                    <View style={styles.menuItemText}>
                                        <Text style={[styles.menuItemTitle, styles.logoutText]}>Logout</Text>
                                    </View>
                                    <Text style={[styles.menuItemArrow, styles.logoutText]}>→</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    menuButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    menuIconContainer: {
        gap: 4,
    },
    menuLine: {
        width: 20,
        height: 2.5,
        backgroundColor: '#10b981',
        borderRadius: 2,
    },
    headerCenter: {
        alignItems: 'center',
    },
    greeting: {
        fontSize: 14,
        color: '#059669',
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#047857',
    },
    profileButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    profileGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    scrollView: {
        flex: 1,
    },
    walletContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    walletCard: {
        borderRadius: 24,
        padding: 24,
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 12,
    },
    walletHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    walletLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    walletIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    walletIcon: {
        fontSize: 24,
    },
    walletAmount: {
        fontSize: 42,
        fontWeight: '800',
        color: 'white',
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: 16,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statIcon: {
        fontSize: 18,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#047857',
        marginBottom: 4,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 14,
        gap: 12,
        marginBottom: 24,
    },
    featureCardContainer: {
        width: (width - 52) / 2,
    },
    featureCard: {
        borderRadius: 20,
        padding: 20,
        aspectRatio: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 10,
    },
    featureIconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureIcon: {
        fontSize: 28,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginBottom: 4,
    },
    featureSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 12,
    },
    featureArrow: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    seasonCard: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    seasonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    seasonIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#d1fae5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    seasonIcon: {
        fontSize: 24,
    },
    seasonInfo: {
        flex: 1,
    },
    seasonTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#047857',
        marginBottom: 2,
    },
    seasonBadge: {
        backgroundColor: '#d1fae5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    seasonBadgeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#047857',
    },
    progressContainer: {
        marginBottom: 16,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
    },
    cropStatus: {
        backgroundColor: '#f0fdf4',
        padding: 12,
        borderRadius: 12,
    },
    cropStatusText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#047857',
        marginBottom: 2,
    },
    alertCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    alertGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    alertIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    alertIcon: {
        fontSize: 24,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#78350f',
        marginBottom: 4,
    },
    alertSubtitle: {
        fontSize: 13,
        color: '#92400e',
        marginBottom: 2,
    },
    alertArrow: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertArrowText: {
        fontSize: 18,
        color: '#78350f',
        fontWeight: '600',
    },
    voiceButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        shadowColor: '#8b5cf6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 16,
    },
    voiceGradient: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voiceIcon: {
        fontSize: 28,
    },
    modalOverlay: {
        flex: 1,
        flexDirection: 'row',
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    menuDrawer: {
        width: '85%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 20,
    },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingTop: 60,
    },
    menuTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: 'white',
        marginBottom: 4,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 24,
        color: 'white',
        fontWeight: '600',
    },
    menuScroll: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuItemIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#f0fdf4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuItemIconText: {
        fontSize: 24,
    },
    menuItemText: {
        flex: 1,
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 2,
    },
    menuItemArrow: {
        fontSize: 20,
        color: '#d1d5db',
        fontWeight: '600',
    },
    logoutItem: {
        marginTop: 10,
    },
    logoutIcon: {
        backgroundColor: '#fee2e2',
    },
    logoutText: {
        color: '#dc2626',
    },
});
