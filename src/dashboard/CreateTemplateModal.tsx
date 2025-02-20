import { Button, Modal, TextInput } from '@mantine/core';
import React, { useState } from 'react'

interface CreateTemplateModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (templateData: TemplateFormData) => void;
}

export interface TemplateFormData {
  name: string;
  description: string;
}

function CreateTemplateModal({opened, onClose, onSubmit} : CreateTemplateModalProps) {
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: ""});
    onClose();
  }

  return (
    <div>
      <Modal opened={opened} onClose={onClose} title="Create Template" centered>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Workout Template Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            />
            
          <TextInput
            label="Workout Template Description"
            placeholder="Enter name"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <Button type="submit" mt="md">
            Create Tempalte
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default CreateTemplateModal