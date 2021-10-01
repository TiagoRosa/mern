import * as React from 'react';
import ImgUsuario from '../../../assets/img/logo.jpg'

function DashboardUsuario() {
  return (
    <img src={ImgUsuario} alt='feb' />
  );
}

export default function Dashboard() {
  return <DashboardUsuario />;
}