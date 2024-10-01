import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Link } from 'expo-router';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/auth";
import { LoginUser, LoginUserType } from "@/schemas/loginUserSchema";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginScreen() {
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




  const onSubmit = async (data: any) => {
    try {
      console.log('Form submitted with data:', data);
      // Add your form submission logic here
      await appSignIn(data.email, data.password);
    } catch (e) {
      console.log('Error during form submission:', e);
    }
  };

  return (
    <SafeAreaView>
      <Text
        variant="displaySmall"
        style={{
          ...styles.header,
          color: colorScheme ? Colors[colorScheme].text : '',
        }}
      >
        Welcome to Kean Social Media.
      </Text>

      <Controller
        control={control}
        name="email"
        render={(props) => {
          return (
            <TextInput
              label="E-mail"
              autoCapitalize="none"
              value={props.field.value}
              onChangeText={(value) => props.field.onChange(value)}
            />
          );
        }}
      />

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Password"
            secureTextEntry
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
          />
        )}
      />

      <Button onPress={() => {
        console.log('Submit button pressed');
        console.log('Form is valid:', isValid, errors);

        handleSubmit(onSubmit)();
      }}>
        Submit
      </Button>


      <Button mode="text" style={styles.registerButton}>
        <Link href="/(auth)/forgot-password">
          Forgot your password?
        </Link>
      </Button>

      <Button mode="text" style={styles.registerButton}>
        <Link href="/(auth)/register">
          Need an account? Register here.
        </Link>
      </Button>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  registerButton: {
    marginTop: 40,
    textAlign: 'center',
  }
});
