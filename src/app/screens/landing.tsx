import FlowRenderer from '../components/FlowRenderer';
import { ModeToggle } from '../components/mode-toggle';

export function LandingScreen () {
  return (
    <div className='h-full bg-linear-to-br from-accent to-accent'>
      <header className='border-b border-white/10 backdrop-blur-sm bg-black/20'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <span className='text-xl font-bold text-white'>Ohana logs visualizer</span>
          </div>
          <ModeToggle />
        </div>
      </header>
      <FlowRenderer />
    </div>
  );
}
