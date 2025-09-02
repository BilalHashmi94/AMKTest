import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import {
  AppFont,
  Colors,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import AuthAction from '../../redux/Actions/AuthAction';

const VisitedList = () => {
  const places = useSelector(state => state.AuthReducer.list);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleClearAll = () => {
    setShowModal(false);
    dispatch(AuthAction.ClearRedux());
  };

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => NavigationService.navigate('PlaceDetail', { place: item })}
    >
      <Image
        source={
          item.image.includes('placeholder')
            ? Images.noimage
            : { uri: item.image }
        }
        style={styles.image}
      />
      <View style={{ padding: Metrix.HorizontalSize(15) }}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeDesc} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Visited Places</Text>
        {places.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {places.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You haven't marked any places as visited yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={renderPlace}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Clear All?</Text>
            <Text style={styles.modalDesc}>
              This will remove all visited places from your list.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: Colors.subText }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: Colors.primary }]}
                onPress={handleClearAll}
              >
                <Text style={[styles.modalBtnText, { color: Colors.white }]}>
                  Clear
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingTop: Metrix.VerticalSize(20),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Metrix.VerticalSize(20),
  },
  title: {
    fontFamily: AppFont.LexendBlack,
    fontSize: Metrix.customFontSize(22),
    color: Colors.primary,
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  clearText: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    width: '100%',
    height: Metrix.VerticalSize(180),
  },
  placeName: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(18),
    color: Colors.titleFont,
    marginBottom: 5,
  },
  placeDesc: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(14),
    color: Colors.subText,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(16),
    color: Colors.subText,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(18),
    color: Colors.primary,
    marginBottom: 10,
  },
  modalDesc: {
    fontFamily: AppFont.LexendRegular,
    fontSize: Metrix.customFontSize(14),
    color: Colors.subText,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalBtnText: {
    fontFamily: AppFont.LexendSemiBold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.white,
  },
});

export default VisitedList;
