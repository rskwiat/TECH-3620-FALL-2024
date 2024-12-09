import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/auth';

import { ForgotPasswordSchema } from '../../schemas/forgotPasswordSchema';

export default function ResetPassword() {
  const theme = useTheme();
  const { resetPassword } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onBlur'
  });

  const onSubmit = async ({ email }) => {
    // eslint-disable-next-line no-console
    console.log('Reset Password:', email);
    await resetPassword(email);
  };

  return (
    <View style={styles.formWrapper}>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="E-Mail"
            autoCapitalize="none"
            value={value} //props.field.value
            onBlur={onBlur} //props.field.onBlur
            onChangeText={value => onChange(value)}
          />
        )}
      />
      <Text
        variant="bodySmall"
        style={{
          color: theme.colors.error
        }}>{errors.email && errors?.email?.message}</Text>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        Reset Password
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    padding: 20,
    backgroundColor: 'rgba(200,200,200,.3)',
    margin: 10,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 20,
  }
}); 
