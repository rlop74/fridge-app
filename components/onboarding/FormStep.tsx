// components/onboarding/steps/FormStep.tsx
import { Text, TextInput, View } from "react-native";
import { Formik } from "formik";

type FormData = { name: string; email: string };

type Props = {
  initialValues: FormData;
  formikRef: any;
  onSubmit: (values: FormData) => void;
  validationSchema: any;
};

export default function FormStep({
  initialValues,
  formikRef,
  onSubmit,
  validationSchema,
}: Props) {
  return (
    <View className="flex-1 px-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
          Let&apos;s get to know you
        </Text>

        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
        >
          {({ handleBlur, values, errors, touched, setFieldValue }) => (
            <View className="gap-6">
              <View>
                <Text className="text-gray-700 font-medium mb-2 ml-1">
                  Name
                </Text>
                <TextInput
                  className={`bg-gray-50 rounded-xl border text-gray-900 ${
                    touched.name && errors.name
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                  placeholder="What should Potate call you?"
                  value={values.name}
                  onChangeText={(text) => setFieldValue("name", text)}
                  onBlur={handleBlur("name")}
                  placeholderTextColor="#9CA3AF"
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {String(errors.name)}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2 ml-1">
                  Email
                </Text>
                <TextInput
                  className={`bg-gray-50 rounded-xl border text-gray-900 ${
                    touched.email && errors.email
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                  placeholder="your@email.com"
                  value={values.email}
                  onChangeText={(text) => setFieldValue("email", text)}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {String(errors.email)}
                  </Text>
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
