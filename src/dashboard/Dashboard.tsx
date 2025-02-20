import React, { useEffect, useState } from 'react'
import Template from '../models/Template';
import TemplateTable from './TemplateTable';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';
import CreateTemplateModal, { TemplateFormData } from './CreateTempalteModal';
import { addTemplate, fetchTemplates } from '../service/TemplateService';
import { notifications } from '@mantine/notifications';


const Dashboard = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
        const templates = await fetchTemplates();
        setTemplates(templates);
    } catch (err) {
        notifications.show({
          title: 'Error',
          message: "There was an error during data fetching. Please try again later.",
          color: 'red',
          autoClose: 3000
        });
        setTemplates([]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleCreateTemplate = async (templateData: TemplateFormData) => {
    try {
      setIsLoading(true);
      await addTemplate(templateData.name, templateData.description);
      
      notifications.show({
        title: 'Success',
        message: 'Template created successfully',
        color: 'green',
        autoClose: 3000
      });
      
      await loadTemplates();
      close();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create template';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=> {
    loadTemplates();
  }, [])


  return (
    <div className='flex flex-col items-center w-full'>
      <div className='text-2xl'>Dashboard</div>
      <div>
        <TemplateTable templates={templates}/>

        <CreateTemplateModal 
        opened={opened} 
        onClose={close} 
        onSubmit={handleCreateTemplate}/>
        <Button variant="filled" onClick={open} className='mt-4'>
            Create Template
        </Button>
      </div>
    </div>
  )
}

export default Dashboard;