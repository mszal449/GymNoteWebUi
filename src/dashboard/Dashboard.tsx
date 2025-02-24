import React, { useEffect, useState } from 'react'
import Template from '../models/Template';
import TemplateTable from './TemplateTable';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, Skeleton } from '@mantine/core';
import CreateTemplateModal, { TemplateFormData } from './CreateTemplateModal';
import { addTemplate, getTemplates } from '../service/TemplateService';
import { notifications } from '@mantine/notifications';
import { addExercise, getExercises } from '../service/ExerciseService';
import { Exercise } from '../models/Exercise';
import ExerciseTable from './ExerciseTable';
import CreateExerciseModal, { ExerciseFormData } from './CreateExerciseModal';


const Dashboard = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [OpenedTemplateModal, { open: OpenTemplateModal, close: CloseTemplateModal }] = useDisclosure(false);
  const [OpenedExerciseModal, { open: OpenExerciseModal, close: CloseExerciseModal }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
        const templates = await getTemplates();
        setTemplates(templates);
    } catch (err) {
        notifications.show({
          title: 'Error',
          message: "There was an error during template fetching. Please try again later.",
          color: 'red',
          autoClose: 3000
        });
        setTemplates([]);
    } finally {
        setIsLoading(false);
    }
  };

  const loadExercises = async () => {
    setIsLoading(true);
    try {
        const fetchedExercises = await getExercises();
        setExercises(fetchedExercises);
    } catch (err) {
        notifications.show({
          title: 'Error',
          message: "There was an error during exercise fetching. Please try again later.",
          color: 'red',
          autoClose: 3000
        });
        setExercises([]);
    } finally {
        setIsLoading(false);
    }
  };

  
  
  const handleCreateTemplate = async (templateData: TemplateFormData) => {
    try {
      setIsLoading(true);
      await addTemplate(templateData.name, templateData.description);
      
      notifications.show({
        title: 'Success',
        message: 'Template created successfully',
        color: 'green',
        autoClose: 3000
      });
      
      await loadTemplates();
      CloseTemplateModal();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create template';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateExercise = async (exerciseData: ExerciseFormData) => {
    try {
      setIsLoading(true);
      await addExercise(exerciseData.name, exerciseData.description, exerciseData.type);
      
      notifications.show({
        title: 'Success',
        message: 'Template created successfully',
        color: 'green',
        autoClose: 3000
      });
      
      await loadExercises();
      CloseExerciseModal();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create exercise';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(()=> {
    loadTemplates();
    loadExercises();
  }, [])


  return (
    <div className='flex flex-col items-center w-full'>
      <div className='text-2xl'>Dashboard</div>
      <div>
        {isLoading ? (
          <div>
            Loading...
          </div>
        ) : (
          <div className='grid grid-cols-12 gap-10 mt-10'>

            {/* Templates */}
            <div className='col-start-3 col-span-4'>
              <div className='text-2xl'>Templates</div>
              <TemplateTable templates={templates}/>
              <CreateTemplateModal 
                opened={OpenedTemplateModal} 
                onClose={CloseTemplateModal} 
                onSubmit={handleCreateTemplate}/>
              <Button variant="filled" onClick={OpenTemplateModal} className='mt-4'>
                  Create Template
              </Button>
            </div>

            {/* Exercises */}
            <div className='col-start-7 col-span-4'>
              <div className='text-2xl'>Exercises</div>
              <ExerciseTable exercises={exercises}/>
              <CreateExerciseModal 
                opened={OpenedExerciseModal} 
                onClose={CloseExerciseModal} 
                onSubmit={handleCreateExercise}/>
              <Button variant="filled" onClick={OpenExerciseModal} className='mt-4'>
                  Create Exercise
              </Button>
            </div>

          </div>
          
        )}
        

        
      </div>
    </div>
  )
}

export default Dashboard;