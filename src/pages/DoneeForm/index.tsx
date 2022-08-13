import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import {
  Typography, Box, Button, Pagination,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './styles';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import api from '../../services/api';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

export interface DoneeFormData {
    donee: {
        name: string,
        birthdate: Date,
        contact: string | null,
        occupation: string | null,
        rg: string | null,
        cpf: string | null,
    },
    spouse: {
        name: string,
        birthdate: Date,
        contact: string | null,
        occupation: string | null,
        rg: string | null,
        cpf: string | null,
    },
    colleagues: {
        name: string,
        contact: string | null,
        occupation: string | null,
        rg: string | null,
        cpf: string | null,
    }[],
    children: {
        name: string,
        birthdate: Date | null,
        contact: string | null,
    }[],
    address?: {
        street: string,
        district: string,
        number: string,
        state: string | null,
        city: string | null
    },
    note?: {
        note: string,
        reminder: Date | null
    }
}

export default function DoneeForm() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<DoneeFormData>({
    donee: {
      name: '',
      birthdate: new Date(),
      contact: '',
      occupation: '',
      rg: '',
      cpf: '',
    },
    spouse: {
      name: '',
      birthdate: new Date(),
      contact: '',
      occupation: '',
      rg: '',
      cpf: '',
    },
    colleagues: [{
      name: '',
      contact: '',
      occupation: '',
      rg: '',
      cpf: '',
    }],
    children: [{
      name: '',
      birthdate: new Date(),
      contact: '',
    }],
    address: {
      street: '',
      district: '',
      number: '',
      state: 'Santa Catarina',
      city: 'Itapema',
    },
    note: {
      note: '',
      reminder: new Date(),
    },
  });

  function recognizeStep(actualStep: number) {
    switch (actualStep) {
      case 1:
        return <Step1 doneeInfos={formData.donee} setDoneeInfos={(doneeInfos: DoneeFormData['donee']) => setFormData({ ...formData, donee: doneeInfos })} setStep={setStep} step={step} />;
      case 2:
        return <Step2 />;
      default:
        return <Step1 doneeInfos={formData.donee} setDoneeInfos={(doneeInfos: DoneeFormData['donee']) => setFormData({ ...formData, donee: doneeInfos })} setStep={setStep} step={step} />;
    }
  }

  if (!token) {
    setMessage({ type: 'error', text: 'Você não tem autorização, faça login' });
    navigate('/');
  }

  return (
    <Box id="container" sx={styles.container}>
      <Header setOpenSideBar={setOpenSideBar} />
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <Box id="box" sx={styles.box}>
        {recognizeStep(step)}
      </Box>
    </Box>
  );
};
