import { DashboardLayout } from '../components/layout';
import { JobSelection, Experiences } from '../components';

const ResumeBuilder = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <JobSelection />
        <Experiences />
        {/* Add more sections using existing components */}
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder; 