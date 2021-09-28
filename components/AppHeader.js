import React from 'react';
import {HStack, IconButton, Icon, Box, StatusBar} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';

const AppHeader = (props) => {
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#000000" />
      <HStack
        bg="#000000"
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center">
        <HStack space={4} alignItems="center">
          <IconButton
            icon={
              <Icon
                size="md"
                as={<MaterialIcons name="chevron-left" />}
                color="white"
              />
            }
          />
        </HStack>
        <HStack space={2}>
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="star" />}
                size="md"
                color="white"
              />
            }
          />
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="search" />}
                color="white"
                size="md"
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
};

export default AppHeader;
