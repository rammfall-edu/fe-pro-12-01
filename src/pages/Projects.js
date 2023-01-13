import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '../components/Input';
import { httpClient } from '../api';
import { format } from 'date-fns';

export const ProjectsPage = ({ authInfo }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    httpClient
      .get('/project/', {
        headers: {
          sessionid: authInfo.sessionId,
          accesstoken: authInfo.accessToken,
        },
      })
      .then(({ data }) => {
        setProjects(data.projects);
      });
  }, []);

  return (
    <Box sx={{ marginTop: 2 }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Formik
              initialValues={{ title: '' }}
              onSubmit={async (values, formikHelpers) => {
                const result = await httpClient.post('/project/', values, {
                  headers: {
                    sessionid: authInfo.sessionId,
                    accesstoken: authInfo.accessToken,
                  },
                });

                setProjects((prevState) => {
                  return [...prevState, result.data.project];
                });

                formikHelpers.resetForm();
              }}
              validationSchema={yup.object().shape({
                title: yup.string().label('Title').min(6).max(20).required(),
              })}
            >
              <Form>
                <Stack spacing={2}>
                  <Typography component="h1" variant="h5" align="center">
                    Create project
                  </Typography>
                  <Input name="title" label="Title" required />
                  <Button variant="contained" size="large" type="submit">
                    Create
                  </Button>
                </Stack>
              </Form>
            </Formik>
          </Grid>

          {projects.map(({ id, title, createdAt }) => {
            return (
              <Grid
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                item
                xs={12}
                key={id}
              >
                <Typography component="h2" variant="h5">
                  {title}
                </Typography>
                <Typography component="p" variant="h5">
                  {format(new Date(createdAt), 'yyyy-MM-dd')}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
