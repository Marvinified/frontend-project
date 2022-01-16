import './index.css';

import React from 'react';
import { ChatType } from 'src/state/chat/types';

type AudioHandleProps = {
  messages: ChatType['messages'];
  id: string;
};

const AudioHandler: React.FC<AudioHandleProps> = ({ messages = [], id }) => {
  const [currentId, setCurrentId] = React.useState('');
  const [audioQueue, setAudioQueue] = React.useState<string[]>([]);
  const [queueIndex, setQueueIndex] = React.useState(messages.length);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  React.useEffect(() => {
    if (id !== currentId) {
      if (audioRef.current) audioRef.current.pause();
      setQueueIndex(messages.length);
      setCurrentId(id);
      return;
    }
    if (messages.length < queueIndex) {
      const newAudioSrc = messages.filter((message) => message.type === 'speak').map((message) => message.src || '');
      setAudioQueue((audioQueue) => [...audioQueue, ...newAudioSrc]);
      setQueueIndex(messages.length);
    }

    if (queueIndex < messages.length) {
      const newItems = messages.slice(queueIndex);
      const newAudioSrc = newItems.filter((message) => message.type === 'speak').map((message) => message.src || '');
      setAudioQueue((audioQueue) => [...audioQueue, ...newAudioSrc]);
      setQueueIndex(messages.length);
    }
  }, [messages, queueIndex, id]);

  React.useEffect(() => {
    const src = audioQueue[0];
    if (src && audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.autoplay = true;
      audioRef.current.onended = () => {
        setAudioQueue(audioQueue.slice(1));
      };
    }
  }, [audioQueue]);
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioRef} autoPlay={true} />;
};

export default AudioHandler;
