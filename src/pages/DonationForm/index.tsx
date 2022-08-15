import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import {
  Typography, Box, Button, Pagination,
} from '@mui/material';
import styles from './styles';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Categories from '../../types/categoryTypes';

export interface DonationFormData {
    donation: {
        quantity: number,
        description: string | null,
        category: Categories,
    };
    note: {
        note: string | null,
        reminder: Date | null
    };
}

export default function DonationForm() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [hasNote, setHasNote] = React.useState(false);
  const [formData, setFormData] = React.useState<DonationFormData>({
    donation: {
      quantity: 1,
      description: null,
      category: 'Outros',
    },
    note: {
      note: null,
      reminder: null,
    },
  });

  function recognizeStep(actualStep: number) {
    switch (actualStep) {
      case 1:
        return <Step1 donationInfos={formData.donation} setDonationInfos={(donationInfos: DonationFormData['donation']) => setFormData({ ...formData, donation: donationInfos })} setStep={setStep} step={step} />;
      case 2:
        return <Step2 noteInfos={formData.note} setNoteInfos={(noteInfos: DonationFormData['note']) => setFormData({ ...formData, note: noteInfos })} setStep={setStep} step={step} hasNote={hasNote} setHasNote={setHasNote} />;
      case 3:
        return <Step3 formInfos={formData} setStep={setStep} step={step} />;
      default:
        return <Step1 donationInfos={formData.donation} setDonationInfos={(donationInfos: DonationFormData['donation']) => setFormData({ ...formData, donation: donationInfos })} setStep={setStep} step={step} />;
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
