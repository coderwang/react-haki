import React, { useEffect, useState } from 'react';
import { VerifyCode } from 'react-haki';

const correctCode = '0000';

export default () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifyCode = async () => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (value !== correctCode) {
          reject('验证码错误');
        } else {
          resolve('验证成功');
        }
      }, 1000);
    });
  };

  useEffect(() => {
    if (value.length !== 4) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    verifyCode()
      .then((res) => {
        setValue('');
        alert(res);
      })
      .catch((e) => {
        setError(e);
        setValue('');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [value]);

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <VerifyCode
      value={value}
      error={error}
      isSubmitting={isSubmitting}
      onChange={handleChange}
    />
  );
};
