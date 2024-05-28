import {useRef} from 'react';
import {ScrollView, View} from 'react-native';
import styled, {css} from '@emotion/native';
import {Button} from 'dooboo-ui';
import {Stack} from 'expo-router';
import type {RiveRef, RNRiveError} from 'rive-react-native';
import Rive, {RNRiveErrorType} from 'rive-react-native';

import {t} from '../src/STRINGS';

const Container = styled.View`
  background-color: ${({theme}) => theme.bg.basic};

  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding: 16px;

  justify-content: center;
  align-items: center;
`;

const facialExpressions = ['Smile', 'Sad', 'Happy', 'Surprise', 'Neutral'];
type FacialExpression = (typeof facialExpressions)[number];

export default function Index(): JSX.Element {
  const facialRiveRef = useRef<RiveRef>(null);
  const checkboxRiveRef = useRef<RiveRef>(null);

  const resetFacialInputs = (): void => {
    facialRiveRef.current?.setInputState('State Machine 1', 'Smile', 0);
    facialRiveRef.current?.setInputState('State Machine 1', 'Sad', 0);
    facialRiveRef.current?.setInputState('State Machine 1', 'Happy', 0);
    facialRiveRef.current?.setInputState('State Machine 1', 'Surprise', 0);
    facialRiveRef.current?.setInputState('State Machine 1', 'Neutral', 0);
  };

  const playFacialAnimation = ({
    name,
    duration,
  }: {
    name: FacialExpression;
    duration: number;
  }): void => {
    resetFacialInputs();
    facialRiveRef.current?.setInputState('State Machine 1', name, duration);
  };

  return (
    <Container>
      <Stack.Screen
        options={{
          title: t('HOME'),
        }}
      />
      <Content>
        <ScrollView>
          {/* 1. Facial Demo */}
          <View
            style={css`
              justify-content: center;
              align-items: center;
              gap: 16px;
            `}
          >
            <Rive
              autoplay={false}
              onError={(riveError: RNRiveError) => {
                switch (riveError.type) {
                  case RNRiveErrorType.IncorrectRiveFileUrl: {
                    console.log(`${riveError.message}`);

                    return;
                  }

                  case RNRiveErrorType.MalformedFile: {
                    console.log('Malformed File');

                    return;
                  }

                  case RNRiveErrorType.FileNotFound: {
                    console.log('File not found');

                    return;
                  }

                  case RNRiveErrorType.IncorrectArtboardName: {
                    console.log('IncorrectAnimationName');

                    return;
                  }

                  case RNRiveErrorType.UnsupportedRuntimeVersion: {
                    console.log('Runtime version unsupported');

                    return;
                  }

                  case RNRiveErrorType.IncorrectStateMachineName: {
                    console.log(`${riveError.message}`);

                    return;
                  }

                  case RNRiveErrorType.IncorrectStateMachineInput: {
                    console.log(`${riveError.message}`);

                    return;
                  }
                  default:
                    return;
                }
              }}
              onLoopEnd={(animationName, loopMode) => {
                console.log(
                  'onLoopEnd: ',
                  animationName,
                  'loopMode: ',
                  loopMode,
                );
              }}
              onPause={(animationName, isStateMachine) => {
                console.log(
                  'onPause:',
                  animationName,
                  'isStateMachine: ',
                  isStateMachine,
                );
              }}
              onPlay={(animationName, isStateMachine) => {
                console.log(
                  'onPlay: ',
                  animationName,
                  'isStateMachine: ',
                  isStateMachine,
                );
              }}
              onStateChanged={(stateMachineName, stateName) => {
                console.log(
                  'onStateChanged: ',
                  'stateMachineName: ',
                  stateMachineName,
                  'stateName: ',
                  stateName,
                );
              }}
              onStop={(animationName, isStateMachine) => {
                console.log(
                  'onStop: ',
                  animationName,
                  'isStateMachine: ',
                  isStateMachine,
                );
              }}
              ref={facialRiveRef}
              resourceName="facial_expression_demo"
              stateMachineName="State Machine 1"
              style={{width: 300, height: 300}}

              // url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
              // url="https://seongjangi.dooboo.io/rive/facial_expression_demo.riv"
            />
            <View
              style={css`
                padding-bottom: 40px;

                flex-direction: row;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
              `}
            >
              {facialExpressions.map((name) => (
                <Button
                  key={name}
                  onPress={() => {
                    playFacialAnimation({name, duration: 30});
                  }}
                  text={name}
                />
              ))}
            </View>
          </View>
          {/* 2. Checkbox */}
          <View
            style={css`
              justify-content: center;
              align-items: center;
              gap: 16px;
            `}
          >
            <Rive
              autoplay={false}
              ref={checkboxRiveRef}
              resourceName="checkbox"
              stateMachineName="State Machine 1"
              style={{width: 100, height: 100}}
            />
            <View
              style={css`
                flex-direction: row;
                align-items: center;
                gap: 8px;
              `}
            >
              <Button
                onPress={() => {
                  checkboxRiveRef.current?.setInputState(
                    'State Machine 1',
                    'Checked',
                    true,
                  );
                }}
                text="Checked"
              />
              <Button
                onPress={() => {
                  checkboxRiveRef.current?.setInputState(
                    'State Machine 1',
                    'Checked',
                    false,
                  );
                }}
                text="Unchecked"
              />
            </View>
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
}
