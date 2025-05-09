import { Table, Tooltip } from '@mantine/core'
import React from 'react'
import Template from '../models/Template';

interface TemplateTableProps {
    templates: Template[] | null;
}

const TemplateTable = ({templates} : TemplateTableProps) => {
  return (
    <div className='min-w-[400px]'>
        <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            {templates && templates.length > 0 ? (
                <>
                    {templates.map((template) => (
                    <Table.Tr key={template.id} className='cursor-pointer' onClick={() => window.location.href = `/template/${template.id}`}>
                        <Table.Td>
                            <Tooltip label={template.name} multiline>
                                <div className="truncate max-w-[15rem]">
                                    {template.name}
                                </div>
                            </Tooltip>
                        </Table.Td>
                        <Table.Td>
                            <Tooltip label={template.description} multiline>
                                <div className="truncate max-w-[15rem]">
                                    {template.description || "-"}
                                </div>
                            </Tooltip>
                        </Table.Td>
                    </Table.Tr>
                    ))} 
                </> 
                ) : (
                <Table.Tr key={0}>
                    <Table.Td colSpan={2} className='text-center'>No workouts found.</Table.Td>
                </Table.Tr>
                )
            }
            </Table.Tbody>
        </Table>
    </div>
  )
}

export default TemplateTable