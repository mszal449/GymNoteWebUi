import { Skeleton, Button } from '@mantine/core';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Workout from '../models/Workout';
import { IoArrowBack } from 'react-icons/io5';
import { getWorkoutById, endWorkout } from '../service/WorkoutService';
import WorkoutExercisesTable from './components/WorkoutExercisesTable';

const WorkoutPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [openExerciseId, setOpenExerciseId] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleRow = (exerciseId: number) => {
        setOpenExerciseId(openExerciseId === exerciseId ? null : exerciseId);
    };

    const refreshWorkout = async () => {
        try {
            if (!id) return;
            const workoutData = await getWorkoutById(parseInt(id));
            setWorkout(workoutData);
            setError(false);
        } catch (error) {
            console.error('Error fetching workout:', error);
            setError(true);
        }
    };

    const handleEndWorkout = async () => {
        try {
            if (!workout) return;
            await endWorkout(workout.id);
            navigate(`/template/${workout.template?.id}`);
        } catch (error) {
            console.error('Error ending workout:', error);
        }
    };

    useEffect(() => {
        const fetchWorkout = async () => {
            setIsLoading(true);
            try {
                if (!id) return;
                const workoutData = await getWorkoutById(parseInt(id));
                setWorkout(workoutData);
                setError(false);
            } catch (error) {
                console.error('Error fetching workout:', error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkout();
    }, [id]);
    
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-start-3 col-span-8 p-4">
                    {isLoading ? (
                        <div className="space-y-4">
                            <h1 className="text-4xl mb-2">Workout</h1>
                            <Skeleton height={16} radius="md" />
                            <Skeleton height={16} radius="md" />
                            <Skeleton height={16} radius="md" />
                            <Skeleton height={16} radius="md" />
                        </div>
                    ) : !error ? (
                        <div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className='flex items-center gap-4'>
                                    <a href={`/template/${workout?.template?.id}`}>
                                        <IoArrowBack size={24} />
                                    </a>
                                    <h1 className="text-4xl mb-1">Manage Workout</h1>
                                </div>
                                <Button 
                                    color="green" 
                                    onClick={handleEndWorkout}
                                    disabled={!workout || !!workout.endTime}
                                >
                                    End Workout
                                </Button>
                            </div>
                            <div className='text-2xl text-gray-600 mb-6'>{workout?.name}</div>
                            
                            <div className='space-y-4'>
                                {workout?.workoutExercises?.length ? (
                                    <WorkoutExercisesTable 
                                        workoutExercises={workout.workoutExercises}
                                        workoutId={workout.id}
                                        onRefresh={refreshWorkout}
                                    />
                                ) : (
                                    <div className='text-gray-500'>No exercises found for this workout.</div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='text-red-500'>An error occurred.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;