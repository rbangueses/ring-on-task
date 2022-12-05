import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

const PLUGIN_NAME = 'RingOnTaskPlugin';

export default class RingOnTaskPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    const options: Flex.ContentFragmentProps = { sortOrder: -1 };

    const AUDIO_FILE_RINGING = 'https://static-assets-4043.twil.io/vintage-phone-ringing-121778.mp3';
    const AUDIO_FILE_BELL = 'https://static-assets-4043.twil.io/reception-bell-5s.mp3';
    let audio = new Audio();
    audio.loop = true;
    audio.muted = false;

    const resStatus = ["accepted","canceled","rejected","rescinded","timeout"];

    manager.workerClient?.on("reservationCreated", function(reservation) {

      reservation.task.taskChannelUniqueName === 'voice' ? audio.src = AUDIO_FILE_RINGING : audio.src = AUDIO_FILE_BELL ;
      
      audio.play();

      resStatus.forEach((e) => {
        reservation.on(e, () => {
          audio.pause();
        });
      });
    });
  }
}
