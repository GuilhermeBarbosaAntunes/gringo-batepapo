import { AuthContext } from "@/contexts/auth";
import { IUser } from "@/utils/types";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  Center,
  Avatar,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Logo } from "./logo";

let user: IUser;
export default function Navbar() {
  const { isAuth } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    user = JSON.parse(String(localStorage.getItem("user")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <Box
      bg={useColorModeValue("#08403E", "gray.800")}
      px={4}
      py={{ base: 30, md: 2, lg: 2 }}
      display={router.pathname.indexOf("private/chat") > -1 ? "none" : "block"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Logo
          cursor={"pointer"}
          onClick={() => (isAuth ? router.push("private") : router.push("/"))}
          height={32}
        />
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={{ base: 0, md: 5, lg: 5 }}>
            <Menu>
              {!isAuth ? (
                <Stack
                  direction={{ base: "column", md: "row", lg: "row" }}
                  spacing={{ base: 0, md: 2, lg: 2 }}
                >
                  {router.pathname.indexOf("signup") <= -1 && (
                    <Button
                      size={"md"}
                      fontWeight={400}
                      mr={4}
                      variant={"solid"}
                      onClick={() => router.push("/signup")}
                    >
                      Criar conta
                    </Button>
                  )}
                  {router.pathname.indexOf("signin") <= -1 && (
                    <Button
                      fontSize={"sm"}
                      fontWeight={400}
                      variant={"link"}
                      onClick={() => router.push("/signin")}
                    >
                      Entrar
                    </Button>
                  )}
                </Stack>
              ) : (
                <Stack direction={"row"} spacing={7}>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Você está logado</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Meus dados</MenuItem>
                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                  </MenuList>
                </Stack>
              )}
              <Button
                onClick={toggleColorMode}
                variant={"link"}
                cursor={"pointer"}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
