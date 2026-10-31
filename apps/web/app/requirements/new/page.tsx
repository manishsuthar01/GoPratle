import { RequirementWizard } from '@/components/requirements/RequirementWizard';

export const metadata = {
  title: 'Post Event Requirement — GoPratle',
  description:
    'Complete the guided 4-step wizard to post your requirement for event planners, performers, or operational crew.',
};

export default function NewRequirementPage() {
  return (
    <div className="flex-1 tech-grid-canvas flex flex-col justify-center">
      <RequirementWizard />
    </div>
  );
}
