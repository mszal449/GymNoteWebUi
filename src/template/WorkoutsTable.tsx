import { Table } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import Workout from '../models/Workout'
import { getTemplateWorkouts } from '../service/WorkoutService'

interface WorkoutsTableProps {
    templateId: number;
}

const WorkoutsTable: React.FC<WorkoutsTableProps> = ({ templateId }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([])

    useEffect(() => {
        fetchWorkouts();
    }, [templateId]);

    const fetchWorkouts = async () => {
        try {
            const data = await getTemplateWorkouts(templateId);
            setWorkouts(data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    }
    

    return (
        <div className='w-full'>
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Id</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Start Time</Table.Th>
                        <Table.Th>End Time</Table.Th>
                        <Table.Th>Notes</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                {workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <Table.Tr key={workout.id}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => window.location.href = `/workouts/${workout.id}`}
                        >
                            <Table.Td>{workout.id}</Table.Td>
                            <Table.Td>{workout.name}</Table.Td>
                            <Table.Td>{new Date(workout.startTime).toLocaleString()}</Table.Td>
                            <Table.Td>{workout.endTime ? new Date(workout.endTime).toLocaleString() : '-'}</Table.Td>
                            <Table.Td>{workout.notes || '-'}</Table.Td>
                        </Table.Tr>
                    ))
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan={5} className='text-center'>No workouts found.</Table.Td>
                    </Table.Tr>
                )}
                </Table.Tbody>
            </Table>
        </div>
    )
}

export default WorkoutsTable