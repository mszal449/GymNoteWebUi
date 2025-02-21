import { Button, Combobox, Input, InputBase, Modal, TextInput, useCombobox } from '@mantine/core';
import React, { useState } from 'react'
import { EExerciseType } from '../models/Exercise';

interface CreateExerciseProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (exerciseData: ExerciseFormData) => void;
}

export interface ExerciseFormData {
  name: string;
  description: string;
  type: EExerciseType
}


function CreateExerciseModal({opened, onClose, onSubmit} : CreateExerciseProps) {
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: '',
    description: '',
    type: EExerciseType.REPS
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
const [value, setValue] = useState<string>(EExerciseType.REPS);

const options = Object.values(EExerciseType).map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "", type: EExerciseType.REPS});
    onClose();
  }

  return (
    <div>
      <Modal opened={opened} onClose={onClose} title="Create Exercise" centered>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <TextInput
            label="Exercise Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            />
            
          <TextInput
            label="Exercise Description"
            placeholder="Enter name"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
           <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
              setValue(val);
              setFormData({...formData, type: val as EExerciseType});
              combobox.closeDropdown(); 
          }}
            >
            <Combobox.Target>
                <InputBase
                  label="Exercise type"   
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                  onClick={() => combobox.toggleDropdown()}
                >
                {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
            </Combobox>
            <Button type="submit" mt="md">
              Create Exercise
            </Button>
        </form>
      </Modal>
    </div>
  )
}

export default CreateExerciseModal