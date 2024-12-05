import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/auth';

import { LoginUserSchema } from '../../schemas/loginSchema';

export default function LoginForm() {
  const theme = useTheme();
  const { appSignIn } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(LoginUserSchema),
    mode: 'onBlur'
  });

  const onSubmit = async ({ email, password }) => {
    const res = await appSignIn(email, password);
    console.log(res);
  }

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

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            style={{ marginTop: 10 }}
            label="Password"
            secureTextEntry
            mode="flat"
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
        }}>
        {errors.password && errors?.password?.message}
      </Text>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        Submit
      </Button>

    </View>
  )
};

const styles = StyleSheet.create({
  formWrapper: {
    padding: 20,
    backgroundColor: 'rgba(200,200,200,.3)',
    margin: 10,
    borderRadius: 10,
    // shadowColor: '#171717',
    // shadowOffset: {
    //   width: -2,
    //   height: 4,
    // },
    // shadowOpacity: .2,
    // shadowRadius: 3,
  },
  submitButton: {
    marginTop: 20,
  }
}); 
