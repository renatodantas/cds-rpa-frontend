import { useRouteError } from 'react-router-dom';

export const GenericError = () => {
  const error = useRouteError() as any;

  return (
    <div>
      <p>Um erro ocorreu.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
