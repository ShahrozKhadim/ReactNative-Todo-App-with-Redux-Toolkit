import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, responsive } from '../utils';

/**
 * PickerModal - Shared modal component for date/time pickers
 * Provides consistent modal UI with Done/Cancel buttons
 */
const PickerModal = ({
  visible,
  onClose,
  onDone,
  title,
  children,
}) => {
  const handleCancel = () => {
    onClose();
  };

  const handleDone = () => {
    onDone();
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={handleCancel}
    >
      <TouchableWithoutFeedback onPress={handleCancel}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: responsive.borderRadius.lg,
    borderTopRightRadius: responsive.borderRadius.lg,
    paddingBottom: 34, // Safe area for iPhone
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  cancelButton: {
    paddingVertical: responsive.padding.sm,
  },

  cancelText: {
    fontSize: responsive.fontSize.md,
    color: colors.primary,
    fontWeight: '500',
  },

  modalTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  doneButton: {
    paddingVertical: responsive.padding.sm,
  },

  doneText: {
    fontSize: responsive.fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default PickerModal;
