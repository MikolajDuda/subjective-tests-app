import { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/AuthContext';

const AdministrationPanel = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, [  ]);

  return (
    <div className="administration-panel">

    </div>
  );
};

export default AdministrationPanel;