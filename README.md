# Ring On Task Plugin

This twilio Flex PlugIn will play an audio sound when a new task is assigned to an agent. It can play a different sound depending on the task type.

To edit the sound sources please edit these constants in the src/RingOnTaskPlugin.tsx file:

    const AUDIO_FILE_RINGING = '<path to audio file for calling sound>';
    const AUDIO_FILE_BELL = '<path to audio file for other tasks>';

