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
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import Step6 from './Steps/Step6';
import Step7 from './Steps/Step7';

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
        name: string | null,
        birthdate: Date | null,
        contact: string | null,
        occupation: string | null,
        rg: string | null,
        cpf: string | null,
    },
    colleagues: {
        name: string | null,
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
    address: {
        street: string | null,
        district: string | null,
        number: string | null,
        state: string | null,
        city: string | null
    },
    note: {
        note: string | null,
        reminder: Date | null
    }
}

export default function DoneeForm() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [hasSpouse, setHasSpouse] = React.useState(false);
  const [hasChildren, setHasChildren] = React.useState(false);
  const [hasColleagues, setHasColleagues] = React.useState(false);
  const [hasAddress, setHasAddress] = React.useState(false);
  const [hasNote, setHasNote] = React.useState(false);
  const [formData, setFormData] = React.useState<DoneeFormData>({
    donee: {
      name: '',
      birthdate: new Date(),
      contact: null,
      occupation: null,
      rg: null,
      cpf: null,
    },
    spouse: {
      name: null,
      birthdate: new Date(),
      contact: null,
      occupation: null,
      rg: null,
      cpf: null,
    },
    colleagues: [],
    children: [],
    address: {
      street: null,
      district: null,
      number: null,
      state: 'Santa Catarina',
      city: 'Itapema',
    },
    note: {
      note: null,
      reminder: new Date(),
    },
  });

  function recognizeStep(actualStep: number) {
    switch (actualStep) {
      case 1:
        return <Step1 doneeInfos={formData.donee} setDoneeInfos={(doneeInfos: DoneeFormData['donee']) => setFormData({ ...formData, donee: doneeInfos })} setStep={setStep} step={step} />;
      case 2:
        return <Step2 spouseInfos={formData.spouse} setSpouseInfos={(spouseInfos: DoneeFormData['spouse']) => setFormData({ ...formData, spouse: spouseInfos })} setStep={setStep} step={step} hasSpouse={hasSpouse} setHasSpouse={setHasSpouse} />;
      case 3:
        return (
          <Step3
            colleaguesInfos={formData.colleagues}
            setColleaguesInfos={(colleaguesInfos: DoneeFormData['colleagues']) => setFormData({ ...formData, colleagues: colleaguesInfos })}
            setStep={setStep}
            step={step}
            hasColleagues={hasColleagues}
            setHasColleagues={setHasColleagues}
          />
        );
      case 4:
        return <Step4 childrenInfos={formData.children} setChildrenInfos={(childrenInfos: DoneeFormData['children']) => setFormData({ ...formData, children: childrenInfos })} setStep={setStep} step={step} hasChildren={hasChildren} setHasChildren={setHasChildren} />;
      case 5:
        return <Step5 addressInfos={formData.address} setAddressInfos={(addressInfos: DoneeFormData['address']) => setFormData({ ...formData, address: addressInfos })} setStep={setStep} step={step} hasAddress={hasAddress} setHasAddress={setHasAddress} />;
      case 6:
        return <Step6 noteInfos={formData.note} setNoteInfos={(noteInfos: DoneeFormData['note']) => setFormData({ ...formData, note: noteInfos })} setStep={setStep} step={step} hasNote={hasNote} setHasNote={setHasNote} />;
      case 7:
        return <Step7 formInfos={formData} setStep={setStep} step={step} />;
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
