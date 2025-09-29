import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slices/todosSlice';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import DatePicker from '../../../components/DatePicker';
import TimePicker from '../../../components/TimePicker';
import { colors, responsive } from '../../../utils';

/**
 * TodoForm component for creating and editing todos
 * Uses Formik for form handling and Yup for validation
 */
const TodoForm = ({ todo, onSubmit, onCancel, isEditing = false }) => {
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Todo name is required')
      .min(3, 'Todo name must be at least 3 characters')
      .max(100, 'Todo name must be less than 100 characters'),
    description: Yup.string()
      .max(500, 'Description must be less than 500 characters'),
    dueDate: Yup.string()
      .nullable()
      .test('future-date', 'Due date must be in the future', function(value) {
        if (!value) return true;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }),
    time: Yup.string()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)')
      .nullable(),
  });

  const initialValues = {
    name: todo?.name || '',
    description: todo?.description || '',
    dueDate: todo?.dueDate || '',
    time: todo?.time || '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const todoData = {
      name: values.name.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate || null,
      time: values.time || null,
    };

    if (isEditing) {
      onSubmit({ id: todo.id, updates: todoData });
    } else {
      dispatch(addTodo(todoData));
    }

    setSubmitting(false);
    resetForm();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              <Input
                label="Todo Name *"
                placeholder="Enter todo name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
                autoFocus={!isEditing}
                maxLength={100}
              />

              <Input
                label="Description"
                placeholder="Enter description (optional)"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                error={touched.description && errors.description}
                multiline
                numberOfLines={3}
                maxLength={500}
              />

              <DatePicker
                label="Due Date"
                placeholder="Select due date"
                value={values.dueDate}
                onChange={handleChange('dueDate')}
                error={touched.dueDate && errors.dueDate}
                minimumDate={new Date()}
              />

              <TimePicker
                label="Time"
                placeholder="Select time"
                value={values.time}
                onChange={handleChange('time')}
                error={touched.time && errors.time}
              />

              <View style={styles.buttonContainer}>
                <Button
                  title={isEditing ? 'Update Todo' : 'Add Todo'}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={styles.submitButton}
                />

                {onCancel && (
                  <Button
                    title="Cancel"
                    onPress={onCancel}
                    variant="outline"
                    style={styles.cancelButton}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  form: {
    padding: responsive.padding.lg,
  },

  buttonContainer: {
    marginTop: responsive.margin.xl,
    gap: responsive.margin.xs,
  },

  submitButton: {
  },

  cancelButton: {
  },
});

export default TodoForm;
