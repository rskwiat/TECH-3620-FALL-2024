import { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Link } from 'expo-router';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors, DarkButtonTheme, DarkTextTheme } from "@/constants/Colors";
import { useAuth } from "@/context/auth";
import { LoginUser, LoginUserType } from "@/schemas/loginUserSchema";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginScreen() {
  const [submissionError, setSubmissionError] = useState('');
  const colorScheme = useColorScheme();
  const { appSignIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: {
      isValid, errors
    }
  } = useForm<LoginUserType>({
    'resolver': zodResolver(LoginUser),
    'mode': 'onBlur'
  });

  const onSubmit = async ({ email, password }: any) => {
    const resp: any = await appSignIn(email, password);
    if (resp?.error) {
      setSubmissionError('An error has occured');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={styles.card}>
        <Text
          variant="titleLarge"
          style={styles.header}
          theme={colorScheme === 'dark' ? DarkTextTheme : undefined}
        >
          Welcome.
        </Text>

        <View style={styles.inputWrapper}>
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
          <Text>{errors.email && errors?.email?.message as string}</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                label="Password"
                secureTextEntry
                value={value} //props.field.value
                onBlur={onBlur} //props.field.onBlur
                onChangeText={value => onChange(value)}
              />
            )}
          />
          <Text>{errors.password && errors?.password?.message as string}</Text>
        </View>

        <Button
          theme={colorScheme === 'dark' ? DarkButtonTheme : undefined}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
        <Text>{submissionError}</Text>

        <Button
          theme={colorScheme === 'dark' ? DarkButtonTheme : undefined}
          mode="text"
          compact
          style={{ width: 170 }}
        >
          <Link href="/(auth)/forgot-password">
            Forgot your password?
          </Link>
        </Button>

      </View>

      <Button mode="text">
        <Link href="/(auth)/register">
          Need an account? Register here.
        </Link>
      </Button>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  }
});
