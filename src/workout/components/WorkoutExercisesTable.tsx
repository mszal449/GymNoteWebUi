import { Table, Collapse, Button, NumberInput } from '@mantine/core';
import React, { useState, useCallback, useEffect } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import WorkoutExercise from '../../models/WorkoutExercise';
import { createExerciseSet, deleteExerciseSet, updateExerciseSet } from '../../service/ExerciseSetService';
import { debounce } from 'lodash';

interface WorkoutExercisesTableProps {
    workoutExercises: WorkoutExercise[];
    workoutId: number;
    onRefresh: () => Promise<void>;
}

const WorkoutExercisesTable: React.FC<WorkoutExercisesTableProps> = ({ workoutExercises, workoutId, onRefresh }) => {
    const [openExerciseId, setOpenExerciseId] = useState<number | null>(null);
    const [addSetModalOpen, setAddSetModalOpen] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
    const [updatingSetIds, setUpdatingSetIds] = useState<number[]>([]);
    const [setValues, setSetValues] = useState<Record<number, { weight: number; reps: number }>>({});
    const [newSetValues, setNewSetValues] = useState<Record<number, { weight: number; reps: number }>>({});
    const [isAddingSet, setIsAddingSet] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const initialValues: Record<number, { weight: number; reps: number }> = {};
        workoutExercises.forEach(exercise => {
            exercise.sets?.forEach(set => {
                initialValues[set.id] = { weight: set.weight, reps: set.reps };
            });
        });
        setSetValues(initialValues);
    }, [workoutExercises]);

    useEffect(() => {
        const initialNewSetValues: Record<number, { weight: number; reps: number }> = {};
        const initialIsAddingSet: Record<number, boolean> = {};
        workoutExercises.forEach(exercise => {
            initialNewSetValues[exercise.id] = { weight: 0, reps: 0 };
            initialIsAddingSet[exercise.id] = false;
        });
        setNewSetValues(initialNewSetValues);
        setIsAddingSet(initialIsAddingSet);
    }, [workoutExercises]);

    const toggleRow = (exerciseId: number) => {
        setOpenExerciseId(openExerciseId === exerciseId ? null : exerciseId);
    };

    const handleAddSet = async (exerciseId: number) => {
        try {
            setIsAddingSet(prev => ({ ...prev, [exerciseId]: true }));
            const newSet = newSetValues[exerciseId];
            await createExerciseSet(workoutId, exerciseId, newSet);
            setNewSetValues(prev => ({
                ...prev,
                [exerciseId]: { weight: 0, reps: 0 }
            }));
            await onRefresh();
        } catch (error) {
            console.error('Error adding set:', error);
        } finally {
            setIsAddingSet(prev => ({ ...prev, [exerciseId]: false }));
        }
    };

    const handleDeleteSet = async (exerciseId: number, setId: number) => {
        if (!confirm('Are you sure you want to delete this set?')) return;
        
        try {
            await deleteExerciseSet(workoutId, exerciseId, setId);
            await onRefresh();
        } catch (error) {
            console.error('Error deleting set:', error);
        }
    };

    const handleSetUpdate = useCallback(
        debounce(async (exerciseId: number, setId: number, weight: number, reps: number) => {
            try {
                setUpdatingSetIds(prev => [...prev, setId]);
                await updateExerciseSet(workoutId, exerciseId, setId, { weight, reps });
                await onRefresh();
            } catch (error) {
                console.error('Error updating set:', error);
            } finally {
                setUpdatingSetIds(prev => prev.filter(id => id !== setId));
            }
        }, 500),
        [workoutId, onRefresh]
    );

    const updateSetValue = (setId: number, field: 'weight' | 'reps', value: number) => {
        setSetValues(prev => ({
            ...prev,
            [setId]: { ...prev[setId], [field]: value }
        }));
    };

    return (
        <>
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Exercise</Table.Th>
                        <Table.Th>Sets</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {workoutExercises.map((exercise) => (
                        <React.Fragment key={exercise.id}>
                            <Table.Tr>
                                <Table.Td>
                                    <Button
                                        onClick={() => toggleRow(exercise.id)}
                                        variant="subtle"
                                        size="sm"
                                    >
                                        {openExerciseId === exercise.id ? (
                                            <IoChevronUp size={18} />
                                        ) : (
                                            <IoChevronDown size={18} />
                                        )}
                                    </Button>
                                </Table.Td>
                                <Table.Td>{exercise.exercise.exerciseName}</Table.Td>
                                <Table.Td>{exercise.sets?.length || 0}</Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td colSpan={4} style={{ padding: 0 }}>
                                    <Collapse in={openExerciseId === exercise.id}>
                                        <div className="p-4">
                                            <Table>
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th>Set</Table.Th>
                                                        <Table.Th>Weight (kg)</Table.Th>
                                                        <Table.Th>Reps</Table.Th>
                                                        <Table.Th>Actions</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {exercise.sets && exercise.sets.length > 0 ? (
                                                        exercise.sets.map((set, index) => (
                                                            <Table.Tr key={set.id}>
                                                                <Table.Td>{index + 1}</Table.Td>
                                                                <Table.Td>
                                                                    <NumberInput
                                                                        value={setValues[set.id]?.weight ?? 0}
                                                                        min={0}
                                                                        step={2.5}
                                                                        w={100}
                                                                        disabled={updatingSetIds.includes(set.id)}
                                                                        onChange={(value) => {
                                                                            const numValue = Number(value);
                                                                            updateSetValue(set.id, 'weight', numValue);
                                                                            handleSetUpdate(
                                                                                exercise.id,
                                                                                set.id,
                                                                                numValue,
                                                                                setValues[set.id]?.reps ?? 0
                                                                            );
                                                                        }}
                                                                    />
                                                                </Table.Td>
                                                                <Table.Td>
                                                                    <NumberInput
                                                                        value={setValues[set.id]?.reps ?? 0}
                                                                        min={0}
                                                                        w={100}
                                                                        disabled={updatingSetIds.includes(set.id)}
                                                                        onChange={(value) => {
                                                                            const numValue = Number(value);
                                                                            updateSetValue(set.id, 'reps', numValue);
                                                                            handleSetUpdate(
                                                                                exercise.id,
                                                                                set.id,
                                                                                setValues[set.id]?.weight ?? 0,
                                                                                numValue
                                                                            );
                                                                        }}
                                                                    />
                                                                </Table.Td>
                                                                <Table.Td>
                                                                    <Button
                                                                        color="red"
                                                                        size="sm"
                                                                        variant="subtle"
                                                                        onClick={() => handleDeleteSet(exercise.id, set.id)}
                                                                        disabled={updatingSetIds.includes(set.id)}
                                                                        w={100}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Table.Td>
                                                            </Table.Tr>
                                                        ))
                                                    ) : (
                                                        <Table.Tr>
                                                            <Table.Td colSpan={4} className="text-center">
                                                                No sets found
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                    <Table.Tr className="bg-gray-50">
                                                        <Table.Td className="text-center text-gray-500 text-sm">

                                                        </Table.Td>
                                                        <Table.Td className="text-center text-gray-500 text-sm">
                                                            <NumberInput
                                                                placeholder="Weight (kg)"
                                                                value={newSetValues[exercise.id]?.weight}
                                                                min={0}
                                                                step={2.5}
                                                                w={100}
                                                                disabled={isAddingSet[exercise.id]}
                                                                onChange={(value) => setNewSetValues(prev => ({
                                                                    ...prev,
                                                                    [exercise.id]: { ...prev[exercise.id], weight: Number(value) }
                                                                }))}
                                                            />
                                                        </Table.Td>
                                                        <Table.Td className="text-center">
                                                            <NumberInput
                                                                placeholder="Reps"
                                                                value={newSetValues[exercise.id]?.reps}
                                                                min={0}
                                                                w={100}
                                                                disabled={isAddingSet[exercise.id]}
                                                                onChange={(value) => setNewSetValues(prev => ({
                                                                    ...prev,
                                                                    [exercise.id]: { ...prev[exercise.id], reps: Number(value) }
                                                                }))}
                                                            />
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Button
                                                                size="sm"
                                                                loading={isAddingSet[exercise.id]}
                                                                onClick={() => handleAddSet(exercise.id)}
                                                                variant="light"
                                                                w={100}
                                                            >
                                                                Add Set
                                                            </Button>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </Collapse>
                                </Table.Td>
                            </Table.Tr>
                        </React.Fragment>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );
};

export default WorkoutExercisesTable;


