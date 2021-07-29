import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Toggle = ({ title, subtitle, enabled, handleChange }) => {
  return (
    <Switch.Group as='div' className='flex items-center'>
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={classNames(
          enabled ? 'bg-cyan-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <span
          aria-hidden='true'
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as='span' className='ml-3'>
        <span className='text-sm font-medium text-gray-900'>{title} </span>
        {subtitle && (
          <span className='text-sm text-gray-500'>({subtitle})</span>
        )}
      </Switch.Label>
    </Switch.Group>
  );
};

export default Toggle;
