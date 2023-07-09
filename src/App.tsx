/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Box, Typography, Stack, Modal } from '@mui/material';
import {
   CloseIconBox,
   StyedLoadingButtonPrimary,
   StyledTextArea,
   StyledTextField,
   Wrapper,
} from './app.style';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type User = {
   name: string;
   email: string;
   phone: number;
   feedback?: string;
   marks?: number;
};

function App() {
   const [isOpen, setIsOpen] = useState(false);
   const toggleDrawer = () => {
      setIsOpen(!isOpen);
   };

   const [studentData, setStudentData] = useState<User | null>(null);
   const [studentDataLoading, setStudentDataLoading] = useState(false);
   const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

   const [email, setEmail] = useState('');
   const [marks, setMarks] = useState(0);
   const [feedback, setFeedback] = useState('');

   const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
      e.preventDefault();
      if (email.trim().length === 0) {
         alert('Please enter an email');

         return;
      }

      try {
         setStudentDataLoading(true);
         const { data, status }: AxiosResponse<User> = await axios.get(
            `https://interview-feedback-server-6c7bcd82775e.herokuapp.com/api/students/${email}`
         );
         if (status === 200) {
            setStudentData(data);
            setMarks(data?.marks || 0);
            setFeedback(data?.feedback || '');
            setStudentDataLoading(false);
            setIsOpen(true);
         }
      } catch (error) {
         alert('No student found, search again');
         setStudentDataLoading(false);
      }
   };

   const feedbackSubmitHandler = async (
      e: React.FormEvent<HTMLFormElement>

   ): Promise<any> => {
      e.preventDefault();

      if (feedback.trim().length === 0 || !marks) {
         alert('Please insert both marks and feedback');
         console.log({ feedback, marks });
         return;
      }

      setFeedbackSubmitting(true);

      try {
         const { status }: AxiosResponse<User> = await axios.post(
            `https://interview-feedback-server-6c7bcd82775e.herokuapp.com/api/students/update`,
            { marks, feedback, email }
         );
         if (status === 200) {
            setStudentData(null);
            setEmail('');
            setIsOpen(false);
            setFeedbackSubmitting(false);
            alert('Feedback and marks updated');
         }
      } catch (error) {
         alert('Something went wrong while adding feedback');
         setFeedbackSubmitting(false);
      }
   };

   return (
      <Box
         sx={{
            background: 'linear-gradient(to bottom, #4D4D4D, #4D4D4D)',
         }}
      >
         <Container>
            <Wrapper>
               <Stack
                  rowGap={1}
                  sx={{ width: '100%', maxWidth: '400px' }}
                  component='form'
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={handleSearch}
               >
                  <Typography
                     variant='h5'
                     sx={{ color: '#fff', textAlign: 'center' }}
                  >
                     Search Student
                  </Typography>
                  <StyledTextField
                     type='email'
                     size='small'
                     placeholder='e-mail'
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                  />
                  <StyedLoadingButtonPrimary
                     size='small'
                     loading={studentDataLoading}
                     variant='contained'
                     type='submit'
                  >
                     Search
                  </StyedLoadingButtonPrimary>
               </Stack>
            </Wrapper>
         </Container>

         <Modal
            open={isOpen}
            onClose={toggleDrawer}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            sx={{
               mx: 1,
            }}
         >
            <Box
               sx={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  maxWidth: '600px',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: [2, 5],
                  position: 'relative',
                  borderRadius: '5px',
                  borderTop: '5px solid #ffd05b',
               }}
            >
               <CloseIconBox onClick={toggleDrawer}>
                  <CloseIcon sx={{ fontSize: '1.3rem' }} />
               </CloseIconBox>
               <Box sx={{ mb: 2 }}>
                  <Typography>
                     <b>Name:</b> {studentData?.name}
                  </Typography>
                  <Typography>
                     <b>email:</b> {studentData?.email}
                  </Typography>
               </Box>
               <Stack
                  rowGap={2}
                  component='form'
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={feedbackSubmitHandler}
               >
                  <StyledTextField
                     type='number'
                     size='small'
                     placeholder='Marks'
                     label='Marks'
                     onChange={(e) => setMarks(Number(e.target.value))}
                     value={marks}
                  />

                  <StyledTextArea
                     label='Feedback'
                     multiline
                     rows={4}
                     //  variant='outlined'
                     onChange={(e) => setFeedback(e.target.value)}
                     value={feedback}
                  />

                  <StyedLoadingButtonPrimary
                     type='submit'
                     loading={feedbackSubmitting}
                  >
                     Submit
                  </StyedLoadingButtonPrimary>
               </Stack>
            </Box>
         </Modal>
      </Box>
   );
}

export default App;
