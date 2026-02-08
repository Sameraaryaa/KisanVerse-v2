import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TranslationService from '../services/TranslationService';

export default function MarketplaceScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('rates'); // rates, auctions, store
    const [bidAmount, setBidAmount] = useState('');
    const [selectedAuction, setSelectedAuction] = useState(null);
    const t = (key) => TranslationService.t(key);
    const isHindi = TranslationService.lang === 'hi';

    const mandiRates = [
        { crop: 'rice', opening: 2100, closing: 2150, change: '+2.4%', trend: 'up' },
        { crop: 'wheat', opening: 2500, closing: 2480, change: '-0.8%', trend: 'down' },
        { crop: 'sugarcane', opening: 350, closing: 365, change: '+4.3%', trend: 'up' },
        { crop: 'cotton', opening: 6500, closing: 6650, change: '+2.3%', trend: 'up' },
        { crop: 'maize', opening: 1800, closing: 1790, change: '-0.6%', trend: 'down' },
        { crop: 'soybean', opening: 4200, closing: 4280, change: '+1.9%', trend: 'up' },
    ];

    const liveAuctions = [
        { id: 1, crop: 'rice', cropName: 'Organic Rice', cropNameHi: 'जैविक चावल', quantity: '50', currentBid: 2300, bids: 12, timeLeft: '2h 15m', mandi: 'Delhi', status: 'live' },
        { id: 2, crop: 'wheat', cropName: 'Premium Wheat', cropNameHi: 'प्रीमियम गेहूं', quantity: '100', currentBid: 2650, bids: 8, timeLeft: '45m', mandi: 'Ludhiana', status: 'live' },
        { id: 3, crop: 'cotton', cropName: 'Cotton Bales', cropNameHi: 'कपास की गांठें', quantity: '25', currentBid: 6800, bids: 15, timeLeft: '3h 30m', mandi: 'Mumbai', status: 'live' },
        { id: 4, crop: 'tomato', cropName: 'Fresh Tomatoes', cropNameHi: 'ताजा टमाटर', quantity: '10', currentBid: 1200, bids: 5, timeLeft: 'Ending Soon', mandi: 'Pune', status: 'ending' },
    ];

    const storeItems = [
        { id: 1, name: 'Premium Seeds - Rice', nameHi: 'प्रीमियम बीज - चावल', price: 850, category: 'seeds', rating: 4.5, icon: '🌾' },
        { id: 2, name: 'Organic Fertilizer', nameHi: 'जैविक उर्वरक', price: 1200, category: 'fertilizer', rating: 4.8, icon: '🌱' },
        { id: 3, name: 'Pesticide Spray', nameHi: 'कीटनाशक स्प्रे', price: 650, category: 'pesticide', rating: 4.3, icon: '💊' },
        { id: 4, name: 'Irrigation Pump', nameHi: 'सिंचाई पंप', price: 8500, category: 'equipment', rating: 4.7, icon: '💧' },
        { id: 5, name: 'Drip Irrigation Kit', nameHi: 'ड्रिप सिंचाई किट', price: 12000, category: 'equipment', rating: 4.9, icon: '🚿' },
        { id: 6, name: 'Wheat Seeds - HD3086', nameHi: 'गेहूं के बीज - HD3086', price: 920, category: 'seeds', rating: 4.6, icon: '🌾' },
    ];

    const placeBid = () => {
        if (!bidAmount || !selectedAuction) return;
        // In real app, this would hit an API
        Alert.alert(t('success'), `${t('bidPlacedSuccess')} ₹${bidAmount}`);
        setSelectedAuction(null);
        setBidAmount('');
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
                        <Text style={styles.headerTitle}>🏪 {t('smartMarketplace')}</Text>
                        <Text style={styles.headerSubtitle}>{t('liveRatesAuctions')}</Text>
                    </View>
                    <View style={styles.backButton} />
                </View>

                {/* Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'rates' && styles.tabActive]}
                        onPress={() => setActiveTab('rates')}
                    >
                        <Text style={[styles.tabText, activeTab === 'rates' && styles.tabTextActive]}>
                            📊 {t('mandiRates')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'auctions' && styles.tabActive]}
                        onPress={() => setActiveTab('auctions')}
                    >
                        <Text style={[styles.tabText, activeTab === 'auctions' && styles.tabTextActive]}>
                            🔨 {t('auctions')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'store' && styles.tabActive]}
                        onPress={() => setActiveTab('store')}
                    >
                        <Text style={[styles.tabText, activeTab === 'store' && styles.tabTextActive]}>
                            🛒 {t('store')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Mandi Rates Tab */}
                    {activeTab === 'rates' && (
                        <View style={styles.content}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{t('todayMandiRates')}</Text>
                                <Text style={styles.sectionSubtitle}>{t('updated')}: 10:30 AM</Text>
                            </View>

                            {mandiRates.map((item, index) => (
                                <View key={index} style={styles.rateCard}>
                                    <View style={styles.rateHeader}>
                                        <View style={styles.rateInfo}>
                                            <Text style={styles.rateCrop}>{t(item.crop)}</Text>
                                            <Text style={styles.rateLabel}>{t('perQuintal')}</Text>
                                        </View>
                                        <View style={[
                                            styles.rateTrend,
                                            item.trend === 'up' ? styles.rateTrendUp : styles.rateTrendDown
                                        ]}>
                                            <Text style={styles.rateTrendText}>
                                                {item.trend === 'up' ? '↗' : '↘'} {item.change}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.rateBody}>
                                        <View style={styles.rateItem}>
                                            <Text style={styles.rateItemLabel}>{t('opening')}</Text>
                                            <Text style={styles.rateItemValue}>₹{item.opening}</Text>
                                        </View>
                                        <View style={styles.rateDivider} />
                                        <View style={styles.rateItem}>
                                            <Text style={styles.rateItemLabel}>{t('current')}</Text>
                                            <Text style={[styles.rateItemValue, styles.rateItemValueCurrent]}>
                                                ₹{item.closing}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Auctions Tab */}
                    {activeTab === 'auctions' && (
                        <View style={styles.content}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{t('liveAuctions')}</Text>
                                <Text style={styles.sectionSubtitle}>{liveAuctions.length} {t('activeBids')}</Text>
                            </View>

                            {liveAuctions.map((auction) => (
                                <TouchableOpacity
                                    key={auction.id}
                                    style={styles.auctionCard}
                                    onPress={() => setSelectedAuction(auction)}
                                >
                                    <LinearGradient
                                        colors={auction.status === 'ending' ? ['#fef3c7', '#fed7aa'] : ['#ffffff', '#f9fafb']}
                                        style={styles.auctionCardGradient}
                                    >
                                        {auction.status === 'ending' && (
                                            <View style={styles.urgentBadge}>
                                                <Text style={styles.urgentBadgeText}>🔥 {t('endingSoon')}</Text>
                                            </View>
                                        )}

                                        <View style={styles.auctionHeader}>
                                            <Text style={styles.auctionCrop}>{isHindi ? auction.cropNameHi : auction.cropName}</Text>
                                            <View style={styles.auctionTimeBadge}>
                                                <Text style={styles.auctionTimeText}>⏱ {auction.timeLeft}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.auctionBody}>
                                            <View style={styles.auctionInfo}>
                                                <Text style={styles.auctionInfoLabel}>📦 {t('quantity')}</Text>
                                                <Text style={styles.auctionInfoValue}>{auction.quantity} {t('perQuintal')}</Text>
                                            </View>
                                            <View style={styles.auctionInfo}>
                                                <Text style={styles.auctionInfoLabel}>🏛️ {t('mandi')}</Text>
                                                <Text style={styles.auctionInfoValue}>{auction.mandi} {t('mandi')}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.auctionFooter}>
                                            <View style={styles.currentBid}>
                                                <Text style={styles.currentBidLabel}>{t('currentBid')}</Text>
                                                <Text style={styles.currentBidValue}>₹{auction.currentBid}</Text>
                                            </View>
                                            <View style={styles.bidCount}>
                                                <Text style={styles.bidCountText}>{auction.bids} {t('bids')}</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.bidButton}
                                            onPress={() => setSelectedAuction(auction)}
                                        >
                                            <LinearGradient
                                                colors={['#10b981', '#059669']}
                                                style={styles.bidButtonGradient}
                                            >
                                                <Text style={styles.bidButtonText}>{t('placeBid')} →</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Store Tab */}
                    {activeTab === 'store' && (
                        <View style={styles.content}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{t('farmingStore')}</Text>
                                <Text style={styles.sectionSubtitle}>{t('seedsToolsEquipment')}</Text>
                            </View>

                            <View style={styles.storeGrid}>
                                {storeItems.map((item) => (
                                    <View key={item.id} style={styles.storeCard}>
                                        <View style={styles.storeCardIcon}>
                                            <Text style={styles.storeCardIconText}>{item.icon}</Text>
                                        </View>
                                        <Text style={styles.storeCardName}>{isHindi ? item.nameHi : item.name}</Text>
                                        <Text style={styles.storeCardCategory}>{t(item.category)}</Text>
                                        <View style={styles.storeCardRating}>
                                            <Text style={styles.storeCardRatingText}>⭐ {item.rating}</Text>
                                        </View>
                                        <Text style={styles.storeCardPrice}>₹{item.price}</Text>
                                        <TouchableOpacity style={styles.storeCardButton}>
                                            <LinearGradient
                                                colors={['#3b82f6', '#2563eb']}
                                                style={styles.storeCardButtonGradient}
                                            >
                                                <Text style={styles.storeCardButtonText}>{t('addToCart')}</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>

                {/* Bid Modal */}
                <Modal
                    visible={selectedAuction !== null}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setSelectedAuction(null)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{t('placeYourBid')}</Text>
                                <TouchableOpacity onPress={() => setSelectedAuction(null)}>
                                    <Text style={styles.modalClose}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            {selectedAuction && (
                                <>
                                    <View style={styles.modalBody}>
                                        <Text style={styles.modalCrop}>{isHindi ? selectedAuction.cropNameHi : selectedAuction.cropName}</Text>
                                        <Text style={styles.modalQuantity}>{selectedAuction.quantity} {t('perQuintal')}</Text>

                                        <View style={styles.modalCurrentBid}>
                                            <Text style={styles.modalCurrentBidLabel}>{t('currentBid')}</Text>
                                            <Text style={styles.modalCurrentBidValue}>₹{selectedAuction.currentBid}</Text>
                                        </View>

                                        <Text style={styles.modalInputLabel}>{t('yourBidAmount')}</Text>
                                        <TextInput
                                            style={styles.modalInput}
                                            placeholder={`Min: ₹${selectedAuction.currentBid + 50}`}
                                            keyboardType="numeric"
                                            value={bidAmount}
                                            onChangeText={setBidAmount}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={placeBid}
                                    >
                                        <LinearGradient
                                            colors={['#10b981', '#059669']}
                                            style={styles.modalButtonGradient}
                                        >
                                            <Text style={styles.modalButtonText}>🔨 {t('placeBid')}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </>
                            )}
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
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: '#10b981',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6b7280',
    },
    tabTextActive: {
        color: 'white',
    },
    content: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        marginBottom: 16,
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
    },
    rateCard: {
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
    rateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    rateInfo: {},
    rateCrop: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 2,
    },
    rateLabel: {
        fontSize: 12,
        color: '#6b7280',
    },
    rateTrend: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    rateTrendUp: {
        backgroundColor: '#d1fae5',
    },
    rateTrendDown: {
        backgroundColor: '#fee2e2',
    },
    rateTrendText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
    },
    rateBody: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rateItem: {
        flex: 1,
    },
    rateItemLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
    },
    rateItemValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
    },
    rateItemValueCurrent: {
        color: '#10b981',
    },
    rateDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 16,
    },
    auctionCard: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    auctionCardGradient: {
        padding: 20,
    },
    urgentBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#dc2626',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    urgentBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'white',
    },
    auctionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    auctionCrop: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
        flex: 1,
    },
    auctionTimeBadge: {
        backgroundColor: '#dbeafe',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    auctionTimeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1e40af',
    },
    auctionBody: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 16,
    },
    auctionInfo: {
        flex: 1,
    },
    auctionInfoLabel: {
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 4,
    },
    auctionInfoValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
    },
    auctionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    currentBid: {},
    currentBidLabel: {
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 4,
    },
    currentBidValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#10b981',
    },
    bidCount: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    bidCountText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
    },
    bidButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    bidButtonGradient: {
        padding: 16,
        alignItems: 'center',
    },
    bidButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
    storeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    storeCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    storeCardIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f0fdf4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    storeCardIconText: {
        fontSize: 28,
    },
    storeCardName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 4,
        minHeight: 36,
    },
    storeCardCategory: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 8,
    },
    storeCardRating: {
        marginBottom: 8,
    },
    storeCardRatingText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#f59e0b',
    },
    storeCardPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: '#10b981',
        marginBottom: 12,
    },
    storeCardButton: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    storeCardButtonGradient: {
        padding: 10,
        alignItems: 'center',
    },
    storeCardButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white',
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
    modalBody: {
        marginBottom: 20,
    },
    modalCrop: {
        fontSize: 22,
        fontWeight: '700',
        color: '#047857',
        marginBottom: 4,
    },
    modalQuantity: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 20,
    },
    modalCurrentBid: {
        backgroundColor: '#f0fdf4',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    modalCurrentBidLabel: {
        fontSize: 14,
        color: '#059669',
        marginBottom: 4,
    },
    modalCurrentBidValue: {
        fontSize: 28,
        fontWeight: '800',
        color: '#047857',
    },
    modalInputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
    },
    modalInput: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        fontSize: 18,
        fontWeight: '600',
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    modalButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    modalButtonGradient: {
        padding: 20,
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
});
