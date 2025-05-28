import React, { useEffect, useState } from 'react';
import { VerifyCode } from 'react-haki';

const correctCode = '123456';

export default () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

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
    if (value.length !== 6) {
      return;
    }

    setError('');

    verifyCode()
      .then((res) => {
        setValue('');
        alert(res);
      })
      .catch((e) => {
        setError(e);
        setValue('');
      });
  }, [value]);

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <VerifyCode
      value={value}
      error={error}
      onChange={handleChange}
      length={6}
      type="line"
      inputMode="text"
      autoFocus={false}
    />
  );
};
