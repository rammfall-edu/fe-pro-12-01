import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '../components/Input';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../api';
import { format } from 'date-fns';
import { ModalConfirm } from '../components/ModalConfirm';
import { form } from '../constants/form';
import { ModalEditProject } from '../components/ModalEditProject';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, title: '' });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    title: '',
    data: {},
    handleConfirm: () => {},
  });

  useEffect(() => {
    getProjects().then(({ data }) => {
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
                const result = await createProject(values);

                setProjects((prevState) => {
                  return [...prevState, result.data.project];
                });

                formikHelpers.resetForm();
              }}
              validationSchema={form.projectsValidationSchema}
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
                <Edit
                  onClick={() => {
                    setEditModal({
                      isOpen: true,
                      data: { title },
                      handleConfirm: async (values, helpers) => {
                        console.log(values, helpers);
                        await updateProject(id, values);

                        setProjects((prevState) => {
                          return prevState.map((project) => {
                            if (project.id === id) {
                              return {
                                ...project,
                                title: values.title,
                              };
                            }

                            return project;
                          });
                        });
                        setEditModal((prevState) => ({
                          ...prevState,
                          isOpen: false,
                        }));
                      },
                      title: `Update ${title}`,
                    });
                  }}
                />
                <Delete
                  onClick={() =>
                    setModal({
                      isOpen: true,
                      title: `Are you sure to delete ${title}`,
                      handleConfirm: async () => {
                        await deleteProject(id);
                        setProjects((prevState) =>
                          prevState.filter((project) => project.id !== id)
                        );
                      },
                    })
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <ModalConfirm
        isOpen={modal.isOpen}
        title={modal.title}
        handleClose={() => {
          setModal((prevState) => {
            return {
              ...prevState,
              isOpen: false,
            };
          });
        }}
        handleConfirm={modal.handleConfirm}
      />
      <ModalEditProject
        isOpen={editModal.isOpen}
        title={editModal.title}
        data={editModal.data}
        handleClose={() => {
          setEditModal((prevState) => ({ ...prevState, isOpen: false }));
        }}
        handleConfirm={editModal.handleConfirm}
      />
    </Box>
  );
};
