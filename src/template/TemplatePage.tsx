import { Container, Skeleton, Tabs } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getTemplateById } from '../service/TemplateService';
import Template from '../models/Template';
import { notifications } from '@mantine/notifications';
import { TbBarbell } from "react-icons/tb";
import { RiTimerFlashLine } from "react-icons/ri";
import ExerciseTable from './ExerciseTable';


const TemplatePage = () => {
    const { id } = useParams<{ id: string }>();
    const [template, setTemplate] = useState<Template | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadTemplate = async () => {
        setIsLoading(true);
        try {
            if (id) {
                const data = await getTemplateById(Number(id));
                setTemplate(data);
                console.log(template)
            } else {
                throw new Error("Invalid template ID");
            }
        } catch (err) {
            notifications.show({
              title: 'Error',
              message: "There was an error during data fetching. Please try again later.",
              color: 'red',
              autoClose: 3000
            });
            setTemplate(null);
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
                            <h1 className="text-4xl mb-1">Template {template.name}</h1>
                            <div className='text-2xl text-gray-600'>{template.description}</div>

                            <Tabs defaultValue="exercises">
                            <Tabs.List>
                                <Tabs.Tab value="exercises" leftSection={<TbBarbell size={20} />}>
                                    <span className='text-xl'>Exercises</span>
                                </Tabs.Tab>
                                <Tabs.Tab value="messages" leftSection={<RiTimerFlashLine size={20}/>}>
                                    <span className='text-xl'>Workouts</span>
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="exercises">
                                <ExerciseTable exercises={null} />
                            </Tabs.Panel>

                            <Tabs.Panel value="messages">
                                Messages tab content
                            </Tabs.Panel>

                            </Tabs>

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