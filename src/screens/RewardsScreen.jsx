import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslationService from '../services/TranslationService';

export default function RewardsScreen({ navigation }) {
    const [coins, setCoins] = useState(0);
    const [activeGame, setActiveGame] = useState(null);
    const [cropMatchCards, setCropMatchCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);
    const t = (key) => TranslationService.t(key);
    const isHindi = TranslationService.lang === 'hi';

    useEffect(() => {
        loadCoins();
    }, []);

    const loadCoins = async () => {
        try {
            const savedCoins = await AsyncStorage.getItem('reward_coins');
            if (savedCoins) setCoins(parseInt(savedCoins));
        } catch (error) {
            console.log('Error loading coins:', error);
        }
    };

    const saveCoins = async (newCoins) => {
        try {
            await AsyncStorage.setItem('reward_coins', newCoins.toString());
            setCoins(newCoins);
        } catch (error) {
            console.log('Error saving coins:', error);
        }
    };

    const games = [
        {
            id: 'match',
            name: 'Crop Match',
            nameHindi: 'फसल मिलान',
            icon: '🌾',
            reward: 50,
            description: isHindi ? 'फसल के जोड़े मिलाएं' : 'Match the crop pairs'
        },
        {
            id: 'spin',
            name: 'Lucky Spin',
            nameHindi: 'भाग्य चक्र',
            icon: '🎯',
            reward: 100,
            description: isHindi ? 'सिक्के जीतने के लिए घुमाएं!' : 'Spin to win coins!'
        },
    ];

    const cropEmojis = ['🌾', '🌽', '🥕', '🍅', '🥔', '🧅'];

    // Game Logic
    const startGame = (gameId) => {
        if (gameId === 'match') {
            const shuffledCrops = [...cropEmojis, ...cropEmojis]
                .sort(() => Math.random() - 0.5)
                .map((emoji, index) => ({ id: index, emoji, matched: false }));
            setCropMatchCards(shuffledCrops); // This state update is correct
            setFlippedCards([]);
            setMatchedCards([]);
            setScore(0);
            setActiveGame('match');
        } else if (gameId === 'spin') {
            spinWheel();
        }
    };

    const handleCardPress = (card) => {
        if (flippedCards.length === 2 || flippedCards.includes(card.id) || matchedCards.includes(card.id)) return;

        const newFlipped = [...flippedCards, card.id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            const firstCard = cropMatchCards.find(c => c.id === firstId);
            const secondCard = cropMatchCards.find(c => c.id === secondId);

            if (firstCard.emoji === secondCard.emoji) {
                const newMatched = [...matchedCards, firstId, secondId];
                setMatchedCards(newMatched);
                setScore(score + 10);
                setTimeout(() => setFlippedCards([]), 200);

                if (newMatched.length === cropMatchCards.length) {
                    setTimeout(() => {
                        const reward = 50;
                        saveCoins(coins + reward);
                        Alert.alert(
                            isHindi ? '🎉 बधाई हो!' : '🎉 Congratulations!',
                            isHindi ? `आपने ${reward} सिक्के कमाए!` : `You earned ${reward} coins!`
                        );
                        setActiveGame(null);
                    }, 500);
                }
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const spinWheel = () => {
        const rewards = [10, 20, 30, 50, 100];
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        saveCoins(coins + randomReward);
        Alert.alert(
            isHindi ? '🎉 लकी स्पिन!' : '🎉 Lucky Spin!',
            isHindi ? `आपने ${randomReward} सिक्के जीते!` : `You won ${randomReward} coins!`
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
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backText}>← {t('back')}</Text>
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>{isHindi ? 'इनाम और खेल' : 'Rewards & Games'}</Text>
                        <Text style={styles.headerSubtitle}>{isHindi ? 'खेलें और सिक्के जीतें' : 'Play & Earn Coins'}</Text>
                    </View>
                    <View style={styles.backButton} />
                </View>

                {/* Coin Balance */}
                <View style={styles.coinCard}>
                    <LinearGradient
                        colors={['#fbbf24', '#f59e0b']}
                        style={styles.coinGradient}
                    >
                        <Text style={styles.coinIcon}>🪙</Text>
                        <View style={styles.coinInfo}>
                            <Text style={styles.coinLabel}>{isHindi ? 'आपका बैलेंस' : 'Your Balance'}</Text>
                            <Text style={styles.coinAmount}>{coins} {isHindi ? 'सिक्के' : 'Coins'}</Text>
                        </View>
                    </LinearGradient>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Games Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{isHindi ? '🎮 गेम खेलें' : '🎮 Play Games'}</Text>
                        <Text style={styles.sectionSubtitle}>{isHindi ? 'मजेदार गेम खेलें और सिक्के कमाएं' : 'Earn coins by playing fun games'}</Text>

                        {games.map((game) => (
                            <TouchableOpacity
                                key={game.id}
                                style={styles.gameCard}
                                onPress={() => {
                                    if (game.id === 'match') startGame('match');
                                    else if (game.id === 'spin') spinWheel();
                                }}
                            >
                                <View style={styles.gameIcon}>
                                    <Text style={styles.gameIconText}>{game.icon}</Text>
                                </View>
                                <View style={styles.gameInfo}>
                                    <Text style={styles.gameName}>{isHindi ? game.nameHindi : game.name}</Text>
                                    <Text style={styles.gameDescription}>{game.description}</Text>
                                </View>
                                <View style={styles.gameReward}>
                                    <Text style={styles.gameRewardText}>+{game.reward}</Text>
                                    <Text style={styles.gameRewardCoin}>🪙</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Shop Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>🛒 {t('redeemCoins')}</Text>
                        <Text style={styles.sectionSubtitle}>{t('buyFarmingTools')}</Text>

                        <View style={styles.shopItem}>
                            <Text style={styles.shopIcon}>🌾</Text>
                            <View style={styles.shopInfo}>
                                <Text style={styles.shopName}>{t('premiumSeeds')}</Text>
                                <Text style={styles.shopPrice}>500 🪙</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.buyButton, coins < 500 && styles.buyButtonDisabled]}
                                disabled={coins < 500}
                                onPress={() => {
                                    saveCoins(coins - 500);
                                    Alert.alert(
                                        isHindi ? '✅ सफलता' : '✅ Success',
                                        isHindi ? 'प्रीमियम बीज खरीदे गए! डिजिटल लॉकर चेक करें।' : 'Premium Seeds purchased! Check Digital Locker.'
                                    );
                                }}
                            >
                                <Text style={styles.buyButtonText}>{t('buyNow')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.shopItem}>
                            <Text style={styles.shopIcon}>💊</Text>
                            <View style={styles.shopInfo}>
                                <Text style={styles.shopName}>{t('fertilizerPack')}</Text>
                                <Text style={styles.shopPrice}>300 🪙</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.buyButton, coins < 300 && styles.buyButtonDisabled]}
                                disabled={coins < 300}
                                onPress={() => {
                                    saveCoins(coins - 300);
                                    Alert.alert(
                                        isHindi ? '✅ सफलता' : '✅ Success',
                                        isHindi ? 'उर्वरक पैक खरीदा गया!' : 'Fertilizer Pack purchased!'
                                    );
                                }}
                            >
                                <Text style={styles.buyButtonText}>{t('buyNow')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.shopItem}>
                            <Text style={styles.shopIcon}>🚜</Text>
                            <View style={styles.shopInfo}>
                                <Text style={styles.shopName}>{t('toolKit')}</Text>
                                <Text style={styles.shopPrice}>700 🪙</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.buyButton, coins < 700 && styles.buyButtonDisabled]}
                                disabled={coins < 700}
                                onPress={() => {
                                    saveCoins(coins - 700);
                                    Alert.alert(
                                        isHindi ? '✅ सफलता' : '✅ Success',
                                        isHindi ? 'उपकरण किट खरीदा गया!' : 'Tool Kit purchased!'
                                    );
                                }}
                            >
                                <Text style={styles.buyButtonText}>{t('buyNow')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>

                {/* Crop Match Game Modal */}
                <Modal
                    visible={activeGame === 'match'}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.gameModal}>
                            <View style={styles.gameModalHeader}>
                                <Text style={styles.gameModalTitle}>🌾 Crop Match</Text>
                                <Text style={styles.gameModalScore}>Score: {score}</Text>
                                <TouchableOpacity onPress={() => setActiveGame(null)}>
                                    <Text style={styles.gameModalClose}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardGrid}>
                                {cropMatchCards.map((card) => (
                                    <TouchableOpacity
                                        key={card.id}
                                        style={[
                                            styles.card,
                                            (flippedCards.includes(card.id) || matchedCards.includes(card.id)) && styles.cardFlipped
                                        ]}
                                        onPress={() => handleCardPress(card)}
                                    >
                                        <Text style={styles.cardEmoji}>
                                            {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? card.emoji : '❓'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
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
    coinCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    coinGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },
    coinIcon: {
        fontSize: 48,
        marginRight: 16,
    },
    coinInfo: {
        flex: 1,
    },
    coinLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 4,
    },
    coinAmount: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
    },
    section: {
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
    gameCard: {
        flexDirection: 'row',
        alignItems: 'center',
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
    gameIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0fdf4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    gameIconText: {
        fontSize: 32,
    },
    gameInfo: {
        flex: 1,
    },
    gameName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 2,
    },
    gameNameHindi: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    gameDescription: {
        fontSize: 13,
        color: '#9ca3af',
    },
    gameReward: {
        alignItems: 'center',
    },
    gameRewardText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#f59e0b',
    },
    gameRewardCoin: {
        fontSize: 16,
    },
    shopItem: {
        flexDirection: 'row',
        alignItems: 'center',
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
    shopIcon: {
        fontSize: 40,
        marginRight: 16,
    },
    shopInfo: {
        flex: 1,
    },
    shopName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 4,
    },
    shopPrice: {
        fontSize: 14,
        color: '#f59e0b',
        fontWeight: '600',
    },
    buyButton: {
        backgroundColor: '#10b981',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    buyButtonDisabled: {
        backgroundColor: '#d1d5db',
    },
    buyButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameModal: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        width: '90%',
    },
    gameModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    gameModalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#047857',
    },
    gameModalScore: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f59e0b',
    },
    gameModalClose: {
        fontSize: 28,
        color: '#6b7280',
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '23%',
        aspectRatio: 1,
        backgroundColor: '#f0fdf4',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardFlipped: {
        backgroundColor: '#10b981',
    },
    cardEmoji: {
        fontSize: 32,
    },
});
