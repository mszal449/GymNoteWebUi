import React from 'react'
import { Table } from '@mantine/core'
import TemplateExercise from '../models/TemplateExercise';



interface TemplateExerciseTableProps {
    exercises: TemplateExercise[] | null;
}

const TemplateExerciseTable = ({exercises}: TemplateExerciseTableProps) => {
  console.log('Exercises in table:', exercises); // Add debugging log

  return (
    <div className='w-full'>
        <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Order</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            {exercises && exercises.length > 0 ? (
                <>
                    {exercises.sort((a, b) => (a.order || 0) - (b.order || 0)).map((exercise) => (
                    <Table.Tr key={exercise.id}>
                        <Table.Td>{exercise.id}</Table.Td>
                        <Table.Td>{exercise.exercise.exerciseName}</Table.Td>
                        <Table.Td>{exercise.exercise.description}</Table.Td>
                        <Table.Td>{exercise.exerciseOrder}</Table.Td>
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
    </div>
  )
}

export default TemplateExerciseTable