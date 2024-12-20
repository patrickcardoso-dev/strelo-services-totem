'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import './styles.css';

export default function CheckUserActivityModal() {
  const router = useRouter();
  const pathname = usePathname();

  const [openDialog, setOpenDialog] = useState(false);
  const openDialogRef = useRef(openDialog);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetInactivityTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setOpenDialog(true);
      openDialogRef.current = true;

      setTimeout(() => {
        redirectIfStillOpen();
      }, 1000 * 5);
    }, 1000 * 40);
  };

  const redirectIfStillOpen = () => {
    const isOpen = openDialogRef.current;
    if (isOpen) {
      router.push('/');
      handleClose();
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    openDialogRef.current = false;
  };

  useEffect(() => {
    if (pathname === '/') {
      return;
    }

    resetInactivityTimer();

    const events = [
      'click',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'touchend',
      'touchmove',
      'touchcancel',
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="modal-content"
    >
      <DialogTitle id="alert-dialog-title">Você ainda está aí?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Em 5 segundos, você será redirecionado para o início.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="button-div">
        <Button onClick={() => handleClose()} autoFocus variant="contained" color="info">
          Continuar aqui
        </Button>
      </DialogActions>
    </Dialog>
  );
}
