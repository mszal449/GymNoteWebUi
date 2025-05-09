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
import { IoArrowBack } from "react-icons/io5";

import CreateExerciseModal, { ExerciseFormData } from '../dashboard/CreateExerciseModal';
import AddExistingExerciseModal from './AddExistingExerciseModal';
import { addExercise } from '../service/ExerciseService';
import { Exercise } from '../models/Exercise';
import { addExerciseToTemplate } from '../service/TemplateExerciseService';
import WorkoutsTable from './WorkoutsTable';
import { startWorkout } from '../service/WorkoutService';



const TemplatePage = () => {
    const { id } = useParams<{ id: string }>();
    const [template, setTemplate] = useState<Template | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string | null>("exercises");

    const [openedNewExercise, { open: openNewExercise, close: closeNewExercise }] = useDisclosure(false);
    const [openedExisting, { open: openExisting, close: closeExisting }] = useDisclosure(false);


    const handleCreateExercise = async (exerciseData: ExerciseFormData) => {
        try {
          setIsLoading(true);

          // Create exercise
          const exercise: Exercise = await addExercise(exerciseData.name, exerciseData.description, exerciseData.type);
          
          // add exercise to template
          await handleAddExistingExercise(exercise.id);

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
        try {
            setIsLoading(true);
            // Get the current highest order index
            const currentExercises = template?.exercises || [];
            console.log('Current exercises:', currentExercises);
            
            let nextOrder;
            if (currentExercises.length === 0) {
                nextOrder = 0;
            } else {
                const orders = currentExercises.map(e => e.exerciseOrder || 0);
                console.log('Current orders:', orders);
                nextOrder = Math.max(...orders) + 1;
            }
            
            console.log('Next order:', nextOrder);
            await addExerciseToTemplate(Number(id), exerciseId, nextOrder);
            
            notifications.show({
                title: 'Success',
                message: 'Exercise added to template successfully',
                color: 'green',
                autoClose: 3000
            });

            await loadTemplate();
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Failed to add exercise to template';
            notifications.show({
                title: 'Error',
                message: errorMessage,
                color: 'red',
                autoClose: 3000
            });
        } finally {
            setIsLoading(false);
            closeExisting();
        }
    };

    const loadTemplate = async () => {
        setIsLoading(true);
        try {
            if (id) {
                const data = await getTemplateById(Number(id));
                setTemplate(data);
            } else {
                throw new Error("Invalid template ID");
            }
        } catch (err) {
            notifications.show({
              message: "There was an error during data fetching. Please try again later.",
              color: 'red',
              autoClose: 3000
            });
            setTemplate(null);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleStartWorkout = async () => {
        try {
            setIsLoading(true);
            if (!template) return;
            
            await startWorkout(template.id);
            // Switch to workouts tab after starting
            setActiveTab("workouts");
            notifications.show({
                title: 'Success',
                message: 'Workout started successfully',
                color: 'green',
                autoClose: 3000
            });
            
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Failed to start workout',
                color: 'red',
                autoClose: 3000
            });
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
                            <div className='flex items-center gap-4'>
                                <a href="/dashboard">
                                    <IoArrowBack size={24} />
                                </a>
                                <h1 className="text-4xl mb-1">Template {template.name}</h1>
                            </div>
                            <div className='text-2xl text-gray-600'>{template.description}</div>

                            <Tabs value={activeTab} onChange={setActiveTab}>
                            <Tabs.List>
                                <Tabs.Tab value="exercises" leftSection={<TbBarbell size={20} />}>
                                    <span className='text-xl'>Exercises</span>
                                </Tabs.Tab>
                                <Tabs.Tab value="workouts" leftSection={<RiTimerFlashLine size={20}/>}>
                                    <span className='text-xl'>Workouts</span>
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="exercises" className='mt-4'>
                                <div className='flex gap-4'>
                                    <Button onClick={openExisting}>Add existing exercise</Button>
                                    <Button onClick={openNewExercise}>Add new exercise</Button>
                                </div>
                                <TemplateExerciseTable exercises={template.exercises} />
                            </Tabs.Panel>

                            <Tabs.Panel value="workouts" className='mt-2'>
                                <Button className='my-2' onClick={handleStartWorkout}>Start Workout</Button>
                                <WorkoutsTable templateId={template.id}  />
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