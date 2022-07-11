import React from 'react';
import {Box, Heading, HStack, Text} from 'native-base';

const TickerDetail = (props) => {
  return (
    <>
      <Box
        bg="black"
        maxWidth="100%"
        mt={1}
        p={2}
        pb={3}
        pt={3}
        display={props.chartType === 'mountain' ? 'flex' : 'none'}>
        <Heading size="xl" color="white" pb={2}>
          {props.price}
        </Heading>
        <HStack pb={2}>
          <Text
            fontSize="xs"
            color={
              Math.sign(props.priceChange) === 1 ? 'green.500' : 'pink.600'
            }>
            {props.priceChange + ' '}
          </Text>
          <Text
            fontSize="xs"
            color={
              Math.sign(props.priceChange) === 1 ? 'green.500' : 'pink.600'
            }>
            {'(' + props.priceChangePercentage + ')'}
          </Text>
          <Text fontSize="xs" color="white">
            ・{props.priceChangeDate}
          </Text>
        </HStack>
        <Text fontSize="xs" color="white">
          {'Last traded price: ' + props.lastTradedPriceDate}
        </Text>
      </Box>
      <Box
        bg="black"
        maxWidth="100%"
        mt={1}
        p={2}
        pb={3}
        pt={3}
        display={props.chartType === 'candle' ? 'flex' : 'none'}>
        <HStack pb={1} width="100%">
          <HStack width="50%">
            <Text fontSize="sm" color={'grey'}>
              Open
            </Text>
            <Text fontSize="sm" color={'grey'} position="absolute" right="3">
              {props.hud.open ? props.hud.open : props.hud.Open + ' '}
            </Text>
          </HStack>
          <HStack width="50%">
            <Text fontSize="sm" color={'grey'}>
              Close
            </Text>
            <Text fontSize="sm" color={'grey'} position="absolute" right="0">
              {props.hud.close ? props.hud.close : props.hud.Close + ' '}
            </Text>
          </HStack>
        </HStack>
        <HStack pb={1} width="100%">
          <HStack width="50%">
            <Text fontSize="sm" color={'grey'}>
              High
            </Text>
            <Text fontSize="sm" color={'grey'} position="absolute" right="3">
              {props.hud.high ? props.hud.high : props.hud.High + ' '}
            </Text>
          </HStack>
          <HStack width="50%">
            <Text fontSize="sm" color={'grey'}>
              Low
            </Text>
            <Text fontSize="sm" color={'grey'} position="absolute" right="0">
              {props.hud.low ? props.hud.low : props.hud.Low + ' '}
            </Text>
          </HStack>
        </HStack>
        <HStack pb={2} width="100%">
          <HStack width="50%">
            <Text fontSize="sm" color={'grey'}>
              Volume
            </Text>
            <Text fontSize="sm" color={'grey'} position="absolute" right="3">
              {props.hud.volume ? props.hud.volume : props.hud.Volume + ' '}
            </Text>
          </HStack>
          <HStack width="50%">
            <Text fontSize="sm" color={'grey'}>
              Change %
            </Text>
            <Text
              fontSize="sm"
              position="absolute"
              right="0"
              color={
                Math.sign(props.priceChange) === 1 ? 'green.500' : 'pink.600'
              }>
              {props.priceChangePercentage}
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="xs" color="white">
          {'Last traded price: ' + props.lastTradedPriceDate}
        </Text>
      </Box>
    </>
  );
};

export default TickerDetail;
