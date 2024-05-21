import {useRef} from 'react';
import {View} from 'react-native';
import styled, {css} from '@emotion/native';
import {Button, useDooboo} from 'dooboo-ui';
import {Stack, useRouter} from 'expo-router';
import type {RiveRef, RNRiveError} from 'rive-react-native';
import Rive, {Direction, LoopMode, RNRiveErrorType} from 'rive-react-native';

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

export default function Index(): JSX.Element {
  const ref = useRef<RiveRef>(null);

  return (
    <Container>
      <Stack.Screen
        options={{
          title: t('HOME'),
        }}
      />
      <Content>
        <Rive
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
            console.log('onLoopEnd: ', animationName, 'loopMode: ', loopMode);
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
          ref={ref}
          resourceName="facial_expression_demo"
          stateMachineName="State Machine 1"
          style={{width: 400, height: 400}}
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
          <Button
            onPress={() => {
              ref.current?.reset();
              ref.current?.setInputState('State Machine 1', 'Smile', 30);
            }}
            text="Smile"
          />
          <Button
            onPress={() => {
              ref.current?.reset();
              ref.current?.setInputState('State Machine 1', 'Sad', 30);
            }}
            text="Sad"
          />
          <Button
            onPress={() => {
              ref.current?.reset();
              ref.current?.setInputState('State Machine 1', 'Happy', 30);
              // ref.current?.play('Happy', LoopMode.PingPong);
            }}
            text="Happy"
          />
          <Button
            onPress={() => {
              ref.current?.reset();
              ref.current?.setInputState('State Machine 1', 'Surprise', 30);
              // ref.current?.play(
              //   'Sad_pose',
              //   LoopMode.Loop,
              //   Direction.Forwards,
              //   true,
              // );
            }}
            text="Surprise"
          />
          <Button
            onPress={() => {
              ref.current?.reset();
              ref.current?.setInputState('State Machine 1', 'Neutral', 30);
            }}
            text="Neutral"
          />
        </View>
      </Content>
    </Container>
  );
}
