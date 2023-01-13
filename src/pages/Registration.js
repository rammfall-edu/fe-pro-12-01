import React from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { httpClient } from '../api';
import * as yup from 'yup';
import { Input } from '../components/Input';

export const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ marginTop: 2 }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Formik
              initialValues={{
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={async (values, formikHelpers) => {
                try {
                  const result = await httpClient.post('/user', values);

                  formikHelpers.resetForm();
                  navigate('/login');
                } catch (err) {
                  const {
                    response: { data },
                  } = err;

                  formikHelpers.setFieldError(data.field, data.message);
                }
              }}
              validationSchema={yup.object().shape({
                email: yup
                  .string()
                  .label('Email')
                  .min(6)
                  .email()
                  .max(30)
                  .required(),
                password: yup
                  .string()
                  .label('Password')
                  .min(8)
                  .max(30)
                  .required(),
                confirmPassword: yup
                  .string()
                  .label('Password')
                  .min(8)
                  .max(30)
                  .required()
                  .oneOf([yup.ref('password')], 'Password should be identical'),
                username: yup
                  .string()
                  .label('Username')
                  .min(4)
                  .max(10)
                  .required(),
              })}
            >
              <Form autoComplete="off" noValidate>
                <Stack spacing={2}>
                  <Typography component="h1" align="center" variant="h3">
                    Registration
                  </Typography>
                  <Input label="Email" required name="email" />
                  <Input label="Username" required name="username" />
                  <Input label="Password" type="password" name="password" />
                  <Input
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                  />
                  <Button type="submit" variant="contained" size="large">
                    Register
                  </Button>
                </Stack>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
