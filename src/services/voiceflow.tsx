import { BaseRequest, GeneralTrace, RequestType } from '@voiceflow/general-types';
import axios from 'axios';

const APIKey = process.env.REACT_APP_VOICE_FLOW_API_KEY;

const interact = async (userId: string, message: string, type: string = RequestType.TEXT): Promise<GeneralTrace[]> => {
  const request: BaseRequest = { type, payload: message };

  const { data } = await axios.post(
    `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
    { request, config: { tts: true } },
    { headers: { Authorization: APIKey } }
  );

  return data;
};

const voiceflow = {
  interact,
};

export default voiceflow;
