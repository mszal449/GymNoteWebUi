import { Modal, Table, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Exercise } from '../models/Exercise';
import { getExercises } from '../service/ExerciseService';
import { notifications } from '@mantine/notifications';

interface AddExistingExerciseModalProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (exerciseId: number) => void;
    templateId: number;
}

const AddExistingExerciseModal = ({ opened, onClose, onSubmit, templateId }: AddExistingExerciseModalProps) => {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
    
    useEffect(() => {
        loadExercises()
    }, [])

    
    return (
        <Modal opened={opened} onClose={onClose} title="Add Existing Exercise" centered size='auto'>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                        <Table.Th>Id</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Type</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                    {exercises && exercises.length > 0 ? (
                        <>
                            {exercises.map((exercise) => (
                            <Table.Tr 
                                key={exercise.id} 
                                className='cursor-pointer hover:bg-gray-100'
                                onClick={() => onSubmit(exercise.id)}
                            >
                                <Table.Td>{exercise.id}</Table.Td>
                                <Table.Td>
                                    <Tooltip label={exercise.exerciseName} multiline>
                                        <div className="truncate max-w-[15rem]">
                                            {exercise.exerciseName}
                                        </div>
                                    </Tooltip>
                                </Table.Td>
                                <Table.Td>
                                    <Tooltip label={exercise.description} multiline>
                                        <div className="truncate max-w-[15rem]">
                                            {exercise.description || "-"}
                                        </div>
                                    </Tooltip>
                                </Table.Td>
                                <Table.Td>{exercise.type || "-"}</Table.Td>
                            </Table.Tr>
                            ))} 
                        </> 
                        ) : (
                        <Table.Tr key={0}>
                            <Table.Td colSpan={3} className='text-center'>No exercises found.</Table.Td>
                        </Table.Tr>
                        )
                    }
                    </Table.Tbody>
                </Table>
        </Modal>
    );
};

export default AddExistingExerciseModal;