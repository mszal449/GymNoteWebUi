import React from 'react'
import { Table } from '@mantine/core'
import TemplateExercise from '../models/TemplateExercise';



interface TemplateExerciseTableProps {
    exercises: TemplateExercise[] | null;
}


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
            {exercises && exercises.length > 0 ? (
                <>
                    {exercises.sort((a, b) => (a.order || 0) - (b.order || 0)).map((exercise) => (
                    <Table.Tr key={exercise.id}>
                        <Table.Td>{exercise.exerciseName}</Table.Td>
                        <Table.Td>{exercise.order || "-"}</Table.Td>
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