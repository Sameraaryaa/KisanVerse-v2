import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TranslationService from '../services/TranslationService';

export default function LogisticsScreen({ navigation }) {
    const [activeService, setActiveService] = useState(null);
    const [bookingData, setBookingData] = useState({});
    const t = (key) => TranslationService.t(key);
    const isHindi = TranslationService.lang === 'hi';

    const services = [
        {
            id: 'drone',
            name: 'Drone Spraying',
            nameHindi: 'ड्रोन स्प्रेइंग',
            icon: '🚁',
            description: t('droneDesc') || 'Book drones for pesticide spraying',
            price: '₹500/acre',
            color: ['#3b82f6', '#2563eb']
        },
        {
            id: 'truck',
            name: 'Truck Booking',
            nameHindi: 'ट्रक बुकिंग',
            icon: '🚚',
            description: t('truckDesc') || 'Transport for your produce',
            price: '₹800/trip',
            color: ['#f59e0b', '#d97706']
        },
        {
            id: 'labor',
            name: 'Farm Labor',
            nameHindi: 'खेत मजदूर',
            icon: '👷',
            description: t('laborDesc') || 'Hire skilled farm workers',
            price: '₹400/day',
            color: ['#10b981', '#059669']
        },
    ];

    const droneProviders = [
        { id: 1, name: 'AgriDrone Services', rating: 4.8, trips: 245, price: 500, available: true },
        { id: 2, name: 'FarmFly Drones', rating: 4.6, trips: 189, price: 480, available: true },
        { id: 3, name: 'Spray Master Drones', rating: 4.9, trips: 312, price: 550, available: false },
    ];

    const truckProviders = [
        { id: 1, name: 'Ram Transport', type: 'Mini Truck', capacity: '1 ton', price: 800, available: true, rating: 4.7 },
        { id: 2, name: 'Singh Logistics', type: 'Medium Truck', capacity: '3 tons', price: 1500, available: true, rating: 4.8 },
        { id: 3, name: 'Express Cargo', type: 'Large Truck', capacity: '10 tons', price: 3500, available: true, rating: 4.9 },
    ];

    const laborers = [
        { id: 1, name: 'Ramesh Kumar', skill: 'Harvesting', experience: '8 years', wage: 400, available: true, rating: 4.7 },
        { id: 2, name: 'Suresh Patel', skill: 'Irrigation', experience: '5 years', wage: 350, available: true, rating: 4.5 },
        { id: 3, name: 'Mohan Singh', skill: 'Planting', experience: '10 years', wage: 450, available: false, rating: 4.9 },
        { id: 4, name: 'Vijay Sharma', skill: 'General Farm Work', experience: '6 years', wage: 380, available: true, rating: 4.6 },
    ];

    const handleBooking = (service, provider) => {
        Alert.alert(
            t('bookingConfirmed'),
            `${service} - ${provider.name}\n${t('confirmationSMS')}`
        );
        setActiveService(null);
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
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backText}>← {t('back')}</Text>
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>🚀 {t('logisticsServices')}</Text>
                        <Text style={styles.headerSubtitle}>{t('onDemandServices')}</Text>
                    </View>
                    <View style={styles.backButton} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Service Cards */}
                    <View style={styles.servicesSection}>
                        <Text style={styles.sectionTitle}>{t('availableServices')}</Text>
                        <Text style={styles.sectionSubtitle}>{t('chooseWhatYouNeed')}</Text>

                        {services.map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                onPress={() => setActiveService(service.id)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={service.color}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.serviceCard}
                                >
                                    <View style={styles.serviceIcon}>
                                        <Text style={styles.serviceIconText}>{service.icon}</Text>
                                    </View>
                                    <View style={styles.serviceInfo}>
                                        <Text style={styles.serviceName}>
                                            {isHindi ? service.nameHindi : service.name}
                                        </Text>
                                        <Text style={styles.serviceDescription}>
                                            {/* Fallback to English description if no translation key yet */}
                                            {service.description}
                                        </Text>
                                    </View>
                                    <View style={styles.servicePrice}>
                                        <Text style={styles.servicePriceText}>{service.price}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Recent Bookings */}
                    <View style={styles.recentSection}>
                        <Text style={styles.sectionTitle}>{t('recentBookings')}</Text>

                        <View style={styles.recentCard}>
                            <View style={styles.recentHeader}>
                                <Text style={styles.recentIcon}>🚁</Text>
                                <View style={styles.recentInfo}>
                                    <Text style={styles.recentTitle}>{t('droneSpraying')}</Text>
                                    <Text style={styles.recentSubtitle}>Survey No: 123/4A</Text>
                                </View>
                                <View style={styles.recentStatus}>
                                    <Text style={styles.recentStatusText}>{t('completed')}</Text>
                                </View>
                            </View>
                            <View style={styles.recentDetails}>
                                <Text style={styles.recentDetail}>{t('date')}: 05 Feb 2026</Text>
                                <Text style={styles.recentDetail}>Area: 5 acres</Text>
                                <Text style={styles.recentDetail}>{t('cost') || 'Cost'}: ₹2,500</Text>
                            </View>
                        </View>

                        <View style={styles.recentCard}>
                            <View style={styles.recentHeader}>
                                <Text style={styles.recentIcon}>🚚</Text>
                                <View style={styles.recentInfo}>
                                    <Text style={styles.recentTitle}>{t('truckBooking')}</Text>
                                    <Text style={styles.recentSubtitle}>Delhi {t('mandi')}</Text>
                                </View>
                                <View style={styles.recentStatus}>
                                    <Text style={styles.recentStatusText}>{t('inProgress')}</Text>
                                </View>
                            </View>
                            <View style={styles.recentDetails}>
                                <Text style={styles.recentDetail}>{t('date')}: {t('today') || 'Today'}</Text>
                                <Text style={styles.recentDetail}>Load: 3 tons</Text>
                                <Text style={styles.recentDetail}>{t('cost') || 'Cost'}: ₹1,500</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>

                {/* Booking Modal */}
                <Modal
                    visible={activeService !== null}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setActiveService(null)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    {activeService === 'drone' && `🚁 ${t('bookDrone')}`}
                                    {activeService === 'truck' && `🚚 ${t('bookTruck')}`}
                                    {activeService === 'labor' && `👷 ${t('hireLabor')}`}
                                </Text>
                                <TouchableOpacity onPress={() => setActiveService(null)}>
                                    <Text style={styles.modalClose}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {/* Drone Providers */}
                                {activeService === 'drone' && (
                                    <View>
                                        {droneProviders.map((provider) => (
                                            <View key={provider.id} style={styles.providerCard}>
                                                <View style={styles.providerHeader}>
                                                    <View>
                                                        <Text style={styles.providerName}>{provider.name}</Text>
                                                        <View style={styles.providerStats}>
                                                            <Text style={styles.providerRating}>⭐ {provider.rating}</Text>
                                                            <Text style={styles.providerTrips}>• {provider.trips} {t('trips')}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.providerPrice}>
                                                        <Text style={styles.providerPriceText}>₹{provider.price}</Text>
                                                        <Text style={styles.providerPriceUnit}>/acre</Text>
                                                    </View>
                                                </View>

                                                {provider.available ? (
                                                    <TouchableOpacity
                                                        style={styles.bookBtn}
                                                        onPress={() => handleBooking('Drone', provider)}
                                                    >
                                                        <LinearGradient
                                                            colors={['#10b981', '#059669']}
                                                            style={styles.bookBtnGradient}
                                                        >
                                                            <Text style={styles.bookBtnText}>{t('bookNow')} →</Text>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <View style={styles.unavailableBtn}>
                                                        <Text style={styles.unavailableBtnText}>{t('notAvailable')}</Text>
                                                    </View>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {/* Truck Providers */}
                                {activeService === 'truck' && (
                                    <View>
                                        {truckProviders.map((provider) => (
                                            <View key={provider.id} style={styles.providerCard}>
                                                <View style={styles.providerHeader}>
                                                    <View>
                                                        <Text style={styles.providerName}>{provider.name}</Text>
                                                        <Text style={styles.truckType}>{provider.type} • {provider.capacity}</Text>
                                                        <Text style={styles.providerRating}>⭐ {provider.rating}</Text>
                                                    </View>
                                                    <View style={styles.providerPrice}>
                                                        <Text style={styles.providerPriceText}>₹{provider.price}</Text>
                                                        <Text style={styles.providerPriceUnit}>/trip</Text>
                                                    </View>
                                                </View>

                                                <TouchableOpacity
                                                    style={styles.bookBtn}
                                                    onPress={() => handleBooking('Truck', provider)}
                                                >
                                                    <LinearGradient
                                                        colors={['#10b981', '#059669']}
                                                        style={styles.bookBtnGradient}
                                                    >
                                                        <Text style={styles.bookBtnText}>{t('bookNow')} →</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {/* Labor Providers */}
                                {activeService === 'labor' && (
                                    <View>
                                        {laborers.map((laborer) => (
                                            <View key={laborer.id} style={styles.providerCard}>
                                                <View style={styles.providerHeader}>
                                                    <View>
                                                        <Text style={styles.providerName}>{laborer.name}</Text>
                                                        <Text style={styles.laborSkill}>💼 {laborer.skill}</Text>
                                                        <Text style={styles.laborExp}>📅 {laborer.experience} {t('experience')}</Text>
                                                        <Text style={styles.providerRating}>⭐ {laborer.rating}</Text>
                                                    </View>
                                                    <View style={styles.providerPrice}>
                                                        <Text style={styles.providerPriceText}>₹{laborer.wage}</Text>
                                                        <Text style={styles.providerPriceUnit}>/day</Text>
                                                    </View>
                                                </View>

                                                {laborer.available ? (
                                                    <TouchableOpacity
                                                        style={styles.bookBtn}
                                                        onPress={() => handleBooking('Labor', laborer)}
                                                    >
                                                        <LinearGradient
                                                            colors={['#10b981', '#059669']}
                                                            style={styles.bookBtnGradient}
                                                        >
                                                            <Text style={styles.bookBtnText}>{t('hireNow')} →</Text>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <View style={styles.unavailableBtn}>
                                                        <Text style={styles.unavailableBtnText}>{t('notAvailable')}</Text>
                                                    </View>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                )}
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
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    backText: {
        fontSize: 24,
        color: '#047857',
    },
    headerCenter: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#047857',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#059669',
        marginTop: 2,
    },
    servicesSection: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#047857',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#059669',
        marginBottom: 16,
    },
    serviceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    serviceIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    serviceIconText: {
        fontSize: 32,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginBottom: 2,
    },
    serviceNameHindi: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 6,
    },
    serviceDescription: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
    },
    servicePrice: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    servicePriceText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
    recentSection: {
        paddingHorizontal: 20,
        marginTop: 30,
    },
    recentCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    recentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    recentIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    recentInfo: {
        flex: 1,
    },
    recentTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 2,
    },
    recentSubtitle: {
        fontSize: 13,
        color: '#6b7280',
    },
    recentStatus: {
        backgroundColor: '#d1fae5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    recentStatusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#047857',
    },
    recentDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 8,
    },
    recentDetail: {
        fontSize: 13,
        color: '#6b7280',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
    },
    modalClose: {
        fontSize: 28,
        color: '#6b7280',
    },
    providerCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    providerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    providerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 6,
    },
    providerStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    providerRating: {
        fontSize: 14,
        fontWeight: '600',
        color: '#f59e0b',
    },
    providerTrips: {
        fontSize: 13,
        color: '#6b7280',
        marginLeft: 4,
    },
    truckType: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    laborSkill: {
        fontSize: 14,
        color: '#10b981',
        marginBottom: 2,
        fontWeight: '600',
    },
    laborExp: {
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 4,
    },
    providerPrice: {
        alignItems: 'flex-end',
    },
    providerPriceText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#10b981',
    },
    providerPriceUnit: {
        fontSize: 12,
        color: '#6b7280',
    },
    bookBtn: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    bookBtnGradient: {
        padding: 14,
        alignItems: 'center',
    },
    bookBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
    unavailableBtn: {
        padding: 14,
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        alignItems: 'center',
    },
    unavailableBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#9ca3af',
    },
});
