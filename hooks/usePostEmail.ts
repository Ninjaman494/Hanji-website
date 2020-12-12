import { useCallback, useState } from 'react';
import axios from 'axios';

export interface PostEmailProps {
  name: string;
  email: string;
}

const usePostEmail = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<null | boolean>(null);

  const doPost = useCallback(() => {
    setLoading(true);

    axios
      .get('/api/email')
      .then(() => setSuccess(true))
      .catch(() => setSuccess(false))
      .then(() => setLoading(false));
  }, []);

  return { loading, success, doPost };
};

export default usePostEmail;
