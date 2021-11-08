import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {
  NativeBaseProvider,
  Pressable,
  Box,
  Center,
  HStack,
  VStack,
  Text,
  Icon,
  Stack,
  Button,
} from 'native-base';
import AppHeader from './components/AppHeader';
import TickerInfo from './components/TickerInfo';
import TickerDetail from './components/TickerDetail';
import {AntDesign, Entypo} from '@expo/vector-icons';

const App = () => {
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState('AAPL');
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercentage, setPriceChangePercentage] = useState(
    'Price Change Percentage',
  );

  const [priceChangeDate, setPriceChangeDate] = useState('Price Change Date');
  const [lastTradedPriceDate, setLastTradedPriceDate] = useState(
    'lastTradedPriceDate',
  );
  const [chartRange, setChartRange] = useState('1D');
  const [chartType, setChartType] = useState('mountain');
  const [hud, setHud] = useState({});
  const [ma, setMa] = useState(false);
  const [rsi, setRsi] = useState(false);
  const [macd, setMacd] = useState(false);
  const [bid, setBid] = useState(148.37);
  const [last, setLast] = useState(148.36);
  const [ask, setAsk] = useState(148.38);
  let chartWebview = null;

  useEffect(() => {
    chartWebview.injectJavaScript("stxx.setChartType('" + chartType + "');");
    if (chartType === 'candle') {
      chartWebview.injectJavaScript(
        "CIQ.Studies.addStudy(stxx,'vol undr',{id:'vol'},{});  void(0);",
      );
    } else {
      chartWebview.injectJavaScript(
        'CIQ.Studies.removeStudy(stxx, stxx.layout.studies["vol"]); void(0);',
      );
    }
  }, [chartType]);

  useEffect(() => {
    switch (chartRange) {
      case '1D':
        setPriceChangeDate('Past day');
        chartWebview.injectJavaScript(
          "stxx.setSpan({multiplier: 1,base: 'day', periodicity: { period: 1, interval: 10, timeUnit: 'minute' }});",
        );
        break;
      case '1M':
        setPriceChangeDate('Past month');
        chartWebview.injectJavaScript(
          "stxx.setSpan({multiplier: 1,base: 'month', periodicity: { period: 1, interval: 1, timeUnit: 'day' }});",
        );
        break;
      case '1Y':
        setPriceChangeDate('Past yaer');
        chartWebview.injectJavaScript(
          "stxx.setSpan({multiplier: 1,base: 'year', periodicity: { period: 1, interval: 1, timeUnit: 'month' }});",
        );
        break;
      case '3Y':
        setPriceChangeDate('Past 3 years');
        chartWebview.injectJavaScript(
          "stxx.setSpan({multiplier: 3,base: 'year', periodicity: { period: 1, interval: 1, timeUnit: 'month' }});",
        );
        break;
      default:
        break;
    }
  }, [chartRange]);

  const handleMobileBridgeEvent = (event) => {
    const {data} = event.nativeEvent;
    const parsedData = JSON.parse(data);

    if (parsedData.hud) {
      let hud = JSON.parse(parsedData.hud);
      if (hud.close) {
        setPrice(hud.close);
        let priceDifference =
          parsedData.dataSegment[parsedData.dataSegment.length - 1].Close -
          hud.close;
        let priceChangePer =
          (priceDifference /
            parsedData.dataSegment[parsedData.dataSegment.length - 1].Close) *
          100;

        setPriceChange(priceDifference.toFixed(2));
        setPriceChangePercentage(priceChangePer.toFixed(2) + '%');
        setHud(hud);
      }
    } else if (parsedData.dataSegment) {
      setPrice(parsedData.dataSegment[parsedData.dataSegment.length - 1].Close);
      let priceDifference =
        parsedData.dataSegment[parsedData.dataSegment.length - 1].Close -
        parsedData.dataSegment[0].Close;
      let priceChangePer =
        (priceDifference /
          parsedData.dataSegment[parsedData.dataSegment.length - 1].Close) *
        100;

      setPriceChange(priceDifference.toFixed(2));
      setPriceChangePercentage(priceChangePer.toFixed(2) + '%');
      let date = new Date(
        parsedData.dataSegment[parsedData.dataSegment.length - 1].DT,
      );
      setLastTradedPriceDate(date.toGMTString());
      setHud(parsedData.dataSegment[parsedData.dataSegment.length - 1]);
    }
  };

  const toggleMa = () => {
    setMa(!ma);
    if (!ma) {
      chartWebview.injectJavaScript(
        "CIQ.Studies.addStudy(stxx,'ma',{ Period: 10, Field: 'Close', Type: 'ma' },{ MA: '#FFC619' }); void(0);",
      );

      chartWebview.injectJavaScript(
        "CIQ.Studies.addStudy(stxx,'ma',{ Period: 20, Field: 'Close', Type: 'ma' },{ MA: '#9A33FF' }); void(0);",
      );

      chartWebview.injectJavaScript(
        "CIQ.Studies.addStudy(stxx,'ma',{ Period: 30, Field: 'Close', Type: 'ma' },{ MA: '#24B29B' }); void(0);",
      );
    } else {
      chartWebview.injectJavaScript(
        "for(const[studyKey, study] of Object.entries(stxx.layout.studies)){if(study.study.name==='Moving Average'){CIQ.Studies.removeStudy(stxx, study)}}",
      );
    }
  };

  const toggleRsi = () => {
    setRsi(!rsi);
    if (!rsi) {
      chartWebview.injectJavaScript(
        "CIQ.Studies.addStudy(stxx,'rsi',{},{},{ yAxis: { noDraw: true, position: 'none'}}); void(0);",
      );
    } else {
      chartWebview.injectJavaScript(
        "for(const[studyKey, study] of Object.entries(stxx.layout.studies)){if(study.study.name==='RSI'){CIQ.Studies.removeStudy(stxx, study)}}",
      );
    }
  };

  const toggleMacd = () => {
    setMacd(!macd);
    if (!macd) {
      chartWebview.injectJavaScript(
        "CIQ.Studies.addStudy(stxx,'macd',{},{},{ yAxis: { noDraw: true, position: 'none'}}); void(0);",
      );
    } else {
      chartWebview.injectJavaScript(
        "for(const[studyKey, study] of Object.entries(stxx.layout.studies)){if(study.study.name==='MACD'){CIQ.Studies.removeStudy(stxx, study)}}",
      );
    }
  };

  return (
    <>
      <NativeBaseProvider>
        <AppHeader />
        <TickerInfo />
        <TickerDetail
          price={price}
          priceChange={priceChange}
          priceChangePercentage={priceChangePercentage}
          priceChangeDate={priceChangeDate}
          lastTradedPriceDate={lastTradedPriceDate}
          chartType={chartType}
          hud={hud}
        />
        <WebView
          ref={(r) => (chartWebview = r)}
          source={{
            uri: 'http://localhost:3000/mobile-example.html',
          }}
          containerStyle={{flex: 0, height: 260}}
          onMessage={handleMobileBridgeEvent}
        />
        <HStack bg="black" alignItems="center" pb={4}>
          <Box bg="black" width={80}>
            <HStack bg="black" alignItems="center">
              <Pressable
                flex={1}
                onPress={() => setChartRange('1D')}
                borderBottomWidth={2}
                borderColor={chartRange === '1D' ? 'primary.500' : 'grey'}>
                <Center>
                  <Text
                    color={chartRange === '1D' ? 'primary.500' : 'white'}
                    fontSize={18}
                    bold={true}>
                    1D
                  </Text>
                </Center>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => setChartRange('1M')}
                borderBottomWidth={2}
                borderColor={chartRange === '1M' ? 'primary.500' : 'grey'}>
                <Center>
                  <Text
                    color={chartRange === '1M' ? 'primary.500' : 'white'}
                    fontSize={18}
                    bold={true}>
                    1M
                  </Text>
                </Center>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => setChartRange('1Y')}
                borderBottomWidth={2}
                borderColor={chartRange === '1Y' ? 'primary.500' : 'grey'}>
                <Center>
                  <Text
                    color={chartRange === '1Y' ? 'primary.500' : 'white'}
                    fontSize={18}
                    bold={true}>
                    1Y
                  </Text>
                </Center>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => setChartRange('3Y')}
                borderBottomWidth={2}
                borderColor={chartRange === '3Y' ? 'primary.500' : 'grey'}>
                <Center>
                  <Text
                    color={chartRange === '3Y' ? 'primary.500' : 'white'}
                    fontSize={18}
                    bold={true}>
                    3Y
                  </Text>
                </Center>
              </Pressable>
            </HStack>
          </Box>
          <Box bg="black" width={20}>
            <HStack bg="black" alignItems="center">
              <Pressable
                flex={1}
                onPress={() => {
                  setChartType('candle');
                }}>
                <Center>
                  <Icon
                    mb={1}
                    as={<AntDesign name="barchart" />}
                    color={chartType === 'candle' ? 'primary.500' : 'white'}
                    size="sm"
                  />
                </Center>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  setChartType('mountain');
                }}>
                <Center>
                  <Icon
                    mb={1}
                    as={<AntDesign name="linechart" />}
                    color={chartType === 'mountain' ? 'primary.500' : 'white'}
                    size="sm"
                  />
                </Center>
              </Pressable>
            </HStack>
          </Box>
        </HStack>
        <Box bg="black">
          <HStack>
            <Text color="grey" fontSize={13} bg="black" pb={4}>
              Currency in USD
            </Text>
            <Pressable
              flex={1}
              onPress={toggleMa}
              borderBottomWidth={1}
              borderColor={ma ? 'primary.500' : 'grey'}>
              <Center>
                <Text
                  color={ma ? 'primary.500' : 'white'}
                  fontSize={12}
                  bold={true}>
                  MA
                </Text>
              </Center>
            </Pressable>
            <Pressable
              flex={1}
              onPress={toggleRsi}
              borderBottomWidth={1}
              borderColor={rsi ? 'primary.500' : 'grey'}>
              <Center>
                <Text
                  color={rsi ? 'primary.500' : 'white'}
                  fontSize={12}
                  bold={true}>
                  RSI
                </Text>
              </Center>
            </Pressable>
            <Pressable
              flex={1}
              onPress={toggleMacd}
              borderBottomWidth={1}
              borderColor={macd ? 'primary.500' : 'grey'}>
              <Center>
                <Text
                  color={macd ? 'primary.500' : 'white'}
                  fontSize={12}
                  bold={true}>
                  MACD
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>
        <Box bg="black" pb={4}>
          <HStack space={2} alignItems="center">
            <Icon
              as={<Entypo name="dot-single" />}
              color="primary.500"
              size="md"
            />
            <Text color="primary.500" fontSize={18} bg="black" bold={true}>
              Buyers
            </Text>
            <Text color="white" fontSize={18} bg="black" bold={true}>
              vs
            </Text>
            <Text color="pink.600" fontSize={18} bg="black" bold={true}>
              Sellers
            </Text>
            <Text
              color="grey"
              fontSize={16}
              bg="black"
              bold={true}
              position="absolute"
              right={3}>
              More &gt;
            </Text>
          </HStack>
        </Box>
        <Stack alignItems="center" bg="black">
          <HStack space={'xl'} pb={4} pt={4}>
            <Center pr={10}>
              <VStack bg="black" alignItems="center" space={2}>
                <Text color="white" fontSize={18} bold={true}>
                  {bid}
                </Text>
                <Text color="primary.500" fontSize={18} bold={true}>
                  Bid
                </Text>
              </VStack>
            </Center>
            <Center>
              <VStack bg="black" alignItems="center" space={2}>
                <Text color="white" fontSize={18} bold={true}>
                  {last}
                </Text>
                <Text color="white" fontSize={18} bold={true}>
                  Last
                </Text>
              </VStack>
            </Center>
            <Center pl={10}>
              <VStack bg="black" alignItems="center" space={2}>
                <Text color="white" fontSize={18} bold={true}>
                  {ask}
                </Text>
                <Text color="pink.600" fontSize={18} bold={true}>
                  Ask
                </Text>
              </VStack>
            </Center>
          </HStack>
        </Stack>
        <HStack bg="black" alignItems="center" space={5} pb={8} pt={2}>
          <Button bg="primary.500" size={'sm'}>
            <Text color="white" fontSize={16} bold={true} pl={16} pr={16}>
              Buy
            </Text>
          </Button>
          <Button bg="pink.600" size={'sm'}>
            <Text color="white" fontSize={16} bold={true} pl={16} pr={16}>
              Sell
            </Text>
          </Button>
        </HStack>
      </NativeBaseProvider>
    </>
  );
};

export default App;
