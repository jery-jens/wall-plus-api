import type { NextApiRequest, NextApiResponse } from 'next';
import { Config } from '../../config';
import Cors from 'cors';

type Res = {
  message: any
};

const cors = Cors({
  // origin: Config.apiOrigin,
  methods: ['POST', 'GET', 'HEAD'],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      };

      return resolve(result)
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  // await runMiddleware(req, res, cors);
  
  const { email } = req.body;

  if (!email) {
    res.status(404).json({ 
      message: 'Seems like there was no e-mail given', 
    });
  };

  await fetch(`${Config.apiUrl}${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': Config.apiUserAgent,
      'hibp-api-key': Config.apiKey,
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .then(() => {
      res.status(200).json({message: 'You have been pawned!'});
    })
    .catch(() => {
      res.status(200).json({ message: 'You have not been pawned.' });
  });
};
