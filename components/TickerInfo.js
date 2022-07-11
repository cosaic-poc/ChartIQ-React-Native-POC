import React from 'react';
import {Box, Heading, VStack, HStack, Icon} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

const TickerInfo = (props) => {
  return (
    <>
      <Box bg="black" maxWidth="100%" p={2} pb={5}>
        <HStack space={2} alignItems="center">
          <VStack space={2}>
            <Heading size="xl" color="white">
              APPLE INC
            </Heading>
            <Heading size="md" color="grey">
              US:AAPL
            </Heading>
            <HStack space={2} alignItems="center">
              <Icon
                size="sm"
                as={<MaterialIcons name="description" />}
                color="white"
              />
              <Icon
                size="sm"
                as={<MaterialIcons name="pie-chart" />}
                color="white"
              />
            </HStack>
          </VStack>
          <Icon
            right={2}
            position="absolute"
            size="xl"
            as={<AntDesign name="apple1" />}
            color="white"
          />
        </HStack>
      </Box>
    </>
  );
};

export default TickerInfo;
