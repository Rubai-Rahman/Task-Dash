import Navbar from '@/components/navigations/navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar>{children}</Navbar>
    </div>
  );
};

export default layout;
