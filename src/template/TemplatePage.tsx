import { Button, Container, Skeleton, Tabs } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getTemplateById } from '../service/TemplateService';
import Template from '../models/Template';
import { notifications } from '@mantine/notifications';
import { TbBarbell } from "react-icons/tb";
import { RiTimerFlashLine } from "react-icons/ri";
import TemplateExerciseTable from './TemplateExerciseTable';
import { useDisclosure } from '@mantine/hooks';

import CreateExerciseModal, { ExerciseFormData } from '../dashboard/CreateExerciseModal';
import AddExistingExerciseModal from './AddExistingExerciseModal';
import { addExercise } from '../service/ExerciseService';
import { Exercise } from '../models/Exercise';



const TemplatePage = () => {
    const { id } = useParams<{ id: string }>();
    const [template, setTemplate] = useState<Template | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [openedNewExercise, { open: openNewExercise, close: closeNewExercise }] = useDisclosure(false);
    const [openedExisting, { open: openExisting, close: closeExisting }] = useDisclosure(false);


    const handleCreateExercise = async (exerciseData: ExerciseFormData) => {
        try {
          setIsLoading(true);

          // Create exercise
          const exercise: Exercise = await addExercise(exerciseData.name, exerciseData.description, exerciseData.type);
          
          // Add exercise to template
          

          notifications.show({
            title: 'Success',
            message: 'Exercise created successfully',
            color: 'green',
            autoClose: 3000
          });
          
          await loadTemplate();
          closeExisting();
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

    const handleAddExistingExercise = async (exerciseId: number) => {
        closeExisting();
    };

        
    const loadTemplate = async () => {
        setIsLoading(true);
        try {
            if (id) {
                const data = await getTemplateById(Number(id));
                setTemplate(data);
                console.log(template)
            } else {
                throw new Error("Invalid template ID");
            }
        } catch (err) {
            notifications.show({
              title: 'Error',
              message: "There was an error during data fetching. Please try again later.",
              color: 'red',
              autoClose: 3000
            });
            setTemplate(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        loadTemplate();
    }, [])

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-start-3 col-span-8 p-4">
                    {isLoading ? (
                        <div className="space-y-4">
                            <h1 className="text-4xl mb-2">Template</h1>
                            <Skeleton height={16} radius="md" />
                            <Skeleton height={16} radius="md" />
                            <Skeleton height={16} radius="md" />
                            <Skeleton height={16} radius="md" />
                        </div>
                    ) : template ? (
                        <div>
                            <h1 className="text-4xl mb-1">Template {template.name}</h1>
                            <div className='text-2xl text-gray-600'>{template.description}</div>

                            <Tabs defaultValue="exercises">
                            <Tabs.List>
                                <Tabs.Tab value="exercises" leftSection={<TbBarbell size={20} />}>
                                    <span className='text-xl'>Exercises</span>
                                </Tabs.Tab>
                                <Tabs.Tab value="messages" leftSection={<RiTimerFlashLine size={20}/>}>
                                    <span className='text-xl'>Workouts</span>
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="exercises" className='mt-4'>
                                <div className='flex gap-4'>
                                    <Button onClick={openExisting}>Add existing exercise</Button>
                                    <Button onClick={openNewExercise}>Add new exercise</Button>
                                </div>
                                <TemplateExerciseTable exercises={null} />
                            </Tabs.Panel>

                            <Tabs.Panel value="messages">
                                Messages tab content
                            </Tabs.Panel>

                            </Tabs>
                            <CreateExerciseModal
                                opened={openedNewExercise}
                                onClose={closeNewExercise}
                                onSubmit={handleCreateExercise}
                            />

                            <AddExistingExerciseModal
                                opened={openedExisting}
                                onClose={closeExisting}
                                onSubmit={handleAddExistingExercise}
                                templateId={Number(id)}
                            />


                        </div>
                    ) : (
                        <div className='text-red-500'>An error occured.</div>
                    )}
                </div>
            </div>
        </div>
  )
}

export default TemplatePage