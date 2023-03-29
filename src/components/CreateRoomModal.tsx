import { AppContext } from "@/contexts/app";
import { getAxiosInstance } from "@/services/api";
import { getImageURLByPhrase } from "@/services/image";
import { IUser } from "@/utils/types";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { AxiosInstance } from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";






interface IForm {
    name: string;
    capacity: string;
    level: number;
}

let user: IUser
let api: AxiosInstance
export function CreateRoomModal() {
    const toast = useToast();
    const router = useRouter();
    const appContext = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ imageUrl, setImageUrl ] = useState('')

    useEffect(() => {
        user = JSON.parse(String(localStorage.getItem('user')))
        api = getAxiosInstance(user)
        handleSetImage('study')
    }, [])

    const handleSetImage = async (theme: string) =>{
        if (theme.length >= 3 && theme.length <= 15) {
            const imageUrl = await getImageURLByPhrase(theme)
        }
    }

}