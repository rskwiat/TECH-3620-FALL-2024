import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/auth';

import { RegisterUserSchema } from '../../schemas/registerUserSchema';

export default function CreateAccount() {
  const theme = useTheme();
  const { createAccount, signIn } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterUserSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    try {
      await createAccount(data);
      await signIn(data.email, data.password);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Register error', e);
    }
  };

  return (
    <View style={styles.formWrapper}>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Name"
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
        }}>{errors.name && errors?.name?.message}</Text>

      <Controller
        control={control}
        name='username'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Username"
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
        }}>{errors.username && errors?.username?.message}</Text>

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

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Password"
            secureTextEntry
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
        }}>{errors.password && errors?.password?.message}</Text>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        Register for an account
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
