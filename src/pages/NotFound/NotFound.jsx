import css from './NotFound.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const [time, setTime] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0) {
      navigate('/');
    }
    return () => clearInterval(timer);
  }, [time, navigate]);

  return (
    <>
      <div className={css.notFound}>
        <h1>Such website does not exist.</h1>
        <h2>
          You will be redirected to the home page in <span>{time}</span> sec.
        </h2>
      </div>
    </>
  );
};
