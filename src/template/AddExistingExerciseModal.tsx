import { Modal } from '@mantine/core';
import React from 'react';

interface AddExistingExerciseModalProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (exerciseId: number) => void;
    templateId: number;
}

const AddExistingExerciseModal = ({ opened, onClose, onSubmit, templateId }: AddExistingExerciseModalProps) => {
    return (
        <Modal opened={opened} onClose={onClose} title="Add Existing Exercise" centered>
            {/* TODO: Add content for selecting existing exercises */}
        </Modal>
    );
};

export default AddExistingExerciseModal;