import { SafeAreaView, StyleSheet, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedText } from '@/components/ThemedText';
import { Button, TextInput, Text } from "react-native-paper";
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/context/auth';
import { useColorScheme } from "@/hooks/useColorScheme";
import { ForgotPasswordSchema, ForgotPasswordType } from '@/schemas/forgotPasswordSchema';

export default function ForgotPassword() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { resetPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: {
      errors, isValid //errors not showing up
    }
  } = useForm<ForgotPasswordType>({
    'resolver': zodResolver(ForgotPasswordSchema),
    'mode': 'onBlur'
  });

  const onSubmit = async (data: any) => {
    resetPassword(data.email);
  }

  return (
    <SafeAreaView>
      <Text variant="titleLarge">Forgot Password?</Text>

      <View>
        <Controller
          control={control}
          name="email"
          render={(props) => {
            return (
              <TextInput
                label="E-Mail"
                value={props.field.value}
                onBlur={props.field.onBlur}
                onChangeText={(value) => props.field.onChange(value)}
              />
            )
          }}
        />


        <Text>{errors.email && errors?.email?.message as string}</Text>
      </View>

      <Button mode='contained' onPress={handleSubmit(onSubmit)}>
        Reset Password
      </Button>
    </SafeAreaView>
  );
};
