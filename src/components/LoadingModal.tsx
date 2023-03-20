import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";

export interface Iprops {
  isOpen: boolean;
}

export default function LoadingModal({ isOpen }: Iprops) {
  return (
    <Modal isCentered isOpen={isOpen} size="sx" onClose={() => ""}>
      <ModalOverlay
        bg="blackAlpha.600"
        backdropFilter="auto"
        backdropInvert="20%"
        backdropBlur="3px"
      />
      <ModalContent>
        <ModalBody textAlign="center">
          <br />
          <Text fontSize="3xl"> Aguarde </Text>
          <br />
          <Spinner thickness="4px" speed="0.65s" color={"purple"} size="xl" />
          <br />
          <br />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
