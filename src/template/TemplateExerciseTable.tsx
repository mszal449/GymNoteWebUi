import React from 'react'
import { Table } from '@mantine/core'
import TemplateExercise from '../models/TemplateExercise';
import { EExerciseType } from '../models/Exercise';



interface TemplateExerciseTableProps {
    exercises: TemplateExercise[] | null;
}

const exampleExercises: TemplateExercise[] = [
    {
        id: 1,
        exerciseName: 'Bench Press',
        order: 1,
        sets: 3,
        reps: 10,
        weight: 100,
        rest: 60,
        templateId: 1,
        exercise: {
            id: 1,
            userId: 1,
            exerciseName: 'Bench Press',
            type: EExerciseType.REPS,
            description: 'Chest exercise',
            orderIndex: 1
        }
    },
    {
        id: 2,
        exerciseName: 'Squat',
        order: 2,
        sets: 4,
        reps: 8,
        weight: 150,
        rest: 90,
        templateId: 1,
        exercise: {
            id: 2,
            userId: 1,
            exerciseName: 'Squat',
            type: EExerciseType.REPS,
            description: 'Leg exercise',
            orderIndex: 2
        }
    },
    {
        id: 3,
        exerciseName: 'Deadlift',
        order: 3,
        sets: 3,
        reps: 5,
        weight: 200,
        rest: 120,
        templateId: 1,
        exercise: {
            id: 3,
            userId: 1,
            exerciseName: 'Deadlift',
            type: EExerciseType.REPS,
            description: 'Back exercise',
            orderIndex: 3
        }
    }
];


const TemplateExerciseTable = ({exercises}: TemplateExerciseTableProps) => {
  return (
    <div className='w-full'>
        <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Order</Table.Th>
                <Table.Th>Sets</Table.Th>
                <Table.Th>Reps</Table.Th>
                <Table.Th>Weight</Table.Th>
                <Table.Th>Rest</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            {exampleExercises && exampleExercises.length > 0 ? (
                <>
                    {exampleExercises.sort((a, b) => (a.order || 0) - (b.order || 0)).map((exercise) => (
                    <Table.Tr key={exercise.id}>
                        <Table.Td>{exercise.exercise.exerciseName}</Table.Td>
                        <Table.Td>{exercise.order}</Table.Td>
                        <Table.Td>{exercise.sets}</Table.Td>
                        <Table.Td>{exercise.reps}</Table.Td>
                        <Table.Td>{exercise.weight}</Table.Td>
                        <Table.Td>{exercise.rest}</Table.Td>
                    </Table.Tr>
                    ))} 
                </> 
                ) : (
                <Table.Tr key={0}>
                    <Table.Td colSpan={2} className='text-center'>No exercises found.</Table.Td>
                </Table.Tr>
                )
            }
            </Table.Tbody>
        </Table>
    </div>
  )
}

export default TemplateExerciseTable