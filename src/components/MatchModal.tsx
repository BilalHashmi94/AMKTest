import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Colors, Images } from '../config';

interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
  userImage: string;
  matchedImage: string;
  onViewDetails: () => void;
  onKeepSwiping: () => void;
  data: data;
}

interface data {
  name: string;
  description: string;
}

const { width } = Dimensions.get('window');

const MatchModal: React.FC<MatchModalProps> = ({
  visible,
  onClose,
  matchedImage,
  onViewDetails,
  onKeepSwiping,
  data,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <View style={styles.overlay}>
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.imagesContainer}>
              <Image
                source={
                  matchedImage?.includes('placeholder')
                    ? Images.noimage
                    : { uri: matchedImage }
                }
                style={[styles.image]}
              />
            </View>

            <Text style={styles.title}>🎉 Found A New Destination!</Text>
            <Text style={styles.subtitle}>{data?.name}</Text>
            <Text style={styles.description}>{data?.description}</Text>

            <TouchableOpacity style={styles.primaryBtn} onPress={onViewDetails}>
              <Text style={styles.primaryText}>View Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={onKeepSwiping}
            >
              <Text style={styles.secondaryText}>Keep Swiping</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 80,
  },
  image: {
    width: '100%',
    height: Dimensions.get('screen').height / 2,
    borderRadius: 15,
    marginHorizontal: -20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4F79',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF4F79',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: '#FF4F79',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 10,
    width: '100%',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryBtn: {
    borderColor: '#FF4F79',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
  },
  secondaryText: {
    color: '#FF4F79',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MatchModal;
