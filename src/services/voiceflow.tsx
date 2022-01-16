import { BaseRequest, GeneralTrace, RequestType } from '@voiceflow/general-types';
import axios from 'axios';

// const versionID = 1;
// eslint-disable-next-line no-secrets/no-secrets
const APIKey = 'VF.DM.61e37442233b3d001b9b469e.c65ELDiJSpkO8qSi';

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
