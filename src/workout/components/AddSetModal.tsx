import { Button, Modal, NumberInput } from '@mantine/core';
import { useState } from 'react';
import CreateExerciseSetRequest from '../../models/exerciseSet/CreateExerciseSetRequest';

interface AddSetModalProps {
    opened: boolean;
    onClose: () => void;
    workoutId: number;
    exerciseId: number;
    onSetAdded: () => void;
}

const AddSetModal = ({ opened, onClose, workoutId, exerciseId, onSetAdded }: AddSetModalProps) => {
    const [weight, setWeight] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const newSet: CreateExerciseSetRequest = {
                weight,
                reps
            };
            await createExerciseSet(workoutId, exerciseId, newSet);
            onSetAdded();
            onClose();
            setWeight(0);
            setReps(0);
        } catch (error) {
            console.error('Error adding set:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Add New Set" size="sm">
            <div className="space-y-4">
                <NumberInput
                    label="Weight (kg)"
                    value={weight}
                    onChange={(val) => setWeight(Number(val))}
                    min={0}
                    step={2.5}
                />
                <NumberInput
                    label="Reps"
                    value={reps}
                    onChange={(val) => setReps(Number(val))}
                    min={0}
                />
                <div className="flex justify-end gap-2">
                    <Button variant="subtle" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} loading={isSubmitting}>Add Set</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddSetModal;
function createExerciseSet(workoutId: number, exerciseId: number, newSet: CreateExerciseSetRequest) {
    throw new Error('Function not implemented.');
}

