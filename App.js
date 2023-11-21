import React from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useForm, Controller, useFormState } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";

export default function App() {
  const { control, handleSubmit, setValue, watch } = useForm();
  const { errors } = useFormState({ control });
  const onSubmit = (data) => {
    console.log(data);

    Alert.alert("Form Data", JSON.stringify(data));
  };

  const validatePort = (value) => {
    if (isNaN(value) || +value < 0 || +value > 65535) {
      return "Invalid port number";
    }
    return true;
  };

  const validateServerPath = (value) => {
    if (!/^[a-zA-Z0-9/]+$/.test(value)) {
      return "Invalid server path";
    }
    return true;
  };

  const accountType = watch("AccountType");

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Account Type:</Text>
                <View style={styles.input}>
                  <RNPickerSelect
                    onValueChange={(value) => setValue("AccountType", value)}
                    items={[{ label: "Manual", value: "Manual" }]}
                    placeholder={{
                      label: "Advanced",
                      value: "Advanced",
                    }}
                    value={field.value}
                  />
                </View>
              </View>
            )}
            name="AccountType"
            defaultValue="Advanced"
          />

          <Controller
            control={control}
            render={({ field }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>User Name:</Text>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  placeholder="name@example.com"
                />
              </View>
            )}
            name="username"
            defaultValue=""
            rules={{ required: "Username is required", pattern: /^\S+@\S+$/i }}
          />
          {errors.username && (
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorText}>{errors.username.message}</Text>
            </View>
          )}

          <Controller
            control={control}
            render={({ field }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  secureTextEntry
                  placeholder="Required"
                />
              </View>
            )}
            name="password"
            defaultValue=""
            rules={{ required: "Password is required" }}
          />
          {errors.password && (
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorText}>{errors.password.message}</Text>
            </View>
          )}

          <Controller
            control={control}
            render={({ field }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Server Address:</Text>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  placeholder="example.com"
                />
              </View>
            )}
            name="serverAddress"
            defaultValue=""
            rules={{ required: "Server Address is required" }}
          />
          {errors.serverAddress && (
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorText}>
                {errors.serverAddress.message}
              </Text>
            </View>
          )}

          {accountType !== "Manual" && (
            <>
              <Controller
                control={control}
                render={({ field }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Server Path:</Text>
                    <TextInput
                      style={styles.input}
                      value={field.value}
                      onChangeText={(text) => field.onChange(text)}
                      placeholder="/calendars/user/"
                    />
                  </View>
                )}
                name="ServerPath"
                defaultValue=""
                rules={{ validate: validateServerPath }}
              />
              {errors.ServerPath && (
                <View style={styles.errorTextContainer}>
                  <Text style={styles.errorText}>
                    {errors.ServerPath.message}
                  </Text>
                </View>
              )}

              <Controller
                control={control}
                render={({ field }) => (
                  <View style={[styles.inputContainer, { marginBottom: 5 }]}>
                    <Text style={[styles.label, { marginRight: 10 }]}>
                      Port:
                    </Text>
                    <View
                      style={[styles.input, { width: 60, marginRight: 160 }]}
                    >
                      <TextInput
                        value={field.value}
                        onChangeText={(text) => field.onChange(text)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                )}
                name="Port"
                defaultValue=""
                rules={{ validate: validatePort }}
              />
              {errors.Port && (
                <View style={styles.errorTextContainer}>
                  <Text style={styles.errorText}>{errors.Port.message}</Text>
                </View>
              )}
            </>
          )}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSubmit(onSubmit)}
          >
            <View style={styles.customButton}>
              <Text style={styles.customButtonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  formContainer: {
    backgroundColor: "white",
    width: 403,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: "#333",
    textAlign: "right",
  },
  input: {
    height: 40,
    width: 220,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "grey",
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginTop: 20,
  },
  customButtonText: {
    color: "white",
    fontSize: 25,
  },
  errorText: {
    color: "red",
  },
  errorTextContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
});
