import { Table, Tooltip } from '@mantine/core';
import React from 'react'
import { EExerciseType, Exercise } from '../models/Exercise';



interface ExerciseTableProps {
    exercises: Exercise[] | null;
}

const ExerciseTable = ({exercises} : ExerciseTableProps) => {
  return (
    <div className='min-w-[400px]'>
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
                    <Table.Tr key={exercise.id} className='cursor-pointer'>
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
    </div>
  )
}

export default ExerciseTable