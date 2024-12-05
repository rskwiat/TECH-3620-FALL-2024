import React from 'react';
import { View, Styles } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/auth';

import { LoginUserSchema } from '../../schemas/loginSchema';

export default function LoginForm() {
  const { appSignIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(LoginUserSchema)
  });

  const onSubmit = async (data) => {
    // handleSubmit(data);




  }

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      {/* <TextInput
      autoCapitalize='none'
    /> */}
      {/* 
      <TextInput
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />

      <TextInput
        label="Password"
        value={text}
        onChangeText={text => setText(text)}
      /> */}

    </View>
  )
};
