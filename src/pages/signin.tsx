import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import { getAxiosInstance } from "@/services/api";
import { Formik, Form, Field } from "formik";
import { AppContext } from "@/contexts/app";
import { useRouter } from "next/router";
import NextLink from "next/link";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface IUserAuth {
  emnial: string;
  name: string;
  status: number;
  token: string;
  type: number;
}

type Iform = {
  email: string;
  password: string;
};

export default function SignIn() {
  const toast = useToast()

  const appContext = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const api = getAxiosInstance();
  const router = useRouter();

  useEffect(() => {
    appContext.onCloseLoading()
  }, [])

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters!")
      .required("Required"),
  });

  const onSubmit = async (values: Iform) => {
    try {
      appContext.onOpenLoading();

      const credentials = {
        email: values.email,
        password: values.password,
      };
      const { data } = await api.post("/api/auth/signin", credentials);
      const userAuth: IUserAuth = data;

      localStorage.setItem("accessToken", JSON.stringify(userAuth.token));
      toast({
        title: "Sucesso",
        description: "Seja bem vindo!",
        status: "success",
        position: "top-right",
        duration: 7000,
        isClosable: true,
      });
      router.push("private");
    } catch (error: any) {
      const errorMessage = error.response.data;
      toast({
        title: "Houve um erro ",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 7000,
        isClosable: true,
      });
      appContext.onCloseLoading();
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={SigninSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Entre na sua conta</Heading>
                <Text fontSize={"lg"} color={"gray.600"}></Text>
              </Stack>

              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl
                    id="email"
                    isInvalid={!!errors.email && touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Field as={Input} name="email" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    id="password"
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        name="passsword"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <FormControl>
                        <Checkbox name={"rememberMe"}>
                          Mantenha-me conectado
                        </Checkbox>
                      </FormControl>
                      <Link
                        as={NextLink}
                        href={"/forgotpassword"}
                        color={"blue.400"}
                      >
                        Esqueceu sua senha?
                      </Link>
                    </Stack>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Entrar
                    </Button>
                    <Stack>
                      <Text align={"center"}>
                        Não tem uma conta?{" "}
                        <Link as={NextLink} href="./signup" color={"blue.400"}>
                          Cadastre-se
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
