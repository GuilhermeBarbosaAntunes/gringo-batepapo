import { IRoom } from "@/@types/pages/Rooms";
import { AppContext } from "@/contexts/app";
import { AuthContext } from "@/contexts/auth";
import { getAxiosInstance } from "@/services/api";
import { IUser } from "@/utils/types";
import { Box, Button, Center, Flex, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { AxiosInstance } from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

let user: IUser;
let api: AxiosInstance;
export default function Panel() {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  const [rooms, setRooms] = useState<IRoom[]>();
  useEffect(() => {
    user = JSON.parse(String(localStorage.getItem("user")));
    api = getAxiosInstance(user);
  }, []);
  const getData = async () => {
    try {
      appContext.onOpenLoading();
      const { data: rooms } = await api.get("/api/rooms");
      setRooms(rooms);
      appContext.onCloseLoading();
    } catch (error) {
      console.log(error);
      appContext.onCloseLoading();
    }
  };

  return (
    <Box p={5}>
      <Text fontSize={"sm"} color={"gray.500"}>
        {" "}
        {authContext.users.length + " "} Usuário online.{" "}
      </Text>
      <Heading
        textAlign={"center"}
        mb={10}
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        lineHeight={"110%"}
      >
        Escolha uma sala e comece a praticar <br />
        <Text as={"span"} color={"purple.300"} >
           agora mesmo
        </Text>
      </Heading>
      <Flex gap="7" wrap="wrap" alignItems={"center"} justifyContent={"center"} >
      {rooms &&
          rooms.map((room) => (
            <Center
              key={room._id}
              w={{ base: "100%", sm: "100%", md: "250px" }}
            >
              <Box
                width={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Image
                  h={"120px"}
                  w={"full"}
                  src={room.urlImage}
                  objectFit={"cover"}
                />

                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      <p></p>
                    </Heading>
                    <Text color={"gray.500"}>{room.name}</Text>
                  </Stack>

                  <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        {authContext.users.filter(
                          (u: any) => u.roomName === room.name
                        ).length + " "}
                        participantes online
                      </Text>
                    </Stack>
                  </Stack>

                  <Button
                    w={"full"}
                    mt={8}
                    bg={useColorModeValue("#151f21", "gray.900")}
                    color={"white"}
                    rounded={"md"}
                    onClick={() =>
                      router.push(`/private/chat?room_name=${room.name}`)
                    }
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    Participar
                  </Button>
                </Box>
              </Box>
            </Center>
          ))}
      </Flex>
    </Box>
  );
}
